import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LOGO } from "./layout/NavigationBar/NavigationBar";

describe("App", () => {
  it("should render", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(await screen.findByText(LOGO)).toBeTruthy();
  });
});
