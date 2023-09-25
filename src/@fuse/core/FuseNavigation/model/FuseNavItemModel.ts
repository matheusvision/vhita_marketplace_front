import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { FuseNavItemType } from '@fuse/core/FuseNavigation';

function FuseNavItemModel(data?: PartialDeep<FuseNavItemType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		translate: '',
		auth: '',
		subtitle: '',
		icon: '',
		iconClass: '',
		url: '',
		target: '',
		type: 'item',
		sx: {},
		disabled: false,
		active: false,
		exact: false,
		end: false,
		badge: null,
		children: []
	});
}

export default FuseNavItemModel;
