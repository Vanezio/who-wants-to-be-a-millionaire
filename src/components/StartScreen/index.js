import React from 'react';
import { PlayButton } from '../common';
import { ThumbsUp } from '../SVGs';
import './css/style.css';

const StartScreen = () => (
    <div id="startPage" className="start-page">
        <div id="triangle-bottom-right"></div>
        <div className="main-container">
            <div className="thumb-svg">
                <ThumbsUp />
            </div>
            <div className="content-container">
                <h2 className="text">Who wants to be a millionaire?</h2>
                <PlayButton text="Start"
                    funcValue="game" />
            </div>
        </div>
    </div>
);

export default StartScreen;
