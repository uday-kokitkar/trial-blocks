/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import classnames from 'classnames';

/**
 * Edit component.
 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
 *
 * @param {object} props The block props.
 *
 * @returns {Function} Render the edit screen
 */
const TabBlockEdit = (props) => {
	const { attributes } = props;
	const { selected } = attributes;

	const blockProps = useBlockProps();

	const TAB_TEMPLATE = [
		[
			'core/paragraph',
			{
				placeholder: __(
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
				),
			},
		],
	];

	return (
		<div {...blockProps} className={classnames('trial-tab-content', { active: selected })}>
			<InnerBlocks template={TAB_TEMPLATE} />
		</div>
	);
};
export default TabBlockEdit;
