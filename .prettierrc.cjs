module.exports = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 256,
	plugins: [require('prettier-plugin-svelte'), require('prettier-plugin-tailwindcss')],
	pluginSearchDirs: false,
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
