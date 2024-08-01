fx_version 'cerulean'
game 'gta5'
lua54 'yes'

auther 'Edvin'
description 'Shattered Inventory'

client_scripts {
    'client/*.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/*.lua',
}

shared_scripts { 'config.lua' }

--ui_page 'web/dist/index.html'
ui_page 'http://localhost:5173/' -- Dev
--[[ 
files {
    'web/dist/index.html',
    'web/dist/**/*',
} ]]