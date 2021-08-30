import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../../../contexts/context';
import './css/style.css';

const PlayButton = ({ text, funcValue }) => {
  const { screenDispatch } = useContext(Context);

  return (<button className="play-button" onClick={() => {
    screenDispatch({
      type: 'CHANGE',
      payload: funcValue,
    });
  }}>{text}</button>);
};

PlayButton.propTypes = {
  text: PropTypes.string,
  funcValue: PropTypes.string,
};

export default PlayButton;
