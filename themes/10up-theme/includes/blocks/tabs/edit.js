/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { useSelect, dispatch } from '@wordpress/data';

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

	return (
		<div {...blockProps}>
			<ul className={classnames('trial-tabs-panel')}>
				{tabTitles.map((value, index) => {
					return (
						<li key={tabs[index].clientId}>
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
