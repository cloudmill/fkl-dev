const postcss = require("postcss")
const postcssPresetEnv = require('postcss-preset-env');
const atImport = require("postcss-import")

postcss([
  atImport({}),
  postcssPresetEnv({ browsers: ['last 2 versions', '> 5%'] })
]);
