import './App.css';
import React, { useState } from 'react';

import {
  StartScreen,
  GameScreen,
  EndScreen,
} from './components';

function App() {
  const [pageState, setPageState] = useState('start');
  const [activePrize, setActivePrize] = useState('0');

  const changePageChild = (val) => {
    setPageState(val);
  };

  const returnActivePrize = (val) => {
    setActivePrize(val);
  };

  const returnPage = () => {
    switch (pageState) {
      case 'start':
        return <StartScreen changePageChild={changePageChild} />;
      case 'game':
        return <GameScreen changePageChild={changePageChild}
        returnActivePrize={returnActivePrize} />;
      case 'end':
        return <EndScreen changePageChild={changePageChild}
        prize={activePrize} />;
      default:
        return <GameScreen changePageChild={changePageChild}
        returnActivePrize={returnActivePrize} />;
    }
  };

  return (
    <div className="App">
      <div className="page-viewer">
        {returnPage()}
      </div>
    </div>
  );
}

export default App;
