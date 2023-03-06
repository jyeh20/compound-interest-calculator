import "./App.css";
import Loader from "./Loader";
import { Header } from "./components";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="App-bg" />
      <Router>
        <Header />
        <div className="App-content">
          <Loader />
        </div>
      </Router>
    </div>
  );
}

export default App;
