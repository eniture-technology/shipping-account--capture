import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, IconButton, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ServiceModal = ({ open, setOpen, onSave, service }) => {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const handleClose = () => {
    setOpen(false);
    setError('');
    setDescriptionError('');
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
    if (description.length > 50) {
      setDescriptionError('The description must be 50 characters or less.');
      return;
    }

    const newService = {
      id: service ? service.id : 0,
      service_title: label,
      service_description: description,
      bill_to_option_id: service ? service.bill_to_option_id : null,
    };
    onSave(newService);
    handleClose();
  };

  useEffect(() => {
    if (service) {
      setLabel(service.service_title || '');
      setDescription(service.service_description || '');
    }
  }, [service]);

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
    <Dialog open={open} onClose={handleClose} aria-labelledby='services-dialog-title' maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }} id='services-dialog-title'>
        Service option
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
            variant='standard'
						InputLabelProps={{ shrink: true }}
            size='medium'
            inputProps={{ style: { padding: '10px' } }}
            fullWidth
            margin="normal"
            error={Boolean(error)}
            helperText={error}
          />
          <Typography variant="p" color="textSecondary" sx={{ mt: 0 }}>
          This will be shown as a service name at checkout. Account number will be appended to the end of the service name while displaying it at checkout.
          </Typography>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant='standard'
						InputLabelProps={{ shrink: true }}
            size='medium'
            inputProps={{ style: { padding: '10px' } }}
            fullWidth
            margin="normal"
            error={Boolean(descriptionError)}
            helperText={descriptionError}
          />
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

export default ServiceModal;
