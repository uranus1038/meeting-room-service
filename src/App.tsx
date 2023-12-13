import { FC, useEffect , useState} from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import axios from 'axios';
//components
import { Index } from './pages';
import { Addmin } from './pages/addmin';
// keyname
import {keyName} from '../config-web.json'
//interface
import { user } from './interface/accout';
const App: FC = () => {
  const [user , setUser ] = useState<user>({ user:"" ,userName:""  , tel:0 , gender:"" ,department:"" , section:"" , role:"" , member:""});
  useEffect(() => {
    //getUserData();
  });
  const getUserData: () => Promise<void> = async() => {
    if (localStorage.getItem(keyName) !== null) {
      console.log("pass")
    const token = await localStorage.getItem(keyName);
    await axios.get("http://localhost:8000/api/user/get-user/",{ headers: {'Authorization': `Bearer ${token}`} }).then((response)=>
    {
      if(response.status == 200)
      {
        console.log(response.data.user);
      }
    })
  }
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/th/home" element={<Index />} />
          <Route path="/th/admin" element={<Addmin />} />
          <Route path="*" element={<Navigate to="/th/home" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;