import './App.css';
import React, { useReducer } from 'react';
import Context from './contexts/context';
import screeReducer from './reducers/screenReducer';
import prizeReducer from './reducers/prizeReducer';

import {
  StartScreen,
  GameScreen,
  EndScreen,
} from './components';

function App() {
  // useState stores which screen should be rendered
  const [screenState, screenDispatch] = useReducer(screeReducer, '');
  // useState stores prize value
  const [prizeState, prizeDispatch] = useReducer(prizeReducer, '');

  // returns needed page component, returns start page by default
  const returnPage = () => {
    switch (screenState) {
      default:
        return <StartScreen/>;
      case 'game':
        return <GameScreen/>;
      case 'end':
        return <EndScreen prize={prizeState} />;
    }
  };

  return (
    <Context.Provider value={{
      screenDispatch,
      prizeDispatch,
    }}>
      <div className="App">
        <div className="page-viewer">
          {returnPage()}
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
