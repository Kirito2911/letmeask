import {Home} from "./pages/Home";
import {Room} from './pages/Room';
import { NewRoom } from "./pages/NewRoom";
import {BrowserRouter ,Route, Switch} from "react-router-dom";
import {AuthContextProvider} from './contexts/AuthContext'
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/admin/rooms/:id" component={AdminRoom}/>
          <Route path="/rooms/new" component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
