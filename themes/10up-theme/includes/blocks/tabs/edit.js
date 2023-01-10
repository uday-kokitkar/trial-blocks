/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { useSelect, dispatch } from '@wordpress/data';

import { useEffect } from '@wordpress/element';

import classnames from 'classnames';

/**
 * Edit component.
 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
 *
 * @param {object}   props                  The block props.
 * @param {object}   props.attributes       Block attributes.
 * @param {string}   props.attributes.title Custom title to be displayed.
 * @param {string}   props.className        Class name for the block.
 * @param {Function} props.setAttributes    Sets the value for block attributes.
 * @returns {Function} Render the edit screen
 */
const TabsBlockEdit = (props) => {
	const { clientId, setAttributes } = props;

	const blockProps = useBlockProps();

	const { tabs } = useSelect((select) => {
		/**
		 * As we allow only 'trial/tab' block, we expect to get all tab children.
		 */
		const blocksList = select('core/block-editor').getBlocks(clientId);
		return {
			tabs: blocksList,
		};
	});

	// Select the first tab is selected for the first time.
	useEffect(() => {
		if (tabs.length) {
			setAttributes({ selectedTabId: tabs[0].attributes.tabId });
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const TABS_TEMPLATE = [['trial/tab'], ['trial/tab'], ['trial/tab']];

	return (
		<div {...blockProps}>
			<ul className={classnames('trial-tabs-panel')}>
				{tabs.map((tab) => {
					return (
						<li
							key={tab.clientId}
							onSelect={() => setAttributes({ selectedTabId: tab.attributes.tabId })}
						>
							<RichText
								allowedFormats={[]}
								value={tab.attributes.tabTitle}
								onChange={(value) => {
									dispatch('core/editor').updateBlockAttributes(tab.clientId, {
										tabTitle: value,
									});
								}}
							/>
						</li>
					);
				})}
			</ul>
			<InnerBlocks template={TABS_TEMPLATE} allowedBlocks={['trial/tab']} />
		</div>
	);
};
export default TabsBlockEdit;

// Next: Styling for the editor.
