
-- THREADS

-- Thread to show and update item prop/inventory
CreateThread(function()
    while true do
        while not plyLoaded do
            Citizen.Wait(750)
        end

        local sleepThread, player = 500, PlayerPedId();
        local coords = GetEntityCoords(player)

        for i = 1, #inventory.groundItems do
            local data = inventory.groundItems[i]
            local dist = #(data.coords - coords)
            
            if dist < 50 then
                if data.item and data.item.item and not data.prop then
                    spawnObject({
                        Model = config.items[data.item.item].model or 'prop_michael_backpack',
                        Coords = vector3(data.coords.x, data.coords.y, data.coords.z)
                    }, function(obj)
                        SetEntityAsMissionEntity(obj,  true,  false)
                        PlaceObjectOnGroundProperly(obj)
                        SetEntityAsMissionEntity(obj, true, false)
                        ActivatePhysics(obj)
                        SetEntityNoCollisionEntity(PlayerPedId(), obj, false)
                        data.prop = obj
                    end)
                end
            else 
                if data.prop and DoesEntityExist(data.prop) then
                    DeleteEntity(data.prop)
                    data.prop = nil
                end
            end

            if dist < 5 and not data.show then
                data.show = true
                inventory.nearItems[#inventory.nearItems+1] = data.item
            elseif dist > 5 and data.show then
                for i, item in pairs(inventory.nearItems) do
                    print(item.id)
                    print(data.item.id)
                    if item.id == data.item.id then
                        inventory.nearItems[i] = nil
                        data.show = false
                    end
                end
            end
        end

        if inventory.open then
            SendNUIMessage({
                type = 'setGround',
                data = inventory.nearItems
            })
            sleepThread = 200
        end

        Wait(sleepThread)
    end
end)

-- EVENTS

-- Gets new ground items from server
RegisterNetEvent('inventory:addClientGroundItem', function(data)
    local coords = GetEntityCoords(PlayerPedId())
    deBug(json.encode(data))
    if #(data.coords - coords) < 5 then
        local slot = getEmptySlot(inventory.nearItems)
        for i, item in pairs(inventory.nearItems) do
            if item.id == data.item.id then
                data.show = true
                table.insert(inventory.groundItems, data)
                return
            end
        end
        inventory.nearItems[slot] = data.item
        table.insert(inventory.groundItems, data)
        return
    end

    table.insert(inventory.groundItems, data)
end)

-- Gets new ground items from server
RegisterNetEvent('inventory:removeClientGroundItem', function(itemId)
    for i, item in pairs(inventory.nearItems) do
        if item.id == itemId then
            inventory.nearItems[i] = nil
            break
        end
    end

    for i, ground in pairs(inventory.groundItems) do
        if ground.item.id == itemId then
            if DoesEntityExist(ground.prop) then
                DeleteEntity(ground.prop)
            end
            table.remove(inventory.groundItems, i)
            break
        end
    end
end)

-- Gets new ground items from server
RegisterNetEvent('inventory:swapClientGroundItem', function(item, fromItemId)
    print(fromItemId)
    for i, invItem in pairs(inventory.nearItems) do
        if invItem.id == fromItemId then
            inventory.nearItems[i] = item
            break
        end
    end

    for i, ground in pairs(inventory.groundItems) do
        if ground.item.id == fromItemId then
            if DoesEntityExist(ground.prop) then
                DeleteEntity(ground.prop)
            end
            ground.prop = nil
            ground.item = item
            break
        end
    end
end)

-- FUNCTIONS

-- Gets new ground item from nui and send it to server
addGround = function(data)
    local item = data.item.item
    pickupAnim()

    if not item then
        return
    end
    local coords = GetEntityCoords(PlayerPedId())
    local groundItem = {
        coords = coords,
        item = item,
    }

    deBug(data.slot+1)
    inventory.nearItems[data.slot+1] = item
    TriggerServerEvent('inventory:addGroundItem', groundItem)
end

-- Gets itemId and slot to change clients slot
swapGround = function (fromItem, fromSlot, toItem, toSlot)
    deBug(fromItem, fromSlot, toItem, toSlot)
    inventory.nearItems[fromSlot] = toItem
    inventory.nearItems[toSlot] = fromItem
end

-- Gets itemId and slot to change clients slot
editGround = function (itemId, slot)
    deBug(itemId, slot)
    for i, item in pairs(inventory.nearItems) do
        if item.id == itemId then
            inventory.nearItems[slot+1] = item
            inventory.nearItems[i] = nil
            break
        end
    end
end

-- Removes ground item and sends to server
removeGround = function (data)
    pickupAnim()
    if not data.item then
        return
    end

    deBug('remove', json.encode(data.item.item.id))
    TriggerServerEvent('inventory:removeGroundItem', data.item.item.id)
    inventory.nearItems[data.item.slot+1] = nil
end

swapInvAndGround = function (sourceInv, targetInv, fromSlot, toSlot, fromItem, toItem)
    deBug(targetInv.id, sourceInv.id, toItem, toSlot)
    if targetInv.id == 'ground' then
        inventory.nearItems[toSlot+1] = fromItem
        sourceInv.items[fromSlot+1] = toItem
        TriggerServerEvent('inventory:swapInvAndGround', fromItem, toItem.id)
        return
    end
    inventory.nearItems[fromSlot+1] = toItem
    targetInv.items[toSlot+1] = fromItem
    TriggerServerEvent('inventory:swapInvAndGround', toItem, fromItem.id)
end