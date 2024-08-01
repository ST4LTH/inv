
RegisterNetEvent('inventory:addGroundItem')
AddEventHandler('inventory:addGroundItem', function(item)
    TriggerClientEvent('inventory:addClientGroundItem', -1, item)
    table.insert(groundItems, item)
end)

RegisterNetEvent('inventory:removeGroundItem')
AddEventHandler('inventory:removeGroundItem', function(itemId)
    for i = 1, #groundItems do
        local ground = groundItems[i]
        if ground.item.id == itemId then
            table.remove(groundItems, i)
            TriggerClientEvent('inventory:removeClientGroundItem', -1, itemId)
            break
        end
    end
end)

RegisterNetEvent('inventory:swapInvAndGround')
AddEventHandler('inventory:swapInvAndGround', function(item, fromItemId)
    for i, ground in pairs(groundItems) do
        if ground.item.id == fromItemId then
            groundItems[i] = item
            TriggerClientEvent('inventory:swapClientGroundItem', -1, item, fromItemId)
            break
        end
    end
end)