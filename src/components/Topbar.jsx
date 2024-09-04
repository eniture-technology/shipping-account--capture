import React, { useEffect, useState, useRef } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useSearchParams, Link } from 'react-router-dom';
import { Grid, Box, List, ListItem, ListItemButton, Divider } from '@mui/material';

const topBarButtons = [
	{ id: 'connection', title: 'Connection Setting', href: '?page=wc-settings&tab=eniture-sac&section=connection' },
	{ id: 'settings', title: 'Settings', href: '?page=wc-settings&tab=eniture-sac&section=settings' },
	{ id: 'guide', title: 'User Guide', href: '?page=wc-settings&tab=eniture-sac&section=guide' },
  ];

const Topbar = () => {
	const [searchParams] = useSearchParams();
	const [activeButton, setActiveButton] = useState(0);

	const handleClick = (event, id) => {
		setActiveButton(id);
	};

	const path = window.location.pathname + '?page=wc-settings&tab=eniture-sac&section=';

	useEffect(() => {
		setActiveButton(searchParams.get('section') || 'connection');
	}, [path]);

	return (
		<Box>
			<ButtonGroup variant={activeButton === -1 ? 'text' : 'contained'} fullWidth>
				{topBarButtons.map((button, index) => (
					<Button
					key={button.id}
					component={Link} // Wrap Button with Link for routing
          			to={button.href}
					onClick={(event) => handleClick(event, button.id)}
					variant={activeButton === button.id ? 'contained' : 'text'}
					>
					{button.title}
					</Button>
				))}
			</ButtonGroup>
		</Box>
		
	);
};

export default Topbar;
