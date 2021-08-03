import React, { useState } from 'react';
import PropTypes from 'prop-types';
import configData from './config.json';
import { ChoiceButton, PrizeField } from '../common';
import { BurgerMenuOpen, BurgerMenuClose } from '../SVGs';

import './css/style.css';

const GameScreen = ({ changePageChild, returnActivePrize }) => {
  // Variable that stores all questions from JSON file
  const [...questions] = configData.questions;

  // Sorting questions by size of a prize
  questions.sort((a, b) => a.prize.replace(/[^0-9]/g, '') - b.prize.replace(/[^0-9]/g, ''));
  // useState to track index of am active questions
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  // useState to track which answer is selected
  const [selectedAnswer, setSelectedAnswer] = useState();
  // useState to disable answers
  const [disable, setDisable] = useState(false);
  // useState for changing burger menu appearance
  const [burgerMenu, setBurgerMenu] = useState(false);
  // functions to chose an answer
  const chooseAnswer = (event) => {
    if (!disable) {
      // extract index of a chosen answer from targets data attribute
      const index = event.currentTarget.getAttribute('data-key');
      // condition to know is it first 'select click' or second 'answer' click
      if (selectedAnswer === +index) {
        // clicked answer
        const targetAnswer = questions[activeQuestionIndex].answers[index];
        // is clicked answer the right one
        const targetAnswerTruth = JSON.parse(targetAnswer.truth);
        // check the answer
        if (targetAnswerTruth) {
          event.currentTarget.children[0].classList.add('right-answer');
          // mark a chosen answer
          targetAnswer.chosen = 'true';
          // condition to check if all right answers been chosen
          if (questions[activeQuestionIndex]
            .answers
            .filter((elem) => JSON.parse(elem.truth))
            .every((elem) => elem
              .chosen)) {
            // disable clicks on answers for safety between changing questions
            setDisable(true);
            // timeout for that adds a 'flow' to the game
            setTimeout(() => {
              setDisable(false);
              // clearing selected answers
              setSelectedAnswer(null);
              // clearing classes from past right answers
              document.querySelectorAll('.right-answer').forEach((elem) => elem.classList.remove('right-answer'));
              // checking if it was the last question
              if (questions.length > activeQuestionIndex + 1) {
                // setting next index for an active question
                setActiveQuestionIndex(activeQuestionIndex + 1);
              } else {
                // returning gained prize to the parent
                returnActivePrize(questions[activeQuestionIndex].prize);
                // changing to the end screen
                changePageChild('end');
              }
            }, 500);
          }
        } else {
          // oopsie someone choose a wring answer
          event.currentTarget.classList.add('wrong-answer');
          setDisable(true);
          // checking was it first question, and should any prize be returned
          if (activeQuestionIndex !== 0) {
            returnActivePrize(questions[activeQuestionIndex - 1].prize);
          } else returnActivePrize('0');
          setTimeout(() => changePageChild('end'), 1000);
        }
      } else {
        // set selected answer index
        setSelectedAnswer(+index);
      }
    }
  };
  // array of answer elements
  const answerList = questions[activeQuestionIndex].answers.map((val, index) => {
    // character generator for list style
    const answerIndex = String.fromCharCode('A'.charCodeAt(0) + index);
    return (<li className={selectedAnswer === index ? 'answ-list-item selected-answ' : 'answ-list-item'} key={index} data-key={index} onClick={chooseAnswer}>
        <ChoiceButton answerIndex={answerIndex} text={val.text} />
    </li>);
  });
  // return class for already gained or an active prize
  const prizeClass = (index) => {
    if (activeQuestionIndex === index) {
      return 'prize-list-item active-prize';
    } if (activeQuestionIndex > index) {
      return 'prize-list-item past-prize';
    }
    return 'prize-list-item';
  };
  // array of prize elements
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
