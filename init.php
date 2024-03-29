<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CODOSWPCGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */

function codoswp_blocks_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'codoswp_blocks-cgb-style-css', // Handle.
		plugin_dir_url( __FILE__ ).'dist/blocks.style.build.css', // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'codoswp_blocks-cgb-block-js', // Handle.
		plugin_dir_url( __FILE__ ).'/dist/blocks.build.js', // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'codoswp_blocks-cgb-block-editor-css', // Handle.
		plugin_dir_url( __FILE__ ).'dist/blocks.editor.build.css', // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// Register custom script for frontend.
	wp_register_script(
		'codoswp_blocks-cgb-blocks-custom-js', // Handle.
		plugin_dir_url( __FILE__ ).'dist/blocks-custom.js', // Block.build.js: We register the block here. Built with Webpack.
		array( 'jquery' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);
	wp_enqueue_script('codoswp_blocks-cgb-blocks-custom-js');

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `codoswpcgb_data` object.
	wp_localize_script(
		'codoswp_blocks-cgb-block-js',
		'codoswpcgb_data', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __FILE__ ),
			'pluginDirUrl'  => plugin_dir_url( __FILE__ ),
			// Add more data here that you want to access from `codoswpcgb_data` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'codoswpgb/icon-card', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'codoswp_blocks-cgb-style-css',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'codoswp_blocks-cgb-block-editor-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'codoswp_blocks-cgb-block-js',
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'codoswp_blocks_cgb_block_assets' );
