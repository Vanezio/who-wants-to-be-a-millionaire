import React from 'react';
import PropTypes from 'prop-types';
import { PlayButton } from '../common';
import { ThumbsUp } from '../SVGs';
import './css/style.css';

const EndScreen = ({ prize }) => (
    <div id="endPage" className="end-page">
        <div className="main-container">
            <div className="thumb-svg">
                <ThumbsUp />
            </div>
            <div className="content-container">
                <div className="text-content">
                    <p className="total-score">Total score:</p>
                    <h2 className="score-text">${prize} earned</h2>
                </div>
                <PlayButton text="Try again"
                    funcValue="game"></PlayButton>
            </div>
        </div>
    </div>
);

EndScreen.propTypes = {
  prize: PropTypes.string,
};

export default EndScreen;
