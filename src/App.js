import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Play from "./Pages/Play/Play";
import Score from "./Pages/Score/Score";
import Timer from "./components/Timer/Timer";

function App() {
  return (
    <React.Fragment>
      <Timer remainingSeconds={0} />
      {/* <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/play" component={Play} />
        <Route path="/score" component={Score} />
      </Switch> */}
    </React.Fragment>
  );
}

export default App;
