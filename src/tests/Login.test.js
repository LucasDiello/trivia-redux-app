import React from "react";
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from '../App'
import userEvent from "@testing-library/user-event";
import { toBeEnabled } from "@testing-library/jest-dom/dist/matchers";

describe('Testando a pagina de Login ', () => {
    test('Testa se os componentes da pagina estão sendo renderizados <Login />', () => {
     renderWithRouterAndRedux(<App />);
     const nameInput = screen.getByTestId('input-player-name');
     const emailInput = screen.getByTestId('input-gravatar-email');
     const btnPlay = screen.getByTestId('btn-play');
     const btnSettings = screen.getByTestId('btn-settings');

     expect(nameInput).toBeInTheDocument();
     expect(emailInput).toBeInTheDocument();
     expect(btnPlay).toBeInTheDocument();
     expect(btnSettings).toBeInTheDocument();
     

    })
    test('Testa se ao clicar no botão Settings a página é direcionada', () => {
        const {history} = renderWithRouterAndRedux(<App />);
        const btnPlay = screen.getByTestId('btn-play');
        const btnSettings = screen.getByTestId('btn-settings');
        
        expect(btnPlay).toBeDisabled();

act(()=>{
    userEvent.click(btnSettings);
})
const { pathname } = history.location;
    expect(pathname).toBe('/settings');
    })
    test('Testa se a funcionalidades da pagina de Login estao funcionando corretamente', () => {
        const {history} = renderWithRouterAndRedux(<App />);
        const nameInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        const btnPlay = screen.getByTestId('btn-play');

        expect(btnPlay).toBeDisabled();
        act(()=>{
            userEvent.type(nameInput, 'xablau');
            userEvent.type(emailInput, 'teste@teste.com');
        })
        expect(btnPlay).toBeEnabled();
        userEvent.click(btnPlay)
        const {pathname} = history.location;
        expect(pathname).toBe('/game');
    })
})