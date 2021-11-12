import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import { ThemeProvider } from "./contexts/theme";
import Nav from "./components/nav";
import Loading from "./components/loading";

const Popular = React.lazy(() => import("./components/popular"));
const Battle = React.lazy(() => import("./components/battle"));
const Results = React.lazy(() => import("./components/results"));

class App extends React.Component {
  state = {
    theme: "light",
    toggleTheme: () =>
      this.setState((prevState) => ({
        theme: prevState.theme === "light" ? "dark" : "light",
      })),
  };

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />

              <React.Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Popular />} />
                  <Route path="/battle" element={<Battle />} />
                  <Route path="/battle/results" element={<Results />} />
                  <Route path="*" element={<h1>404</h1>} />
                </Routes>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
