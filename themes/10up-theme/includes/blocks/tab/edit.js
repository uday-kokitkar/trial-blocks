/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { select, useSelect } from '@wordpress/data';
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
	const { clientId, attributes, setAttributes } = props;

	const { tabId } = attributes;

	if (!tabId) {
		setAttributes({ tabId: clientId });
	}

	const blockProps = useBlockProps();

	const parent = select('core/block-editor').getBlockParents(clientId);

	const parentClientId = parent[0];

	const { parentProps } = useSelect((select) => {
		if (parentClientId) {
			return {
				parentProps: select('core/block-editor').getBlockAttributes(parentClientId),
			};
		}
		return null;
	});

	const { selectedTabId } = parentProps ?? '';

	const TAB_TEMPLATE = [
		[
			'core/paragraph',
			{
				placeholder: __('Tab content.'),
			},
		],
	];

	return (
		<div
			{...blockProps}
			className={classnames('trial-tab-content', { active: tabId === selectedTabId })}
		>
			<InnerBlocks template={TAB_TEMPLATE} />
		</div>
	);
};
export default TabBlockEdit;
