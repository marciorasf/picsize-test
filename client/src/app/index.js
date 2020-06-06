import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

import { CssBaseline } from "@material-ui/core";

import "typeface-roboto";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <CssBaseline />
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
