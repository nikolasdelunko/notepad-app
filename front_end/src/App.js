import logo from "./logo.svg";
import "./App.css";
import CardFace from "./components/main/card_face";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <CardFace />
      </div>
      <div className="footer">
        <p>Footer</p>
      </div>
    </div>
  );
}

export default App;
