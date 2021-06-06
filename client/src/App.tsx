import { useState } from 'react';
import socketIOClient from 'socket.io-client';
import UserContext from './hooks/userContext';
import IUserData from './classes/IUserData';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import ChatView from './pages/ChatView';
import LoginView from './pages/LoginView';
import Authroute from './components/Authroute';
import UnauthRoute from './components/Unauthroute';
import './App.scss';

const App: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>({
    room: "",
    name: ""
  });

  const connect = (props: IUserData) => {
      setUserData(props);
      setConnected(true);
  }

  return (
    <UserContext.Provider value={{ userData, connected, connect }}>
      <div className="App">
        <Router>
          <Switch>
            <UnauthRoute path={["/", "/login"]} exact>
              <LoginView />
            </UnauthRoute>
            <Authroute path="/chat" exact>
              <ChatView />
            </Authroute>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
