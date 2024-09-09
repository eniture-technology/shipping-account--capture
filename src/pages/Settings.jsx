import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Button, Box, IconButton, Divider, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AlertComponent from '../components/Alert';
import CarrierModal from '../components/CarrierModal';
import ServiceModal from '../components/ServiceModal';

const Settings = () => {
  const [alertState, setAlertState] = useState({
    showAlert: false,
    msg: '',
    severity: 'success',
  });
  const [carrierModal, setCarrierModal] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [currentCarrier, setCurrentCarrier] = useState(null);
  const [currentService, setCurrentService] = useState(null);
  const [carrierAnchorEl, setCarrierAnchorEl] = useState(null);
  const [serviceAnchorEl, setServiceAnchorEl] = useState(null);
  const [carriers, setCarriers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  useEffect(() => {
    fetchCarriers();
  }, []);

  const fetchCarriers = () => {
    fetch(`${eniture_sac.eniture_sac_rest_url}bill-to-options`)
      .then(response => response.json())
      .then(data => {
        setCarriers(data);
      })
      .catch(error => {
        setAlertState({ showAlert: true, msg: 'Unable to fetch bill to options', severity: 'error' });
      });
  };

  const handleAddEditCarrier = (newCarrier) => {
    const url = `${eniture_sac.eniture_sac_rest_url}bill-to-option`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCarrier),
    })
      .then(response => response.json())
      .then(() => {
        setAlertState({
          showAlert: true,
          msg: newCarrier.id ? 'Updated successfully' : 'Created successfully',
          severity: 'success',
        });
        fetchCarriers();
        setCarrierModal(false);
      })
      .catch(error => {
        setAlertState({
          showAlert: true,
          msg: 'An error occurred while saving carrier',
          severity: 'error',
        });
      });
  };

  const handleAddEditService = (newService) => {
    const url = `${eniture_sac.eniture_sac_rest_url}service`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newService),
    })
      .then(response => response.json())
      .then(() => {
        setAlertState({
          showAlert: true,
          msg: newService.id ? 'Updated successfully' : 'Created successfully',
          severity: 'success',
        });
        fetchCarriers();
        setServiceModal(false);
      })
      .catch(error => {
        setAlertState({
          showAlert: true,
          msg: 'An error occurred while saving service',
          severity: 'error',
        });
      });
  };

  const handleCarrierMenuClick = (event, carrier) => {
    setCarrierAnchorEl(event.currentTarget);
    setCurrentCarrier(carrier);
  };

  const handleServiceMenuClick = (event, service) => {
    setServiceAnchorEl(event.currentTarget);
    setCurrentService(service);
  };

  const handleCarrierEditClick = () => {
    setCarrierModal(true);
    handleCarrierMenuClose();
  };

  const handleServiceEditClick = () => {
    setServiceModal(true);
    handleServiceMenuClose();
  };

  const handleDeleteClick = (type) => {
    setDeleteId(type === 'carrier' ? currentCarrier.id : currentService.id);
    setDeleteType(type);
    setDeleteDialogOpen(true);
    handleCarrierMenuClose();
    handleServiceMenuClose();
  };

  const handleDeleteConfirm = () => {
    const url = deleteType === 'carrier'
      ? `${eniture_sac.eniture_sac_rest_url}bill-to-option`
      : `${eniture_sac.eniture_sac_rest_url}service`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: deleteId, delete: '1' }),
    })
      .then(response => response.json())
      .then(() => {
        setAlertState({
          showAlert: true,
          msg: 'Deleted successfully',
          severity: 'success',
        });
        setDeleteDialogOpen(false);
        setDeleteId(null);
        fetchCarriers();
      })
      .catch(error => {
        setAlertState({
          showAlert: true,
          msg: 'An error occurred while deleting data',
          severity: 'error',
        });
      });
  };

  const handleCarrierMenuClose = () => {
    setCarrierAnchorEl(null);
  };

  const handleServiceMenuClose = () => {
    setServiceAnchorEl(null); 
  };

  return (
    <>
      <AlertComponent
        open={alertState.showAlert}
        setOpen={(showAlert) => setAlertState((prev) => ({ ...prev, showAlert }))}
        alertMsg={alertState.msg}
        severity={alertState.severity}
      />
      <CarrierModal open={carrierModal} setOpen={setCarrierModal} onSave={handleAddEditCarrier} carrier={currentCarrier} />
      <ServiceModal open={serviceModal} setOpen={setServiceModal} onSave={handleAddEditService} service={currentService} />

      <Card sx={{ margin: '20px auto', padding: '20px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="div">
            Bill-to options
          </Typography>
          <Button style={{ textTransform: 'initial' }} onClick={() => { setCurrentCarrier(null); setCarrierModal(true); }}>
            + Add a bill to option
          </Button>
        </Box>
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            These options will be displayed as a shipping option on the checkout page.
          </Typography>
        </CardContent>
        <Divider sx={{ marginY: '20px' }} />
        <Box sx={{ margin: '20px auto' }}>
          {carriers.map(carrier => (
            <Box key={carrier.id}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" component="div">
                  {carrier.bill_to_title}
                </Typography>
                <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={(event) => handleCarrierMenuClick(event, carrier)}>
                  <MoreHorizIcon />
                </IconButton>
              </Box>
              <Box>
                {carrier.services.length === 0 ? (
                  <Box sx={{ backgroundColor: '#f1f1f1', padding: '10px', textAlign: 'center', borderRadius: '4px' }}>
                    Add service option to offer at checkout
                  </Box>
                ) : (
                  carrier.services.map(service => (
                    <Card key={service.id} sx={{ marginTop: '10px', padding: '10px', backgroundColor: '#f9f9f9' }}>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={8}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {service.service_title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {service.service_description}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} display="flex" justifyContent="flex-end" alignItems="center">
                            <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={(event) => handleServiceMenuClick(event, service)}>
                              <MoreHorizIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))
                )}
              </Box>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button style={{ textTransform: 'initial' }} onClick={() => { setCurrentService({ id: 0, bill_to_option_id: carrier.id }); setServiceModal(true); }}>
                  + Add a service
                </Button>
              </Box>
              <Divider sx={{ marginY: '20px' }} />
            </Box>
          ))}
        </Box>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, this action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Carrier Menu */}
      <Menu
        anchorEl={carrierAnchorEl}
        keepMounted
        open={Boolean(carrierAnchorEl)}
        onClose={handleCarrierMenuClose}
      >
        <MenuItem onClick={handleCarrierEditClick}>Edit</MenuItem>
        <MenuItem onClick={() => handleDeleteClick('carrier')}>Delete</MenuItem>
      </Menu>

      {/* Service Menu */}
      <Menu
        anchorEl={serviceAnchorEl}
        keepMounted
        open={Boolean(serviceAnchorEl)}
        onClose={handleServiceMenuClose}
      >
        <MenuItem onClick={handleServiceEditClick}>Edit</MenuItem>
        <MenuItem onClick={() => handleDeleteClick('service')}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default Settings;
