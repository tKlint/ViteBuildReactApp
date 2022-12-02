import { getServers } from 'dns';
import { CommonServerOptions } from 'vite';
import getClientEnvironment from './env';

export default function getServerProxyConfig(): CommonServerOptions['proxy'] {
  const { QK_API_PROXY } = getClientEnvironment();
  return {
    '/gateway': {
      target: QK_API_PROXY,
      changeOrigin: true,
      // rewrite: path => path.replace(/^\/gateway/, '')
    },
  };
}
