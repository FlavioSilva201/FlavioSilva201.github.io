// https://vitejs.dev/config/

export default {
	base: "./", // Define `base` because this deploys to user.github.io/repo-name/
	server: {
		port: 2001,
		open: true,
	},
	build: {
		// Do not inline images and assets to avoid the phaser error
		// "Local data URIs are not supported"
		assetsInlineLimit: 0
	},

}
