import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Button, Box, TextField
} from '@mui/material';
import AlertComponent from '../components/Alert';

const ConnectionSetting = () => {
  const [alertState, setAlertState] = useState({
    showAlert: false,
    msg: '',
    severity: 'success',
  });
  const [licenseKey, setLicenseKey] = useState('');
  const [testLoading, setTestLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetch(`${eniture_sac.eniture_sac_rest_url}get-license`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setLicenseKey(data.licenseKey);
        }
      })
      .catch(error => {
        setAlertState({
          showAlert: true,
          msg: 'An error occurred while fetching the license key',
          severity: 'error',
        });
      });
  }, []);

  const handleLicenseKeyChange = (e) => {
    setLicenseKey(e.target.value);
  };

  const validateLicenseKey = () => {
    if (!licenseKey) {
      setAlertState({
        showAlert: true,
        msg: 'License key is required',
        severity: 'error',
      });
      return false;
    }
    if (licenseKey.length > 50) {
      setAlertState({
        showAlert: true,
        msg: 'License key must be 50 characters or less',
        severity: 'error',
      });
      return false;
    }
    return true;
  };

  const handleTestConnection = () => {
    if (!validateLicenseKey()) {
      return;
    }

    setTestLoading(true);
    fetch(`${eniture_sac.eniture_sac_rest_url}test-connection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ licenseKey }),
    })
      .then(response => response.json())
      .then(data => {
        setTestLoading(false);
        if (data.success) {
          setAlertState({
            showAlert: true,
            msg: data.message,
            severity: 'success',
          });
        } else {
          setAlertState({
            showAlert: true,
            msg: data.message,
            severity: 'error',
          });
        }
      })
      .catch(error => {
        setTestLoading(false);
        setAlertState({
          showAlert: true,
          msg: 'An error occurred while testing connection.',
          severity: 'error',
        });
      });
  };

  const handleSaveLicenseKey = () => {
    if (!validateLicenseKey()) {
      return;
    }

    setSaveLoading(true);
    fetch(`${eniture_sac.eniture_sac_rest_url}save-license`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ licenseKey }),
    })
      .then(response => response.json())
      .then(data => {
        setSaveLoading(false);
        if (data.success) {
          setAlertState({
            showAlert: true,
            msg: 'Settings saved successfully.',
            severity: 'success',
          });
        } else {
          setAlertState({
            showAlert: true,
            msg: 'Failed to save license key: ' + data.message,
            severity: 'error',
          });
        }
      })
      .catch(error => {
        setSaveLoading(false);
        setAlertState({
          showAlert: true,
          msg: 'An error occurred while saving license key',
          severity: 'error',
        });
      });
  };

  return (
    <>
      <AlertComponent
        open={alertState.showAlert}
        setOpen={(showAlert) => setAlertState((prev) => ({ ...prev, showAlert }))}
        alertMsg={alertState.msg}
        severity={alertState.severity}
      />
      <Card sx={{ margin: '20px auto', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Connection Settings
          </Typography>
          <Box mt={3}>
            <TextField
              fullWidth
              label="Plugin License Key*"
              value={licenseKey}
              onChange={handleLicenseKeyChange}
              variant='standard'
              InputLabelProps={{ shrink: true }}
              inputProps={{ style: { padding: '10px' }, maxLength: 50 }}
              helperText={
                <Typography variant="caption">
                  Obtain a License Key from <a href="https://eniture.com/products/" target="_blank" rel="noopener noreferrer">eniture.com</a>
                </Typography>
              }
            />
          </Box>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleTestConnection}
              disabled={testLoading}
              sx={{ marginRight: 2 }}
            >
              {testLoading ? 'Testing...' : 'Test Connection'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveLicenseKey}
              disabled={saveLoading}
            >
              {saveLoading ? 'Saving...' : 'Save'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ConnectionSetting;
