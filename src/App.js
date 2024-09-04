import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import Topbar from './components/Topbar';

const App = () => {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#007cba',
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Box component='div' sx={ {maxWidth: 'md', margin: "auto"} }>
				<Topbar/>
				<Box component='div'>
					<Routes>
						<Route path='*' element={<Wrapper />} />
					</Routes>
				</Box>
			</Box>
		</ThemeProvider>
	  );
};

export default App;



