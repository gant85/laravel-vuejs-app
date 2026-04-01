<?php

return [
    'enabled' => env('DEBUGBAR_ENABLED', false),
    'storage' => [
        'enabled' => true,
        'open' => env('DEBUGBAR_OPEN_STORAGE', true),
        'driver' => 'file',
        'path' => storage_path('debugbar'),
    ],
];
