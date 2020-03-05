import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Play from "./Pages/Play/Play";
import Score from "./Pages/Score/Score";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/play" component={Play} />
        <Route path="/score" component={Score} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
