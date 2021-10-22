import '../style/Body.css';
import MainNav from './Nav';
import Room from './Rooms/Room';
import MainRoom from './MainRoom/MainRoom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
    <MainNav/>
  <Switch>
    <Route exact path="/" component={Room}/>
    <Route path="/notepad" component={MainRoom}/>
    {/* <Route component={Error} /> */}
  </Switch>

    </div>
  );
}

export default App;
