import { Options } from 'vite-plugin-html-config';
import getClientEnvironment, { ENV_PREFIX } from './env';

const { QK_APP_TITLE, QK_FAVICON_URL } = getClientEnvironment(ENV_PREFIX);

export default {
  title: QK_APP_TITLE,
  favicon: QK_FAVICON_URL,
} as Options;
