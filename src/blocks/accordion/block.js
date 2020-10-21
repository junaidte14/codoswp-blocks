/* eslint-disable no-trailing-spaces */
/**
 * BLOCK: Accordion
 *
 * Registering a basic block with Gutenberg.
 * Display content in accordion collapsabe tabs.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { InspectorControls, InnerBlocks, PanelColorSettings, MediaUpload } = wp.blockEditor;
const { TextControl, PanelBody, PanelRow, Button } = wp.components;
const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n; // Import __() from wp.i18n
import { Dashicon } from '@wordpress/components';

/**
 * Register: a Gutenberg Block.
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

registerBlockType( 'codoswpgb/accordion', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Accordion' ), // Block title.
	icon: 'heart', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'codoswp-blocks' ),
		__( 'accordion' ),
	],
	attributes: {
		tabTitle: {
			type: 'string',
			default: 'Tab 1'
		},
		tabBGColor: {
			type: 'string',
			default: '#87b2f6'
		},
		tabTextColor: {
			type: 'string',
			default: '#FFFFFF'
		},
		iconColor: {
			type: 'string',
			default: '#3682FF'
		}
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
		const colorSamples = [
			{
				name: 'Color 1',
				slug: 'codoswpcgb_color_1',
				color: '#3682FF'
			},
			{
				name: 'Color 2',
				slug: 'codoswpcgb_color_2',
				color: '#87b2f6'
			},
			{
				name: 'Color 3',
				slug: 'codoswpcgb_color_3',
				color: '#FFC40D'
			},
			{
				name: 'Color 4',
				slug: 'codoswpcgb_color_4',
				color: '#FFFFFF'
			},
			{
				name: 'Color 5',
				slug: 'codoswpcgb_color_5',
				color: '#000000'
			}
		];
		return (
			<div>
				<InspectorControls>
					<PanelBody
						title={ __( 'Accordion Settings' ) }
					>
						<PanelRow>
							<TextControl
								label={ __( 'Tab Title' ) }
								help={ __( 'Define tab title here.' ) }
								value={ attributes.tabTitle }
								onChange={ ( nextValue ) => {
									setAttributes( {
										tabTitle: nextValue,
									} );
								} }
							/>
						</PanelRow>
						<PanelColorSettings 
							title={__('Color Settings')}
							colorSettings={
								[
									{
										colors: colorSamples,							 
										value: attributes.tabTextColor,							 
										label: 'Tab Color',							 
										onChange: ( value ) => {								 
											setAttributes( { tabTextColor: value } );						 
										},
									},
									{
										colors: colorSamples,							 
										value: attributes.tabBGColor,							 
										label: 'Tab BG Color',							 
										onChange: ( value ) => {								 
											setAttributes( { tabBGColor: value } );						 
										},
									},
									{
										colors: colorSamples,							 
										value: attributes.iconColor,							 
										label: 'Icons Color',							 
										onChange: ( value ) => {								 
											setAttributes( { iconColor: value } );						 
										},
									},
								]
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ className }>
					<button className="codoswpcgb-accordion" style={{backgroundColor: attributes.tabBGColor, color: attributes.tabTextColor}}>
						{attributes.tabTitle}
						<Dashicon icon="plus-alt2" className="codoswpcgb-plus-icon" style={{fill: attributes.iconColor}} />
						<Dashicon icon="minus" className="codoswpcgb-minus-icon" style={{fill: attributes.iconColor}} />
					</button>
					<div className="codoswpcgb-accordion-panel">
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
				<button className="codoswpcgb-accordion" style={{backgroundColor: attributes.tabBGColor, color: attributes.tabTextColor}}>
					{attributes.tabTitle}
					<Dashicon icon="plus-alt2" className="codoswpcgb-plus-icon" style={{fill: attributes.iconColor}} />
					<Dashicon icon="minus" className="codoswpcgb-minus-icon" style={{fill: attributes.iconColor}} />
				</button>
				<div className="codoswpcgb-accordion-panel">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );

