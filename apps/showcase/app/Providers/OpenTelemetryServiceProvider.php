<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use OpenTelemetry\API\Globals;
use OpenTelemetry\SDK\Trace\TracerProvider;
use OpenTelemetry\SDK\Trace\SpanProcessor\BatchSpanProcessor;
use OpenTelemetry\SDK\Resource\ResourceInfo;
use OpenTelemetry\SDK\Common\Attribute\Attributes;
use OpenTelemetry\SDK\Common\Time\ClockFactory;
use OpenTelemetry\Contrib\Otlp\SpanExporter;
use OpenTelemetry\Contrib\Otlp\OtlpHttpTransportFactory;
use OpenTelemetry\Contrib\Otlp\ContentTypes;
use OpenTelemetry\SemConv\ResourceAttributes;

class OpenTelemetryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        if (! config('services.opentelemetry.enabled', false)) {
            return;
        }

        try {
            // Create resource with service information
            $resource = ResourceInfo::create(
                Attributes::create([
                    ResourceAttributes::SERVICE_NAME => config('services.opentelemetry.service_name', 'showcase-backend'),
                    ResourceAttributes::SERVICE_VERSION => config('app.version', '1.0.0'),
                    'deployment.environment' => config('app.env', 'production'),
                ])
            );

            // Create OTLP HTTP transport
            $transport = (new OtlpHttpTransportFactory())->create(
                config('services.opentelemetry.endpoint', 'http://jaeger:4318') . '/v1/traces',
                ContentTypes::PROTOBUF
            );

            // Create OTLP exporter
            $exporter = new SpanExporter($transport);

            // Create tracer provider with batch processor
            $tracerProvider = TracerProvider::builder()
                ->addSpanProcessor(
                    new BatchSpanProcessor(
                        $exporter,
                        ClockFactory::getDefault()
                    )
                )
                ->setResource($resource)
                ->build();

            // Set global tracer provider
            Globals::registerInitializer(function () use ($tracerProvider) {
                return $tracerProvider;
            });

            $this->app->singleton('opentelemetry.tracer', function () use ($tracerProvider) {
                return $tracerProvider->getTracer(
                    'showcase-laravel-app',
                    config('app.version', '1.0.0')
                );
            });

            \Log::info('OpenTelemetry initialized', [
                'service_name' => config('services.opentelemetry.service_name'),
                'endpoint' => config('services.opentelemetry.endpoint'),
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to initialize OpenTelemetry', [
                'error' => $e->getMessage(),
            ]);
        }
    }
}
