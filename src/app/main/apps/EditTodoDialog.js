import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditTodoDialog({
  value,
  open,
  handleChange,
  handleClose,
  handleSubmit,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <form
          onSubmit={handleSubmit}
        >
          <DialogContent>

            <TextField
              id="id"
              fullWidth
              value={value.id}
              sx={{ display: 'none' }}
            />
            <TextField
              autoFocus
              id="name"
              fullWidth
              value={value.title}
              onChange={handleChange}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Update</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

EditTodoDialog.defaultProps = {
  open: false,
  value: {},
  handleClose: () => {},
  handleChange: () => {},
  handleSubmit: () => {},
};

EditTodoDialog.propTypes = {
  open: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.object]),
  handleClose: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default EditTodoDialog;
