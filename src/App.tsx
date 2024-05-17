import React from 'react';
import FullPageMap from './components/FullPageMap';

import './utils/configurations/leafletIcons';
import './App.css';

/**
 * The main application component that renders the full-page map.
 *
 * @returns {JSX.Element} The rendered application component.
 */
const App: React.FC = () => {
  return (
    <div className="App">
      <FullPageMap />
    </div>
  );
};

export default App;