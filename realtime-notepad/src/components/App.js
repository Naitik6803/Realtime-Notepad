import '../style/Body.css';
import MainNav from './Nav';
// import Room from './Rooms/Room';
import Notepad from './Notepad'
import Login from './Login'

function App() {
  return (
    <div>

      <MainNav/>
      {/* <Room/> */}
      {/* <Notepad/> */}
      <Login></Login>

    </div>
  );
}

export default App;
