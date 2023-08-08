import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { StyleSheetManager } from 'styled-components';
import { ReactElement } from 'react';

type Props = {
	document: Document;
	children: ReactElement;
};

function FramedDemo(props: Props) {
	const { children, document } = props;

	const theme = useTheme();
	React.useEffect(() => {
		document.body.dir = theme.direction;
	}, [document, theme.direction]);

	const cache = React.useMemo(
		() =>
			createCache({
				key: `iframe-demo-${theme.direction}`,
				prepend: true,
				container: document.head,
				stylisPlugins: theme.direction === 'rtl' ? [rtlPlugin] : []
			}),
		[document, theme.direction]
	);

	const getWindow = React.useCallback(() => document.defaultView, [document]);

	return (
		<StyleSheetManager
			target={document.head}
			stylisPlugins={theme.direction === 'rtl' ? [rtlPlugin] : []}
		>
			<CacheProvider value={cache}>
				<GlobalStyles
					styles={() => ({
						html: {
							fontSize: '62.5%'
						}
					})}
				/>
				{React.cloneElement(children, {
					window: getWindow
				})}
			</CacheProvider>
		</StyleSheetManager>
	);
}

export default FramedDemo;
