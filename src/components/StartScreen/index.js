import React from 'react';
import PropTypes from 'prop-types';
import { PlayButton } from '../common';
import { ThumbsUp } from '../SVGs';
import './css/style.css';

const StartScreen = ({ changePageChild }) => (
    <div id="startPage" className="start-page">
        <div id="triangle-bottom-right"></div>
        <div className="main-container">
            <div className="thumb-svg">
                <ThumbsUp />
            </div>
            <div className="content-container">
                <h2 className="text">Who wants to be a millionaire?</h2>
                <PlayButton text="Start"
                    changePageChild={changePageChild}
                    funcValue="game" />
            </div>
        </div>
    </div>
);

StartScreen.propTypes = {
  changePageChild: PropTypes.func,
};

export default StartScreen;
