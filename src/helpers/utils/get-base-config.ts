import { cosmiconfig } from 'cosmiconfig';
import { Options } from 'semantic-release';

import { resolvePluginConfig } from '@src/helpers/utils/resolve-plugin-config';

export async function getBaseConfig(): Promise<Options> {
  const result = await cosmiconfig('release').search();
  const config = result?.config ?? {};
  const { branches = [], plugins = [] } = config;

  return {
    branches: [...branches, process.env.GITHUB_HEAD_REF],
    plugins: [
      resolvePluginConfig(plugins, '@semantic-release/commit-analyzer'),
      resolvePluginConfig(plugins, '@semantic-release/release-notes-generator'),
    ],
  };
}
