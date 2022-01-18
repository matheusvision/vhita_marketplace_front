import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OutlinedInput } from '@mui/material';
import { motion } from 'framer-motion';
import InputAdornment from '@mui/material/InputAdornment';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { setNotesSearchText } from './store/notesSlice';

function NotesSearch(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(({ notesApp }) => notesApp.notes.notesSearchText);

  const [search, setSearch] = useState(false);

  return (
    <OutlinedInput
      component={motion.div}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-1 items-center px-16 rounded-full h-40 w-full max-w-320 sm:max-w-240"
      placeholder="Search note"
      variant="outlined"
      fullWidth
      startAdornment={
        <InputAdornment position="start">
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>
        </InputAdornment>
      }
      inputProps={{
        'aria-label': 'Search',
      }}
      value={searchText}
      onChange={(ev) => dispatch(setNotesSearchText(ev))}
    />
  );
}

NotesSearch.propTypes = {};
NotesSearch.defaultProps = {
  trigger: (
    <IconButton className="w-64 h-64" size="large">
      <Icon>search</Icon>
    </IconButton>
  ),
};

export default NotesSearch;
