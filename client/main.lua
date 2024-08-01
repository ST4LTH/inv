local Base = exports.base:Object()

plyLoaded = false
inventory = {
    plyInventories = {},
    otherInventories = {},
    groundItems = {},
    nearItems = {},
    open = false,
}

toggleInventory = function (boolean)
    inventory.open = boolean
    SetNuiFocus(boolean, boolean)
    SendNUIMessage({
        type = "openInventory",
        data = boolean
    })
end

local setupNUIItems = function()
    local items = {}
    for i, item in pairs(config.items) do
        if item.buttons then
            local buttons = {}
            for id, button in pairs(item.buttons) do
                table.insert(buttons, {
                    label = button.label,
                    id = id
                })
            end
            item.buttons = buttons
        end
        items[i] = item
    end
    print(json.encode(items))
    return items
end

setupinventory = function ()
    Base.TriggerServerCallback('inventory:loadplayer', function (resp)
        plyLoaded = true
        inventory.groundItems = resp.groundItems
        inventory.plyInventories = resp.plyInventories
        Wait(1000)
        local items = setupNUIItems()
        SendNUIMessage({
            type = "setupInventory",
            data = {
                plyInventories = resp.plyInventories,
                otherInventories = {config.ground},
                items = items
            }
        })
    end)
end

addItem = function (invId, invType, item)
    local data = { id = invId, type = invType }
    local targetInv = getInventory(data)
    if not targetInv then
        return
    end 

    local slot = getEmptySlot(targetInv.items)
    targetInv[slot] = item
    SendNUIMessage({
        type = "addItem",
        data = {
            inventoryId = invId,
            inventoryType = invType,
            item = item
        },
    })
end

addInventory = function(data)
    table.insert(inventory.otherInventories, data)
    SendNUIMessage({
        type = "insertInventory",
        data = {
            label = "Ryggsäck",
            type = 'other',
            id = 'bag-1212513',
            maxWeight = 70,
            slots = 42,
            items = {
                {   
                    id = 134523452345345,
                    item = 'sandwich'
                },
                {   
                    id = 45674567456,
                    item = 'backcard'
                },
            }
        },
    })
end

RegisterCommand('bag', function ()
    addInventory({

    })
end, false)

RegisterCommand('add', function ()
    addItem('player', 'player', {
        id = generateId(),
        item = 'sandwich',
    })
end, false)

RegisterCommand('addcard', function ()
    addItem('player', 'player', {
        id = generateId(),
        item = 'bankcard',
    })
end, false)

RegisterCommand('addkey', function ()
    addItem('keys', 'player', {
        id = generateId(),
        item = 'carkey',
    })
end, false)

Base.addKeybind({
    name = 'Inventory',
    description = 'Öppna Inventory',
    defaultKey = 'TAB',
    onPressed = function ()
        print(1)
        toggleInventory(true)
    end,
})

RegisterNetEvent('base:playerLoaded', function(data)
    setupinventory()
end)

AddEventHandler('onResourceStart', function(resourceName)
    if not resourceName == 'inv' then
        return
    end

    if not Base.IsUserLoaded() then
        return
    end

    print(1)

    setupinventory()
end)
