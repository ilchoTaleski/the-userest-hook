import logo from "./logo.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import classnames from "classnames";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <hr></hr>
        <a
          href="https://exelerateit.com"
          target="_blank"
          className={classnames("h2")}
          rel="noreferrer"
        >
          Exelerate
        </a>
        <hr></hr>
        <Link className="btn btn-primary" role="button" to="/songs">
          Start testing
        </Link>
      </header>
    </div>
  );
}

export default App;
