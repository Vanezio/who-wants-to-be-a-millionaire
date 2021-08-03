import './App.css';
import React, { useState } from 'react';

import {
  StartScreen,
  GameScreen,
  EndScreen,
} from './components';

function App() {
  // useState stores which screen should be rendered
  const [pageState, setPageState] = useState();
  // useState stores prize value
  const [activePrize, setActivePrize] = useState('0');

  // functions to pass to the child so it can change parents useState
  // function to change pages
  const changePageChild = (val) => {
    setPageState(val);
  };

  // function to return prize
  const returnActivePrize = (val) => {
    setActivePrize(val);
  };

  // returns needed page component, returns start page by default
  const returnPage = () => {
    switch (pageState) {
      default:
        return <StartScreen changePageChild={changePageChild}/>;
      case 'game':
        return <GameScreen changePageChild={changePageChild}
        returnActivePrize={returnActivePrize} />;
      case 'end':
        return <EndScreen changePageChild={changePageChild}
        prize={activePrize} />;
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
