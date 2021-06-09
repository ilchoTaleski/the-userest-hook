import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./Navbar";
import Home from "./Home";
import Container from "react-bootstrap/Container";
import classNames from "classnames";
import Songs from "Songs";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Container className={classNames("m-auto", "p-5")}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/home" />;
              }}
            />
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/songs">
              <Songs />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
