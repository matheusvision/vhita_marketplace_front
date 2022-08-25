const components = {};

export function registerComponent(name: any, Component: any) {
	components[name] = Component;
}

export default function FuseNavItem(props: any) {
	const C = components[props.type];
	return C ? <C {...props} /> : null;
}
