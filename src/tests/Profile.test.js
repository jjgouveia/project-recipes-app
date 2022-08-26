import React from "react";
import { screen } from "@testing-library/react";
import renderWithRouter from "./helpers/renderWithRouter";
import Profile from "../pages/Profile";
import userEvent from '@testing-library/user-event'

describe("Testa a página de Perfil", () => {

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        clear: jest.fn()
      },
      writable: true
    });
  });

  it("Verifica se a página é carregada corretamente", () => {
    renderWithRouter(<Profile />);

    const PROFILE = screen.getByRole("heading", {
      name: /profile/i,
    });
    expect(PROFILE).toBeInTheDocument();
  });

  it("Verifica o logout", () => {
    renderWithRouter(<Profile />, '/profile');

    const PROFILE = screen.getByRole("heading", {
      name: /profile/i,
    });
    expect(PROFILE).toBeInTheDocument();

    const LOGOUT_BTN = screen.getByRole('button', {
      name: /logout/i
    });

    userEvent.click(LOGOUT_BTN);
    expect(window.localStorage.clear).toHaveBeenCalled();

  });
  });

