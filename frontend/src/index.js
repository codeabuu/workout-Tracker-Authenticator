import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {WorkoutContextProvider} from './context/workoutContext'
import {authContextProvider} from './context/authContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <authContextProvider>
		<WorkoutContextProvider>
			<App />
		</WorkoutContextProvider>
	</authContextProvider>
  </React.StrictMode>
);

