import React from 'react';
import { Card, CardContent, Typography, Box, Link } from '@mui/material';

const UserGuide = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" height="30vh" bgcolor="#f5f5f5" p={2} pt={10}>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="body1" component="p">
            The User Guide for this application is maintained on the publisher's website. To view it, click{' '}
            <Link href="https://eniture.com/diy-shipping-account-capture/#documentation" target="_blank" rel="noopener">
              here
            </Link>{' '}
            or paste the following link into your browser.
          </Typography>
          <Typography variant="body1" component="p" sx={{ mt: 2 }}>
            <Link href="https://eniture.com/diy-shipping-account-capture/#documentation" target="_blank" rel="noopener">
              https://eniture.com/diy-shipping-account-capture/#documentation
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserGuide;
