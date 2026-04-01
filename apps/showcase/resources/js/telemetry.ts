/**
 * Initialize OpenTelemetry for frontend tracing
 */
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';

export function initOpenTelemetry() {
  try {
    // Create resource with service information
    const resource = new Resource({
      [ATTR_SERVICE_NAME]: 'showcase-frontend',
      [ATTR_SERVICE_VERSION]: '1.0.0',
      'deployment.environment': import.meta.env.MODE || 'development',
    });

    // Create OTLP exporter using Nginx proxy endpoint (avoids CORS issues)
    const exporter = new OTLPTraceExporter({
      url: 'http://localhost:8000/otlp/v1/traces',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Create tracer provider
    const provider = new WebTracerProvider({
      resource,
    });

    // Add batch span processor
    provider.addSpanProcessor(new BatchSpanProcessor(exporter));

    // Register the provider
    provider.register();

    // Register auto-instrumentations (automatically instruments fetch, XMLHttpRequest, etc.)
    registerInstrumentations({
      instrumentations: [
        getWebAutoInstrumentations({
          '@opentelemetry/instrumentation-fetch': {
            propagateTraceHeaderCorsUrls: [/http:\/\/localhost:\d+/],
            clearTimingResources: true,
          },
          '@opentelemetry/instrumentation-xml-http-request': {
            propagateTraceHeaderCorsUrls: [/http:\/\/localhost:\d+/],
          },
        }),
      ],
    });

    console.log('✅ OpenTelemetry initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize OpenTelemetry:', error);
  }
}
