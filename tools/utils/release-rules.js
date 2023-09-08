const releaseRules = [
  { type: 'build', release: 'patch' },
  { type: 'chore', release: false },
  { type: 'ci', release: false },
  { type: 'docs', release: false },
  { type: 'feat', release: 'minor' },
  { type: 'fix', release: 'patch' },
  { type: 'perf', release: 'patch' },
  { type: 'refactor', release: 'patch' },
  { type: 'revert', release: 'patch' },
  { type: 'style', release: false },
  { type: 'test', release: false },
];

module.exports = { releaseRules };
