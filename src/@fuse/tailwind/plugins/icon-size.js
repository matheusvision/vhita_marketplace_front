/* eslint-disable */

// eslint-disable-next-line import/no-extraneous-dependencies
const plugin = require('tailwindcss/plugin');

/**
 * The iconSize function is a Tailwind CSS plugin that generates utility classes for setting the size of icons.
 * It takes in an object with addUtilities, theme, e, and variants properties as parameters.
 * It returns nothing.
 *
 * @param addUtilities - The addUtilities function from Tailwind CSS.
 * @param theme - The theme object from Tailwind CSS.
 * @param e - The e function from Tailwind CSS.
 * @param variants - The variants object from Tailwind CSS.
 */
const iconSize = plugin(
	({ addUtilities, theme, e, variants }) => {
		const values = theme('iconSize');

		addUtilities(
			Object.entries(values).map(([key, value]) => ({
				[`.${e(`icon-size-${key}`)}`]: {
					width: value,
					height: value,
					minWidth: value,
					minHeight: value,
					fontSize: value,
					lineHeight: value,
					[`svg`]: {
						width: value,
						height: value
					}
				}
			})),
			variants('iconSize')
		);
	},
	{
		theme: {
			iconSize: (theme) => ({
				...theme('spacing')
			})
		},
		variants: {
			iconSize: ['responsive']
		}
	}
);

module.exports = iconSize;
