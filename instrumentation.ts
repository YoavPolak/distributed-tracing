import * as opentelemetry from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

const sdk = new opentelemetry.NodeSDK({
  metricReader: new PrometheusExporter({
    port: 9464, // optional - default is 9464
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();



// import { Resource } from '@opentelemetry/resources';
// import {
//   SEMRESATTRS_SERVICE_NAME,
//   SEMRESATTRS_SERVICE_VERSION,
// } from '@opentelemetry/semantic-conventions';
// import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
// import {
//   BatchSpanProcessor,
//   ConsoleSpanExporter,
// } from '@opentelemetry/sdk-trace-base';

// const resource = Resource.default().merge(
//   new Resource({
//     [SEMRESATTRS_SERVICE_NAME]: 'hello-app',
//     [SEMRESATTRS_SERVICE_VERSION]: '0.1.0',
//   }),
// );

// const provider = new WebTracerProvider({
//   resource: resource,
// });
// const exporter = new ConsoleSpanExporter();
// const processor = new BatchSpanProcessor(exporter);
// provider.addSpanProcessor(processor);

// provider.register();
