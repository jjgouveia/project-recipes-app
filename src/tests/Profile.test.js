import React from "react";
import { screen } from "@testing-library/react";
import renderWithRouter from "./helpers/renderWithRouter";
import Profile from "../pages/Profile";

describe("Testa a página de Perfil", () => {
  it("Verifica se a página é carregada corretamente", () => {
    renderWithRouter(<Profile />);

    const PROFILE = screen.getByRole("heading", {
      name: /profile/i,
    });
    expect(PROFILE).toBeInTheDocument();
  });
});
