import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import ToDo from "./routes/ToDo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/todo">
            <ToDo />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
