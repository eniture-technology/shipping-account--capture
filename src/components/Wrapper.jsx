import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import UserGuide from '../pages/Guide';

const Settings = React.lazy(() => import('../pages/Settings'));

const Wrapper = () => {
	const [searchParams] = useSearchParams(),
		tab = searchParams.get('tab'),
		section = searchParams.get('section');

	if (tab.trim() !== 'eniture-sac') return;

	const components = {
		settings: <Settings />,
		guide: <UserGuide />,
	};

	return (
		<React.Suspense fallback={<Skeleton variant='rounded' animation='wave' height={500} />}>
			{components[section] || <Settings />}
		</React.Suspense>
	);
};

export default Wrapper;
