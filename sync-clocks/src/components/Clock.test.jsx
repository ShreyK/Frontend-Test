import { render, screen } from "@testing-library/react";
import Clock from "./Clock";

test("renders analog clock", () => {
  render(<Clock clockType="analog" />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

test("renders digital clock", () => {
  render(<Clock clockType="digital" />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
