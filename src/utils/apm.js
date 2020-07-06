import { init } from '@elastic/apm-rum';
import store from "@/store"
import { baseURL } from '@/utils/config';

export let apm = undefined;

export function initApm() {
	apm = init();
	apm.config({
		serviceName: 'drive-ui',
		// Set custom APM Server URL (default: http://localhost:8200)
		serverUrl: store.state.configuration.apmServerUrl,
		// Set service version (required for sourcemap feature)
		serviceVersion: '0.1',
		agentVersion: '4.4.1',
		distributedTracingOrigins: [`${baseURL}/api`],
		environment: store.state.configuration.environment,
	});
	apm.setInitialPageLoadName('index');
}