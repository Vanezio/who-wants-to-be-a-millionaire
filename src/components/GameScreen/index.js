import React, { useState, useEffect, useContext } from 'react';
import Context from '../../contexts/context';

import configData from './config.json';

import { ChoiceButton, PrizeField } from '../common';
import { BurgerMenuOpen, BurgerMenuClose } from '../SVGs';

import './css/style.css';

const GameScreen = () => {
  // Variable that stores all questions from JSON file
  const [...questions] = configData.questions;

  // Sorting questions by size of a prize
  questions.sort((a, b) => a.prize.replace(/[^0-9]/g, '') - b.prize.replace(/[^0-9]/g, ''));

  const { screenDispatch } = useContext(Context);
  const { prizeDispatch } = useContext(Context);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [disable, setDisable] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [rightChosen, setRightChosen] = useState([]);

  const rightAnswer = () => {
    // condition to check if all right answers been chosen
    if (questions[activeQuestionIndex]
      .answers
      .filter((elem) => JSON.parse(elem.truth))
      .every((elem) => elem
        .chosen)) {
      // disable clicks on answers for safety between changing questions
      setDisable(true);

      setTimeout(() => {
        setDisable(false);
        setSelectedAnswer(null);
        // checking if it was the last question
        if (questions.length > activeQuestionIndex + 1) {
          setActiveQuestionIndex(activeQuestionIndex + 1);
        } else {
          prizeDispatch({
            type: 'UPDATE',
            payload: questions[activeQuestionIndex].prize,
          });
          screenDispatch({
            type: 'CHANGE',
            payload: 'end',
          });
        }
      }, 500);
    }
  };

  const wrongAnswer = (target) => {
    target.classList.add('wrong-answer');
    setDisable(true);
    // checking was it first question, and should any prize be returned
    if (activeQuestionIndex !== 0) {
      prizeDispatch({
        type: 'UPDATE',
        payload: questions[activeQuestionIndex - 1].prize,
      });
    } else prizeDispatch({ type: 'UPDATE', payload: '0' });
    setTimeout(() => screenDispatch({ type: 'CHANGE', payload: 'end' }), 1000);
  };

  // functions to chose an answer
  const chooseAnswer = (event) => {
    if (!disable) {
      // extract index of a chosen answer from targets data attribute
      const index = event.currentTarget.getAttribute('data-key');
      // condition to know is it first 'select click' or second 'answer' click
      if (selectedAnswer === +index) {
        const targetAnswer = questions[activeQuestionIndex].answers[index];
        // is clicked answer the right one
        const targetAnswerTruth = JSON.parse(targetAnswer.truth);
        // check the answer
        if (targetAnswerTruth) {
          targetAnswer.chosen = 'true';
          setRightChosen([
            ...rightChosen,
            +index,
          ]);
        } else {
          wrongAnswer(event.currentTarget);
        }
      } else {
        setSelectedAnswer(+index);
      }
    }
  };

  // return class for clicked answer
  const answerClass = (index) => {
    if (rightChosen.includes(index)) {
      return 'answ-list-item right-answer';
    }
    if (selectedAnswer === index) {
      return 'answ-list-item selected-answ';
    }
    return 'answ-list-item';
  };

  // array of answer elements
  const answerList = questions[activeQuestionIndex].answers.map((val, index) => {
    // character generator for list style
    const answerIndex = String.fromCharCode('A'.charCodeAt(0) + index);
    return (<li className={answerClass(index)} key={index} data-key={index} onClick={chooseAnswer}>
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

  // call function only after indicator was applied
  useEffect(() => {
    rightAnswer();
  }, [rightChosen]);

  // reset correct answers
  useEffect(() => {
    setRightChosen([]);
  }, [activeQuestionIndex]);

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

export default GameScreen;
