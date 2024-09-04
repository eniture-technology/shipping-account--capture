import App from './App';
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { BrowserRouter } from 'react-router-dom';

import './style/index.scss';

domReady( () => {
    const root = createRoot(
        document.getElementById( 'eniture_sac_root' )
    );

    root.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
} );