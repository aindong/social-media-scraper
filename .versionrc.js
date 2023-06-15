'use strict';
const config = require('conventional-changelog-conventionalcommits');

module.exports = config({
  types: [
    {
      type: 'feat',
      section: 'Features',
    },
    {
      type: 'fix',
      section: 'Bug Fixes',
    },
    {
      type: 'docs',
      section: 'Documentation',
    },
    {
      type: 'style',
      section: 'Style',
    },
    {
      type: 'refactor',
      section: 'Refactor',
    },
    {
      type: 'perf',
      section: 'Performance',
    },
    {
      type: 'test',
      section: 'Tests',
    },
    {
      type: 'build',
      section: 'Build',
    },
    {
      type: 'chore',
      section: 'Chore',
      hidden: true,
    },
    {
      type: 'ci',
      section: 'CI CD',
      hidden: true,
    },
  ],
});
