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
 * @returns {Function} Render the edit screen
 */
const TabBlockEdit = () => {
	const blockProps = useBlockProps();

	const MY_TEMPLATE = [['core/paragraph', { placeholder: __('Tab content goes here') }]];

	return (
		<div {...blockProps}>
			<div className={classnames('trial-tabs-wrapper')}>
				<InnerBlocks template={MY_TEMPLATE} />
			</div>
		</div>
	);
};
export default TabBlockEdit;
