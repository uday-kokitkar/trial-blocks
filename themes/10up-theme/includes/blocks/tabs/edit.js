/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { useSelect, dispatch } from '@wordpress/data';

import { useState, useEffect } from '@wordpress/element';

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
	const { clientId } = props;

	const blockProps = useBlockProps();

	const [currentTabId, setCurrentTabID] = useState(null);

	const { tabs, tabTitles } = useSelect((select) => {
		/**
		 * As we allow only 'trial/tab' block, we expect to get all tab children.
		 */
		const blocksList = select('core/block-editor').getBlocks(clientId);
		return {
			tabs: blocksList,
			tabTitles: blocksList.map((b) => b.attributes.tabTitle),
		};
	});

	// Select the current tab first time.
	useEffect(() => {
		if (tabs.length) {
			setCurrentTabID(tabs[0].clientId);
		}
	}, [tabs]);

	useEffect(() => {
		// console.log( 'updated currentTabId', currentTabId );
		tabs.forEach(function (tab) {
			dispatch('core/block-editor').updateBlockAttributes(tab.clientId, {
				selected: tab.clientId === currentTabId,
			});
		});
	}, [currentTabId, tabs]);

	return (
		<div {...blockProps}>
			<ul className={classnames('trial-tabs-panel')}>
				{tabTitles.map((value, index) => {
					return (
						<li
							key={tabs[index].clientId}
							onSelect={() => setCurrentTabID(tabs[index].clientId)}
						>
							<RichText
								allowedFormats={[]}
								value={value}
								onChange={(value) => {
									dispatch('core/editor').updateBlockAttributes(
										tabs[index].clientId,
										{ tabTitle: value },
									);
								}}
							/>
						</li>
					);
				})}
			</ul>
			<InnerBlocks allowedBlocks={['trial/tab']} />
		</div>
	);
};
export default TabsBlockEdit;

// Next: Current tab selection.
