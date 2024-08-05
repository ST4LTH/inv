
-- Function to get correct inventory from data.id

getInventory = function (data)
    if (data.id == "ground") then
        return config.ground
    end
    if (data.type == "player") then 
        for i, inv in pairs(inventory.plyInventories) do
            if inv.id == data.id then
                return inv
            end
        end
        return
    end
    for i, inv in pairs(inventory.otherInventories) do
        if inv.id == data.id then
            return inv
        end
    end
end

-- Function to get empty slot in a itemList/inventory

getEmptySlot = function (items)
    local slot = -1
    for i, item in pairs(items) do
        if item then
            slot = i
            break
        end
    end
    return slot
end

-- Just Debug print, used this to know what errors were for the Inventory

deBug = function(text, ...)
    print('Inventory: Client Debug ', text, ...)
end

-- Animation for when picking up/dropping items on ground

pickupAnim = function()
	while not HasAnimDictLoaded('random@domestic') do
		RequestAnimDict('random@domestic')

		Citizen.Wait(150)
	end

	TaskPlayAnim(PlayerPedId(), 'random@domestic', 'pickup_low', 2.0, -1, -1, 0, 0, false, false, false)
end

-- Generates ID for items

generateId = function()
    local id = math.random(1, 99999999999)

    math.randomseed(id)

    local random = math.random(1, 99999999999)
    return random
end

-- Loads model 

loadModel = function(model)
    if not IsModelValid(model) then return end
    RequestModel(model)
    RequestCollisionForModel(model)

    while not HasModelLoaded(model) or not HasCollisionForModelLoaded(model) do
        Wait(10)
    end

    SetModelAsNoLongerNeeded(model)
end

spawnObject = function(data, cb)
    local model = (type(data.Model) == 'number' and data.Model or GetHashKey(data.Model))
    if not IsModelValid(model) or not IsModelInCdimage(model) then 
        model = GetHashKey('prop_michael_backpack')
    end

    CreateThread(function()
        loadModel(model)

        Object = CreateObject(model, data.coords.x, data.coords.y, data.coords.z, false, true, true)
        if cb ~= nil then
            cb(Object)
        end
    end)
end