import { loadEnv } from 'vite';

export const ENV_PREFIX = 'QK';

export default function getClientEnvironment(prefix = '') {
  const mode = process.env.NODE_ENV || 'development';
  const cwd = process.cwd();
  return loadEnv(mode, cwd, prefix);
}
