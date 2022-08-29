import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouter from "./helpers/renderWithRouter";
import Profile from "../pages/Profile";

describe("Testa a página Profile", () => {
  beforeEach(() => {
    localStorage.setItem("user",  "{\"email\":\"adalovelace@teste.com\"}");
  });
  it("Verifica se o email salvo no localStorage é renderizado", () => {
    renderWithRouter(<Profile />);
    expect(screen.getByTestId("profile-email").textContent).toBe(
      "adalovelace@teste.com"
    );
  });
  it("Verifica se a chave é recriada no storage", () => {
    localStorage.removeItem('user');
    renderWithRouter(<Profile />);
    expect(screen.getByTestId("profile-email").textContent).toBe(
      ""
    );
  });
  it('Verifica se ao clicar em "Logout" apaga o localStorage e redireciona para login("/")', () => {
    const { history } = renderWithRouter(<Profile />, "/profile");

    localStorage.removeItem("user");


    const button = screen.getByRole("button", { name: "Logout" });
    userEvent.click(button);

    expect(localStorage).toHaveLength(0);
    expect(history.location.pathname).toBe("/");
  });
});
