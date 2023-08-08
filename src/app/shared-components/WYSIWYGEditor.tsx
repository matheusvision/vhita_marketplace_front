/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument */

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import clsx from 'clsx';

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

type Props = {
	className?: string;
	onChange: (T: string) => void;
};

function WYSIWYGEditorComponent(props: Props, ref: React.ForwardedRef<HTMLDivElement>) {
	const { onChange, className = '' } = props;

	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	function onEditorStateChange(_editorState) {
		setEditorState(_editorState);

		return onChange(draftToHtml(convertToRaw(_editorState.getCurrentContent())));
	}

	return (
		<Root
			className={clsx('rounded-4 border-1 overflow-hidden w-full', className)}
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
