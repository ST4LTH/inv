config = {}

config.playerInv = {
    {
        id = 'player',
        label = "Pockets",
        denied = {'key'},
        type = 'player',
        maxWeight= 50,
        slots = 30
    },
    {
        id = 'keys',
        label = "Keychain",
        allowed = {'key'},
        type = 'player',
        maxWeight = 50,
        slots = 20
    },
}

config.ground = {
    maxWeight = 1000,
    label = "Ground",
    type = 'other',
    id = 'ground',
    slots = 18,
    items = {},
}

config.items = {
    sandwich = {
        label = 'Sandwich',
        weight = 1,
        model = 'prop_cs_heist_bag02',
        buttons = {
            ['eat'] = {
                label = 'Ät',
                onClick = {
                    client = function ()
                        print('hej hej')
                    end
                },
                onUse = {
                    client = function ()
                        print('hej hej')
                    end
                }
            }
        }
    },
    carkey = {
        label = 'Bilnyckel',
        weight = 1,
        model = 'prop_cs_heist_bag02',
        type = 'key',
    },
    bankcard = {
        label = 'Bankkort',
        weight = 1,
        model = 'prop_cs_heist_bag02',
        type = 'card',
    },
}

--[[ plyInventories: [
    {
        label: "Fickan",
        type: 'player',
        id: 'player-1212513',
        maxWeight: 50,
        slots: 30,
        denied: ['key'],
        items: [
            {   
                slot: 0,
                item: 'sandwich',
                amount: 4,
            },
            undefined,
            {   
                slot: 2,
                item: 'sandwich',
                amount: 1,
            },
        ]
    },
    {
        label: "Nycklar",
        type: 'player',
        id: 'player-asdaw',
        slots: 15,
        maxWeight: 50,
        allowed: ['key'],
        items: [
            {
                slot: 0,
                item: 'carkey',
                amount: 1,
                metadata: {
                    plate: 'abc 123'
                }
            },
        ]
    },
],
otherInventories: [
    {
        maxWeight: 50,
        label: "Marken",
        type: 'other',
        id: 'ground',
        slots: 15,
        items: [
            {
                slot: 0,
                item: 'sandwich',
                amount: 1,
            },
        ]
    },
    {
        maxWeight: 50,
        label: "Ryggväska",
        type: 'other',
        id: 'bag',
        slots: 15,
        items: [
            {
                slot: 0,
                item: 'sandwich',
                amount: 1,
            },
        ]
    },
    {
        maxWeight: 50,
        label: "Ryggväska",
        type: 'other',
        id: 'bag-12312',
        slots: 15,
        items: [
            {
                slot: 0,
                item: 'sandwich',
                amount: 1,
            },
        ]
    }
], ]]