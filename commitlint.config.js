const { releaseRules } = require('./tools/utils/release-rules');

const types = releaseRules.map((rule) => rule.type);

module.exports = {
  extends: '@commitlint/config-conventional',
  ignores: [(message) => message.includes('[skip ci]')],
  rules: {
    'type-enum': [2, 'always', types],
  },
};
