import '../style/Body.css';
import MainNav from './Nav';
// <<<<<<< HEAD
import Room from './Rooms/Room';
import Notepad from './Notepad'
import Login from './Login'
// =======
// import Room from './Rooms/Room';
import MainRoom from './MainRoom/MainRoom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// >>>>>>> 7cdf9694c1987a4cdc3a7ad4b420c331fbae867b

function App() {
  return (
    <div>
{/* <<<<<<< HEAD */}

      <MainNav/>
      {/* <Room/> */}
      {/* <Notepad/> */}
      <Login></Login>
{/* ======= */}
    <MainNav/>
  <Switch>
    <Route exact path="/" component={Room}/>
    <Route path="/notepad" component={MainRoom}/>
    {/* <Route component={Error} /> */}
  </Switch>
{/* >>>>>>> 7cdf9694c1987a4cdc3a7ad4b420c331fbae867b */}

    </div>
  );
}

export default App;
