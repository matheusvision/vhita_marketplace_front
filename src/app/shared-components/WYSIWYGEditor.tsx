/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument */

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import clsx from 'clsx';

/**
 * The root component of the WYSIWYG editor.
 * @param {Object} props - The component props.
 * @param {string} props.className - The CSS class name to apply to the component.
 * @param {function} props.onChange - The function to call when the editor content changes.
 * @returns {JSX.Element} The WYSIWYGEditorComponent.
 */
const Root = styled('div')({
	'& .rdw-dropdown-selectedtext': {
		color: 'inherit'
	},
	'& .rdw-editor-toolbar': {
		borderWidth: '0 0 1px 0!important',
		margin: '0!important'
	},
	'& .rdw-editor-main': {
		padding: '8px 12px',
		height: `${256}px!important`
	}
});

/* The props for the WYSIWYG editor component.
 * @typedef {Object} WYSIWYGEditorComponentProps
 * @property {string} className - The CSS class name to apply to the component.
 * @property {function} onChange - The function to call when the editor content changes.
 */
type WYSIWYGEditorComponentProps = {
	className?: string;
	onChange: (T: string) => void;
};

/**
 * The WYSIWYG editor component.
 * @param {WYSIWYGEditorComponentProps} props - The component props.
 * @param {React.ForwardedRef<HTMLDivElement>} ref - The component ref.
 * @returns {JSX.Element} The WYSIWYGEditorComponent.
 */
function WYSIWYGEditorComponent(props: WYSIWYGEditorComponentProps, ref: React.ForwardedRef<HTMLDivElement>) {
	const { onChange, className = '' } = props;

	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	/**
	 * The function to call when the editor state changes.
	 * @param {EditorState} _editorState - The new editor state.
	 * @returns {void}
	 */
	function onEditorStateChange(_editorState) {
		setEditorState(_editorState);

		return onChange(draftToHtml(convertToRaw(_editorState.getCurrentContent())));
	}

	return (
		<Root
			className={clsx('w-full overflow-hidden rounded-4 border-1', className)}
			ref={ref}
		>
			<Editor
				editorState={editorState}
				onEditorStateChange={onEditorStateChange}
			/>
		</Root>
	);
}

const WYSIWYGEditor = React.forwardRef(WYSIWYGEditorComponent);

export default WYSIWYGEditor;
