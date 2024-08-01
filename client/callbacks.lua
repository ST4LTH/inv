
RegisterNUICallback('moveItem', function(data)
    local item = data.item.item
    if data.targetInv.id == 'ground' then
        if data.sourceInv.id == data.targetInv.id then
            deBug('editGround')
            editGround(item.id, data.slot)
            return
        end
        deBug('addGround')
        addGround(data)
        return
    end
    if data.sourceInv.id == 'ground' then
        deBug('removeGround')
        removeGround(data)
    end
    local sourceInv = getInventory(data.sourceInv)
    local targetInv = getInventory(data.targetInv)
    if sourceInv and targetInv then
        sourceInv.items[data.item.slot+1] = nil
        targetInv.items[data.slot+1] = item
        return
    end
end)

RegisterNUICallback('swapItem', function(data, cb)
    deBug('swapItem')
    local item = data.item.item
    if data.sourceInv.id == data.targetInv.id and data.sourceInv.id == 'ground' then
        deBug('swapGround')
        swapGround(item, data.item.slot+1, data.targetItem, data.slot+1)
        return
    end
    local sourceInv = getInventory(data.sourceInv)
    local targetInv = getInventory(data.targetInv)
    if sourceInv.id == 'ground' or targetInv.id == 'ground' then
        deBug('swapGround')
        swapInvAndGround(sourceInv, targetInv, data.item.slot, data.slot, item, data.targetItem)
        return
    end
    if sourceInv and targetInv then
        sourceInv.items[data.item.slot+1] = data.targetItem
        targetInv.items[data.slot+1] = item
        return
    end
end)

RegisterNUICallback('close', function()
    SetNuiFocus(false, false)
end)