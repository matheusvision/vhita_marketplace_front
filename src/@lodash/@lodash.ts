/* eslint-disable  */
import _ from 'lodash';

declare module 'lodash' {
	interface LoDashStatic {
		 /**
		 * A function that sets a value at a given path in an object.
		 * @param state The object to set the value in.
		 * @param name The path to set the value at.
		 * @param value The value to set at the given path.
		 * @returns The modified object with the value set at the given path.
		 */
		setIn: (state: any, name: string, value: any) => any;
	}
	interface LoDashExplicitWrapper<TValue> {
		 /**
		 * A function that sets a value at a given path in an object.
		 * @param name The path to set the value at.
		 * @param value The value to set at the given path.
		 * @returns The modified object with the value set at the given path.
		 */
		setIn: (name: string, value: any) => LoDashExplicitWrapper<any>;
	}
}

_.mixin({
	/**
   * A function that sets a value at a given path in an object.
   * @param state The object to set the value in.
   * @param name The path to set the value at.
   * @param value The value to set at the given path.
   * @returns The modified object with the value set at the given path.
   */
	setIn: (state, name, value) => _.setWith(_.clone(state), name, value, _.clone)
});

export default _;
