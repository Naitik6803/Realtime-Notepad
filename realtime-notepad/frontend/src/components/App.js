import "../style/Body.css";
import MainNav from "./Nav";
import Room from "./Rooms/Room";
import MainRoom from "./MainRoom/MainRoom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./Login-Signup/Register";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route path="/notepad/:userId" component={MainRoom} />
        <Route path="/home" component={Room} />
        {/* <Route component={Error} /> */}
      </Switch>
    </div>
  );
}

export default App;
