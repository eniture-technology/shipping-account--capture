import React, { useState, useEffect, useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CarrierModal = ({ open, setOpen, onSave, carrier }) => {
  const [label, setLabel] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleSave = () => {
    if (label.trim() === '') {
      setError('Label is required');
      return;
    }
    if (label.length > 20) {
      setError('The label must be 20 characters or less');
      return;
    }

    const newCarrier = {
      id: carrier ? carrier.id : 0,
      bill_to_title: label,
    };
    onSave(newCarrier);
    handleClose();
  };

  useEffect(() => {
    if (carrier) {
      setLabel(carrier.bill_to_title || '');
    }
  }, [carrier]);

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='carriers-dialog-title' maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }} id='carriers-dialog-title'>
        Bill-to option
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '93%', p: 2 }}>
          <TextField
            label="Label*"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            size='medium'
            variant='standard'
						InputLabelProps={{ shrink: true }}
            inputProps={{ style: { padding: '10px' } }}
            fullWidth
            margin="normal"
            error={Boolean(error)}
            helperText={error}
          />
          <Typography variant="p" color="textSecondary" sx={{ mt: 0 }}>
            This will be shown as a dropdown on the checkout page.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarrierModal;
