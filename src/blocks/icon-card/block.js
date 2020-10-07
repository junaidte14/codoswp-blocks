/* eslint-disable no-trailing-spaces */
/**
 * BLOCK: codoswp-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { InspectorControls, InnerBlocks, MediaUpload } = wp.blockEditor;
const { TextControl, PanelBody, PanelRow, Button } = wp.components;
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n; // Import __() from wp.i18n

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

//const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph' ];

registerBlockType( 'codoswpgb/icon-card', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Icon Card' ), // Block title.
	icon: 'heart', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'codoswp-blocks' ),
		__( 'icon card' ),
	],
	attributes: {
		iconImageURL: {
			type: 'string',
			default: codoswpcgb_data.pluginDirUrl + 'images/card-icon.png'
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component
	 */
	edit: ( props ) => {
		const { attributes, className, setAttributes } = props;
		return (
			<div>
				<InspectorControls>
					<PanelBody
						title={ __( 'Card Settings' ) }
					>
						<PanelRow>
							<TextControl
								label={ __( 'Card Image URL' ) }
								help={ __( 'Upload image icon' ) }
								value={ attributes.iconImageURL }
								onChange={ ( nextValue ) => {
									setAttributes( {
										iconImageURL: nextValue,
									} );
								} }
							/>
							<MediaUpload 
								onSelect={ ( value ) => {										 							 
										setAttributes( { iconImageURL: value.url } );									 
									}
								} 							 
								type="image"						 
								value={attributes.iconImageURL}							 
								render={ function( obj ) {							  	 
										return (
											<Button						 
												className={attributes.iconImageURL ? 'image-button' : 'button button-large'}										 
												onClick={obj.open}>
												{ ! attributes.iconImageURL ? (
														__( 'Upload Image', 'codoswpcgb' )
													) : (
														<img
															src={ attributes.iconImageURL }
															alt={ __(
																'Upload Icon Image',
																'codoswpcgb'
															) }
														/>
													)
												}
											</Button>				  		 
										); 
									}
								}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<div className="card">
						<div className="icon-card">
							<img src={attributes.iconImageURL} alt={ __('Upload Icon Image', 'codoswpcgb') } />
						</div>
						<InnerBlocks />
					</div>
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		const { className, attributes } = props;
		return (
			<div className={ className }>
				<div className="card">
					<div className="icon-card">
						<img src={attributes.iconImageURL} alt={ __('Upload Icon Image', 'codoswpcgb') } />
					</div>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
