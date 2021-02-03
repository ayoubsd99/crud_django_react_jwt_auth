import React,{useState,useEffect} from 'react'
//import ProductTable from './Products'
import LoginForm from './login'
import App2 from './App2'

import './App.css';
import axios from 'axios'
import qs from 'qs'

const App =()=> {
  //const [loading,setloding]=useState(false)
  //const [products,setproducts]=useState()
  const [islogin,setislogin]=useState(false)
  const [username,setusername]=useState("")
  
   const handle_login = (e, data) => {
     console.log(data)
      e.preventDefault();
      axios({
        'method': 'post',
        'url': 'http://127.0.0.1:8000/token-auth/',
        'data':qs.stringify(data),
        headers:{'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
        })
        .then(res => {
         
       localStorage.setItem('token', res.data.token);
          setislogin(true)
          setusername(res.data.user.username)
        }).catch(error=>{
          alert('username or password invalid')
          console.log(error);
        })
    }
  
  // console.log(products);
      if(islogin){
        return (
          <div>
            <button
            onClick={()=>setislogin(false)}
            >logout</button>
          <App2/>

          </div>
          )
      }else{
        return(
          <div>not login
          <LoginForm handle_login={handle_login}></LoginForm>
          </div>
        )
       
      }
     
    
   
      
  
    

   
    

 
}

export default App;
