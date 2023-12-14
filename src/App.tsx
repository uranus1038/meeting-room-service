import { FC, useEffect , useState} from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import axios from 'axios';
//components
import { Index } from './pages';
import { Dashboad } from './pages/dashbord';
// keyname
import {keyName} from '../config-web.json'
//interface
import { user } from './interface/accout';
const App: FC = () => {
  const [user , setUser ] = useState<user>({ user:"" ,userName:""  , tel:0 , gender:"" ,department:"" , section:"" , role:"" , member:""});
  useEffect(() => {
    getUserData();
  },[]);
  function setUserState(newState:user):void
  {
        setUser(newState);
  }
  const getUserData: () => Promise<void> = async() => {
    if (localStorage.getItem(keyName) !== null) {
    const token = await localStorage.getItem(keyName);
    await axios.get("http://localhost:8000/api/user/get-user/",{ headers: {'Authorization': `Bearer ${token}`} }).then((response)=>
    {
      if(response.status == 200)
      {
        setUser(response.data.user);
      }
    })
  }
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/th/home" element={<Index dataUser={user} setDataUser={setUserState}/>} />
          <Route path="/th/dashboad" element={<Dashboad />} />
          <Route path="*" element={<Navigate to="/th/home" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;