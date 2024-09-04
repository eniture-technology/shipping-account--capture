import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

const AlertComponent = ({ open, setOpen, alertMsg, severity }) => {
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }} width={500}>
			<Snackbar
				open={open}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				autoHideDuration={3000}
				onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity= {severity}
					variant='filled'
					sx={{ width: '100%' }}>
					{alertMsg}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default AlertComponent;
