import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import ToDo from "./routes/ToDo";
import ToDo1 from "./routes/ToDo1";
import Clipboard1 from "./routes/Clipboard1";
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
          <Route path="/todo1">
            <ToDo1 />
          </Route>
          <Route path="/clipboard1">
            <Clipboard1 />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
