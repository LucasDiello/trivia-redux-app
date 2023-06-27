import React from "react"
import { screen } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux"
import userEvent from "@testing-library/user-event"
import Feedback from "../pages/Feedback"
import { toBeEnabled } from "@testing-library/jest-dom/dist/matchers";

describe('Testando a Pagina feedback', () =>{
it('testa se os os botões esta sendo renderizados na tela feedback', () =>{
    renderWithRouterAndRedux(<Feedback/>)
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    const btnRanking = screen.getByTestId('btn-ranking');
    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
    })
    it('Testa se os botoes estao habilitados', () => {
        
             renderWithRouterAndRedux(<Feedback />);
            const btnPlayAgain = screen.getByTestId('btn-play-again');
            const btnRanking = screen.getByTestId('btn-ranking');
            
            expect(btnPlayAgain).toBeEnabled();
            expect(btnRanking).toBeEnabled();
        })
        it('Testa o botao playagain redireciona corretamente', () => {
            const {history} = renderWithRouterAndRedux(<Feedback />)
            const btnPlayAgain = screen.getByTestId('btn-play-again');
            
            expect(btnPlayAgain).toBeEnabled();
        userEvent.click(btnPlayAgain)
        const {pathname} = history.location;
        expect(pathname).toBe('/');

        })
        it('Testa o botao playagain redireciona corretamente', () => {
            const {history} = renderWithRouterAndRedux(<Feedback />)
            const btnRanking = screen.getByTestId('btn-ranking');
            
            expect(btnRanking).toBeEnabled();
        userEvent.click(btnRanking)
        const {pathname} = history.location;
        expect(pathname).toBe('/Ranking');

        })
    })

