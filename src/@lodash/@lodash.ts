/* eslint-disable  */
import _ from 'lodash';

declare module 'lodash' {
	interface LoDashStatic {
		setIn: (state: any, name: string, value: any) => any;
	}
	interface LoDashExplicitWrapper<TValue> {
		setIn: (name: string, value: any) => LoDashExplicitWrapper<any>;
	}
}

_.mixin({
	setIn: (state, name, value) => _.setWith(_.clone(state), name, value, _.clone)
});

export default _;
