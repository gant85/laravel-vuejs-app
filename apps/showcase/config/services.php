<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'opentelemetry' => [
        'enabled' => env('OTEL_ENABLED', false),
        'service_name' => env('OTEL_SERVICE_NAME', 'showcase-backend'),
        'endpoint' => env('OTEL_EXPORTER_OTLP_ENDPOINT', 'http://jaeger:4318'),
        'traces_exporter' => env('OTEL_TRACES_EXPORTER', 'otlp'),
    ],

    'external_api' => [
        'base_url' => env('EXTERNAL_API_BASE_URL', 'https://jsonplaceholder.typicode.com'),
        'token' => env('EXTERNAL_API_TOKEN'),
        'timeout' => env('EXTERNAL_API_TIMEOUT', 10),
        'retry_times' => env('EXTERNAL_API_RETRY_TIMES', 3),
    ],

    'azure' => [
        'client_id' => env('AZURE_CLIENT_ID'),
        'client_secret' => env('AZURE_CLIENT_SECRET'),
        'redirect' => env('AZURE_REDIRECT_URI'),
        'tenant' => env('AZURE_TENANT_ID'),
    ]

];
