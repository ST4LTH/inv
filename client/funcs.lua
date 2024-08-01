
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

deBug = function(text, ...)
    print('Inventory: Client Debug ', text, ...)
end

pickupAnim = function()
	while not HasAnimDictLoaded('random@domestic') do
		RequestAnimDict('random@domestic')

		Citizen.Wait(150)
	end

	TaskPlayAnim(PlayerPedId(), 'random@domestic', 'pickup_low', 2.0, -1, -1, 0, 0, false, false, false)
end

generateId = function()
    local id = math.random(1, 99999999999)

    math.randomseed(id)

    local random = math.random(1, 99999999999)
    return random
end

loadModel = function(model)
    if not IsModelValid(model) then return deBug(('Inventory: Client %s model not found'):format(model)) end
    RequestModel(model)
    RequestCollisionForModel(model)

    while not HasModelLoaded(model) or not HasCollisionForModelLoaded(model) do
        Wait(10)
    end

    SetModelAsNoLongerNeeded(model)
end

spawnObject = function(Data, Callback)
    local Model = (type(Data.Model) == 'number' and Data.Model or GetHashKey(Data.Model))

    if not IsModelValid(Model) or not IsModelInCdimage(Model) then 
        Model = GetHashKey('prop_michael_backpack')
    end

    CreateThread(function()
        loadModel(Model)

        Object = CreateObject(Model, Data.Coords.x, Data.Coords.y, Data.Coords.z, false, true, true)

        if Callback ~= nil then
            Callback(Object)
        end
    end)
end