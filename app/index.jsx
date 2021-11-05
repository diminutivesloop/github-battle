import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import Popular from "./components/Popular";
import Battle from "./components/Battle";
import { ThemeProvider } from "./contexts/theme";
import Nav from "./components/nav";
import Results from "./components/Results";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      toggleTheme: () =>
        this.setState((prevState) => ({
          theme: prevState.theme === "light" ? "dark" : "light",
        })),
    };
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />

              <Routes>
                <Route path="/" element={<Popular />} />
                <Route path="/battle" element={<Battle />} />
                <Route path="/battle/results" element={<Results />} />
              </Routes>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
