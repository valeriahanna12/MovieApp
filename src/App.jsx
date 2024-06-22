import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from './Components/Layout/Layout';
import Home from "./Components/Home/Home";
import Movies from "./Components/Movies/Movies";
import Tv from "./Components/Tv/Tv";
import People from "./Components/People/People";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import jwtDecode from 'jwt-decode';
import {useEffect, useState} from 'react';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import { Offline } from 'react-detect-offline';
import ErrorPage from './Components/ErrorPage/ErrorPage';
 
function App() {

  useEffect(()=>{
    if (localStorage.getItem('userToken') !== null) {
      saveUserData();
    }
  },[])

  const [userData, setuserData] = useState(null);

  function saveUserData(){
   let encodedToken = localStorage.getItem('userToken');
   let decodedToken = jwtDecode(encodedToken);
  //  console.log(decodedToken);
   setuserData(decodedToken);
  }
  
  let routers = createHashRouter([
    {path:'/' , element:<Layout setuserData={setuserData} userData={userData}/> ,children:[
      
      {index:true , element:<ProtectedRoute ><Home/></ProtectedRoute> },
      {path:'movies' , element:<ProtectedRoute ><Movies/></ProtectedRoute>},
      {path:'tv' , element:<ProtectedRoute ><Tv/></ProtectedRoute>},
      {path:'people' , element:<ProtectedRoute ><People/></ProtectedRoute>},
      {path:'profile' , element:<ProtectedRoute ><Profile userData={userData}/></ProtectedRoute>},
      {path:'itemDetails/:id/:media_type' , element:<ProtectedRoute ><ItemDetails /></ProtectedRoute>},
      {path:'login' , element:<Login saveUserData = {saveUserData}/>},
      {path:'register' , element:<Register/>},
      {path:'*' , element:<ErrorPage/>}
    ]}
  ])
  return<>
    <RouterProvider router={routers}/>
    <div>
    <Offline> <div className="offline">Oops you are Offline..!</div></Offline>
    {/* <Online> <div className="offline">Welcome back , you are Online Now . </div></Online> */}
    </div>
  </>   
}

export default App;
