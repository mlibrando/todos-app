import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Snackbar,
} from '@mui/material';

function AlertSnackbar({
  open,
  handleClose,
  message,
}) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

AlertSnackbar.defaultProps = {
  open: false,
  handleClose: () => {},
  message: '',
};

AlertSnackbar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  message: PropTypes.string,
};

export default AlertSnackbar;
