import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { assertionsSom,
  calculaScore, fetchGravatar, fetchQuestions, logout } from '../redux/action';

class Game extends Component {
  state = {
    correct: '',
    incorrect: '',
    seconds: 30,
    shuffledAnswers: [],
    disabled: false,
    resultsIndex: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    dispatch(fetchQuestions(token));

    const duration = 1000;

    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }), () => {
        const { seconds } = this.state;
        if (seconds <= 0) {
          clearInterval(this.interval);
          this.setState({
            seconds: 0,
            disabled: true,
          });
        }
      });
    }, duration);
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props;
    if (questions !== prevProps.questions) {
      this.shuffleAnswers();
    }
  }

  scoreSom = (target) => {
    const { resultsIndex, seconds } = this.state;
    const { questions, dispatch } = this.props;
    const { results } = questions;
    if (results[resultsIndex].correct_answer === target.value) {
      dispatch(calculaScore(
        Number(seconds),
        results[resultsIndex].difficulty.toString(),
      ));
      dispatch(assertionsSom(1));
    }
  };

  handleClick = ({ target }) => {
    this.setState({
      correct: 'correct',
      incorrect: 'incorrect',
    }, this.scoreSom(target));
  };

  nextQuestion = () => {
    const limiteIndex = 4;
    const { resultsIndex } = this.state;
    if (resultsIndex === limiteIndex) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState((prev) => ({
      ...prev,
      correct: '',
      incorrect: '',
      seconds: 30,
      shuffledAnswers: [],
      disabled: false,
      resultsIndex: (prev.resultsIndex < limiteIndex) ? prev.resultsIndex + 1 : 0,
    }), () => this.shuffleAnswers());
  };

  shuffleAnswers() {
    const { resultsIndex } = this.state;
    const { questions } = this.props;
    const { results } = questions;
    if (results && results.length > 0) {
      const firstQuestion = results[resultsIndex];

      const shuffledAnswers = this.shuffleArray([
        ...firstQuestion.incorrect_answers,
        firstQuestion.correct_answer,
      ]);

      this.setState({
        shuffledAnswers,
      });
    }
  }

  shuffleArray(array) {
    const newArray = [...array];
    for (let index = newArray.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [newArray[index], newArray[randomIndex]] = [newArray[randomIndex], newArray[index]];
    }
    return newArray;
  }

  render() {
    const { questions, player: { name, score, gravatarEmail } } = this.props;
    const { results } = questions;
    const { correct, incorrect, seconds,
      shuffledAnswers, disabled, resultsIndex } = this.state;
    const TOKEN_EXPIRED = 3;
    const inicialSeconds = 30;

    if (questions.response_code === TOKEN_EXPIRED) {
      const { history, dispatch } = this.props;
      dispatch(logout());
      history.push('/');
    }

    let content = null;
    if (results && results.length > 0) {
      const firstQuestion = results[resultsIndex];

      content = (
        <>
          <div>
            <p data-testid="question-category">{firstQuestion.category}</p>
            <p data-testid="question-text">{firstQuestion.question}</p>
          </div>
          <div data-testid="answer-options">
            {shuffledAnswers.map((answer, index) => (
              <button
                key={ index }
                data-testid={
                  answer === firstQuestion.correct_answer
                    ? 'correct-answer'
                    : `wrong-answer-${index}`
                }
                className={ answer === firstQuestion.correct_answer
                  ? correct : incorrect }
                onClick={ this.handleClick }
                disabled={ disabled }
                value={ answer }
              >
                {answer}
              </button>
            ))}
          </div>
        </>
      );
    }
    const { history } = this.props;
    return (
      <header>
        {seconds === 0 && history.push('/feedback')}
        <div className="game-container">
          <img
            alt="img"
            src={ fetchGravatar(gravatarEmail) }
            data-testid="header-profile-picture"
          />
          <div className="game-timer">
            <p data-testid="header-player-name">{name}</p>
            <p data-testid="header-score">
              Points:
              {score}
            </p>
          </div>
          <div className="timer">
            <p>{seconds}</p>
          </div>
        </div>
        {(seconds <= inicialSeconds) && content}
        {correct
        && (
          <button
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Next
          </button>)}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  questions: state.requestQuestions.questions,
  player: { ...state.player },
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questions: PropTypes.shape({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  }).isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
