import React from 'react';
import PropTypes from 'prop-types';
import './css/style.css';

const ChoiceButton = ({ text, answerIndex }) => (
    <div className="answer-field">
        <p className="answer-index">{answerIndex}</p>
        <p className="answer-text">{text}</p>
        <svg className="answer-svg" width="100%" height="100%" viewBox="0 0 405 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="left-stick" d="M0 36L17 36" stroke="#D0D0D8"/>
            <path className="right-stick" d="M388 36L405 36" stroke="#D0D0D8"/>
            <path className="main-path" d="M38.7172 5.28344C40.8781 2.28016 44.3521 0.5 48.052 0.5H356.948C360.648 0.5 364.122 2.28016 366.283 5.28344L388.384 36L366.283 66.7166C364.122 69.7198 360.648 71.5 356.948 71.5H48.052C44.3521 71.5 40.8781 69.7198 38.7172 66.7166L16.616 36L38.7172 5.28344Z" fill="white" stroke="#D0D0D8"/>
        </svg>
    </div>
);

ChoiceButton.propTypes = {
  text: PropTypes.string,
  answerIndex: PropTypes.string,
};

export default ChoiceButton;
