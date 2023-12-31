import { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import axios from 'axios';
//components
import { Index } from './pages';
import { Dashboard } from './pages/dashboard';
// keyname
import { keyName } from '../config-web.json'
//interface
import { user } from './interface/accout';
//css
import './index.css';
const App: FC = () => {
  const [linkState,setLinkState] = useState<number>(0);
  const [user, setUser] = useState<user>({ img:"",user: "", userName: "", tel: 0, gender: "", department: "", section: "", role: "", member: "" });
  useEffect(() => {
    getUserData();
  }, []);
  function setUserState(newState: user): void {
    setUser(newState);
  }
  function setLink(newState:number):void{
    setLinkState(newState);
  }
  const getUserData: () => Promise<void> = async () => {
    if (localStorage.getItem(keyName) !== null) {
      const token = localStorage.getItem(keyName);
      await axios.get("http://localhost:8000/api/user/get-user/", { headers: { 'Authorization': `Bearer ${token}` } }).then((response) => {
        if (response.status == 200) {
          setUser(response.data.user);
        }
      }).catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem(keyName);
        }
      })
    }
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/th/home" element={<Index dataUser={user} setDataUser={setUserState} />} />
          {
            (user.userName.length > 0) ? (<Route path="/th/dashboard" element={<Dashboard newLink={setLink} linkState={linkState} dataUser={user} setDataUser={setUserState} />} />) : null

          }
          <Route path="*" element={<Navigate to="/th/home" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;