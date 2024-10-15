import React, { Component, ReactNode } from 'react';
import _ from 'lodash';
import { defaultSettings, getParsedQuerySettings } from '@fuse/default-settings';
import settingsConfig from 'src/configs/settingsConfig';
import themeLayoutConfigs from 'src/components/theme-layouts/themeLayoutConfigs';
import { FuseSettingsConfigType, FuseThemesType } from '@fuse/core/FuseSettings/FuseSettings';
import { getFuseRouteParamUtil } from '@fuse/hooks/useFuseRouteParameter';
import withRouter, { WithRouterProps } from '@fuse/core/withRouter/withRouter';
import withUser from '@auth/withUser';
import { User } from '@auth/user';

type FuseSettingsProviderState = {
	initialData: FuseSettingsConfigType;
	data: FuseSettingsConfigType;
};

// FuseSettingsContext type
export type FuseSettingsContextType = FuseSettingsProviderState & {
	setSettings: (newSettings: Partial<FuseSettingsConfigType>) => void;
	changeTheme: (newTheme: FuseThemesType) => void;
};

// Context with a default value of undefined
export const FuseSettingsContext = React.createContext<FuseSettingsContextType | undefined>(undefined);

// Get initial settings
const getInitialSettings = (): FuseSettingsConfigType => {
	const defaultLayoutStyle = settingsConfig.layout?.style || 'layout1';
	const layout = {
		style: defaultLayoutStyle,
		config: themeLayoutConfigs[defaultLayoutStyle]?.defaults
	};
	return _.merge({}, defaultSettings, { layout }, settingsConfig, getParsedQuerySettings());
};

const initialSettings = getInitialSettings();

interface FuseSettingsProviderProps extends WithRouterProps {
	children: ReactNode;
	data: User;
	isGuest: boolean;
}

class FuseSettingsProvider extends Component<FuseSettingsProviderProps, FuseSettingsProviderState> {
	constructor(props: FuseSettingsProviderProps) {
		super(props);

		const initialData = _.merge({}, initialSettings, props?.data?.settings);

		this.state = {
			initialData,
			data: initialData
		};
	}

	static getDerivedStateFromProps(nextProps: FuseSettingsProviderProps, prevState: FuseSettingsProviderState) {
		const { data: user, isGuest, location } = nextProps;
		const userSettings = user?.settings || {};
		const matchedSettings = getFuseRouteParamUtil(location.pathname, 'settings', true);

		const newSettings = isGuest
			? _.merge({}, prevState.initialData, matchedSettings)
			: (_.merge({}, prevState.initialData, userSettings, matchedSettings) as FuseSettingsConfigType);

		if (!_.isEqual(prevState.data, newSettings)) {
			return { data: newSettings };
		}

		return prevState;
	}

	shouldComponentUpdate(nextProps: FuseSettingsProviderProps, nextState: { data: FuseSettingsConfigType }) {
		const { data } = this.state;
		return !_.isEqual(data, nextState.data);
	}

	setSettings = (newSettings: Partial<FuseSettingsConfigType>) => {
		this.setState((prevState) => {
			const _settings = _.merge({}, prevState.initialData, newSettings);

			if (_.isEqual(_settings, prevState.data)) {
				return prevState;
			}

			return { ...prevState, initialData: _settings, data: _settings };
		});
	};

	changeTheme = (newTheme: FuseThemesType) => {
		this.setState((prevState) => {
			const { navbar, footer, toolbar, main } = newTheme;

			const _settings = {
				...prevState.data,
				theme: { main, navbar, toolbar, footer }
			};

			return {
				...prevState,
				initialData: _settings,
				data: _settings
			};
		});
	};

	render() {
		const { children } = this.props;
		const { data, initialData } = this.state;
		const { setSettings, changeTheme } = this;

		// eslint-disable-next-line react/jsx-no-constructed-context-values
		const contextValue: FuseSettingsContextType = {
			data,
			initialData,
			setSettings,
			changeTheme
		};

		return <FuseSettingsContext.Provider value={contextValue}>{children}</FuseSettingsContext.Provider>;
	}
}
const FuseSettingsProviderWithRouterUser = withRouter(withUser(FuseSettingsProvider));
export default FuseSettingsProviderWithRouterUser;
