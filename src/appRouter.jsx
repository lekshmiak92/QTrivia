import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import home from "./home";

import App from "./App";
import Instructions from "./components/instructions";

const AppRouter = () => {
  return (
    <Router basename="/QTrivia">
      <div>
        <Route path="/" exact component={home} />
        <Route path="/game/" component={App} />
        <Route path="/howToPlay/" component={Instructions} />
      </div>
    </Router>
  );
};

export default AppRouter;
