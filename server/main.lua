local Base = exports.base:Object()
plyInventories = {}
inventories = {}
groundItems = {}

loadInventories = function()
    local Sql = MySQL.Sync.fetchAll('SELECT * FROM inventories')
    for i, inventory in pairs(Sql) do
        inventories[inventory.id] = json.decode(inventory.data)
    end
end

loadPlayerInventory = function(source)
    local char = Base.GetCharacterFromId(source)
    if not char then
        return loadPlayerInventory(source)
    end

    local inventory = MySQL.scalar.await('SELECT `inventory` FROM `characters` WHERE `cid` = ? LIMIT 1', {
        char.cid
    })
    inventory = json.decode(inventory)

    local plyInventory = {}
    for _, configItem in ipairs(config.playerInv) do
        table.insert(plyInventory, {
            id = configItem.id,
            label = configItem.label,
            type = configItem.type,
            maxWeight = configItem.maxWeight,
            slots = configItem.slots,
            items = inventory and inventory[configItem.id] or {},
            denied = configItem.denied and configItem.denied or {},
            allowed = configItem.allowed and configItem.allowed or {},
        })
    end

    plyInventories[source] = plyInventory
    return plyInventory
end

addItem = function (inventory, item)
    
end

Base.RegisterServerCallback("inventory:loadplayer", function(source, cb, cid)
    cb({
        plyInventories = loadPlayerInventory(source),
        groundItems = groundItems
    })
end)
 