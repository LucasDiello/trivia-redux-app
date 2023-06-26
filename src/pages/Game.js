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

  // Caso queiram saber mais sobre o timer https://stackoverflow.com/questions/30427882/make-a-timer-using-setinterval

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

  // Função para atualizar o state caso haja alteração nas perguntas// o valor anterior de questions era [] e agora é um objeto, tive que adptar a condição por conta do ciclo de vida e tempo de chamada da API;

  componentDidUpdate(prevProps) {
    const { questions } = this.props;
    if (questions !== prevProps.questions) {
      this.shuffleAnswers();
    }
  }

  // função que dispara action de soma do score
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

  // Função para adicionar a classe correta ou incorreta ao botão clicado

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

  // Função para embaralhar as respostas e colocar no state
  shuffleAnswers() {
    const { resultsIndex } = this.state;
    const { questions } = this.props;
    const { results } = questions;
    if (results && results.length > 0) {
      const firstQuestion = results[resultsIndex];

      // constante com as respostas embaralhadas, recebe o retorno da função shuffleArray que recebe um array com as respostas incorretas e a resposta correta

      const shuffledAnswers = this.shuffleArray([
        ...firstQuestion.incorrect_answers,
        firstQuestion.correct_answer,
      ]);

      this.setState({
        shuffledAnswers,
      });
    }
  }

  // Caso queiram entender melhor a função de embaralhar https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

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

    // condição para verificar se o token expirou

    if (questions.response_code === TOKEN_EXPIRED) {
      const { history, dispatch } = this.props;
      dispatch(logout());
      history.push('/');
    }

    // conteudo da pagina/ motivo de estar em uma variavel é por conta do tempo de resposta da API

    let content = null;
    if (results && results.length > 0) {
      const firstQuestion = results[resultsIndex];

      content = (
        <>
          <div>
            <p>{seconds}</p>
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

    return (
      <header>
        <img
          alt="img"
          src={ fetchGravatar(gravatarEmail) }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
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
