const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve(process.cwd(), 'src', 'index.js'),
	  'eniture-sac-frontend': path.resolve(process.cwd(), 'src', 'js', 'frontend.js'),
	},
  };