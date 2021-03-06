import preprocess from 'svelte-preprocess';
import { optimizeImports } from 'carbon-preprocess-svelte';
// import adapter from '@sveltejs/adapter-static';
// import { optimizeCss } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({}), optimizeImports()],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'

		// adapter: adapter(),
		// vite: {
		// 	plugins: [process.env.NODE_ENV === 'production' && optimizeCss()]
		// }
	}
};

export default config;
