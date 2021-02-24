import {
  createStyles,
  makeStyles,
  TextField,
  Theme,
  withStyles,
} from '@material-ui/core';

export const useStylesDatepicker = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: '100%',
      marginTop: '-1px',
      '& .MuiOutlinedInput-adornedEnd': {
        background: 'white',
      },
      '& .MuiInputBase-root': {
        '& fieldset': {
          borderColor: '#ccc',
        },
        '&:hover fieldset': {
          borderColor: '#ccc',
        },
        '&:focus fieldset': {
          borderColor: '#ccc',
        },
        '&.Mui-focused fieldset': {
          border: '1px solid',
          borderColor: '#8cbbec',
        },
      },
    },
  }),
);

export const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#555',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc',
      },
      '&:hover fieldset': {
        borderColor: '#ccc',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid',
        borderColor: '#8cbbec',
      },
      '& .MuiAutocomplete-popper': {
        top: '-5px',
      },
    },
  },
})(TextField);
