import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker, {unregister} from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
