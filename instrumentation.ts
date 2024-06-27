import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

// Set up tracing
const traceExporter = new OTLPTraceExporter({
  url: 'http://collector:5555',
});

const tracerProvider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'hello-app-yoav',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: 'development',
  }),
});

tracerProvider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));
tracerProvider.register();

// Set up metrics
const prometheusExporter = new PrometheusExporter({
  port: 9464
}, () => {
  console.log('Prometheus scrape endpoint: http://localhost:9464/metrics');
});

const meterProvider = new MeterProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'hello-app-yoav',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: 'development',
  }),
});

meterProvider.addMetricReader(prometheusExporter);

registerInstrumentations({
  tracerProvider,
  meterProvider,
  instrumentations: [getNodeAutoInstrumentations()],
});

// No need to call start on tracerProvider or meterProvider
// They should automatically start once registered

console.log('Prometheus scrape endpoint: http://localhost:9464/metrics');
