import React, { useState } from 'react';
import PropTypes from 'prop-types';
import configData from './config.json';
import { ChoiceButton, PrizeField } from '../common';
import { BurgerMenuOpen, BurgerMenuClose } from '../SVGs';

import './css/style.css';

const GameScreen = ({ changePageChild, returnActivePrize }) => {
  const [...questions] = configData.questions;

  questions.sort((a, b) => a.prize.replace(/[^0-9]/g, '') - b.prize.replace(/[^0-9]/g, ''));
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [disable, setDisable] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const chooseAnswer = (event) => {
    if (!disable) {
      const index = event.currentTarget.getAttribute('data-key');
      if (selectedAnswer === +index) {
        const targetAnswer = questions[activeQuestionIndex].answers[index];
        const targetAnswerTruth = JSON.parse(targetAnswer.truth);
        if (targetAnswerTruth) {
          event.currentTarget.children[0].classList.add('right-answer');
          targetAnswer.chosen = 'true';
          if (questions[activeQuestionIndex]
            .answers
            .filter((elem) => JSON.parse(elem.truth))
            .every((elem) => elem
              .chosen)) {
            setDisable(true);
            returnActivePrize(questions[activeQuestionIndex].prize);
            setTimeout(() => {
              setDisable(false);
              setSelectedAnswer(null);
              document.querySelectorAll('.right-answer').forEach((elem) => elem.classList.remove('right-answer'));
              if (questions.length > activeQuestionIndex + 1) {
                setActiveQuestionIndex(activeQuestionIndex + 1);
              } else {
                returnActivePrize(questions[activeQuestionIndex].prize);
                changePageChild('end');
              }
            }, 500);
          }
        } else {
          event.currentTarget.classList.add('wrong-answer');
          setDisable(true);
          if (activeQuestionIndex !== 0) {
            returnActivePrize(questions[activeQuestionIndex - 1].prize);
          } else returnActivePrize('0');
          setTimeout(() => changePageChild('end'), 1000);
        }
      } else {
        setSelectedAnswer(+index);
      }
    }
  };
  const answerList = questions[activeQuestionIndex].answers.map((val, index) => {
    const answerIndex = String.fromCharCode('A'.charCodeAt(0) + index);
    return (<li className={selectedAnswer === index ? 'answ-list-item selected-answ' : 'answ-list-item'} key={index} data-key={index} onClick={chooseAnswer}>
        <ChoiceButton answerIndex={answerIndex} text={val.text} />
    </li>);
  });
  const prizeClass = (index) => {
    if (activeQuestionIndex === index) {
      return 'prize-list-item active-prize';
    } if (activeQuestionIndex > index) {
      return 'prize-list-item past-prize';
    }
    return 'prize-list-item';
  };
  const prizeList = questions
    .map((val, index) => <li className={prizeClass(index)} key={index}>
          <PrizeField text={val.prize} />
    </li>);
  return (
      <div id="gamePage" className="game-page">
          <div className="prize-burger" onClick={() => setBurgerMenu(!burgerMenu)} >
              {!burgerMenu ? <BurgerMenuOpen /> : <BurgerMenuClose /> }
          </div>
          <div id="gameContainer" className="game-container">
              <div className="game-content">
                  <div className="quest-container">
                      <p className="quest-text">{questions[activeQuestionIndex].text}</p>
                  </div>
                  <div className="answ-container">
                      <ul className="answ-list">
                          {answerList}
                      </ul>
                  </div>
              </div>
          </div>
          <div id="prizeContainer" className={burgerMenu ? 'prize-container show-prizes' : 'prize-container'}>
              <ul className="prize-list">
                  {prizeList}
              </ul>
          </div>
      </div>
  );
};

GameScreen.propTypes = {
  changePageChild: PropTypes.func,
  returnActivePrize: PropTypes.func,
};

export default GameScreen;
