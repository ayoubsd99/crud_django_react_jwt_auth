import React,{useState,useEffect} from 'react'
import ProductTable from './Products'
import LoginForm from './login'
import './App.css';
import axios from 'axios'


const App2 =()=> {
  const [loading,setloding]=useState(false)
  const [products,setproducts]=useState()
  const [islogin,setislogin]=useState(false)
  const [username,setusername]=useState("")
  
  useEffect(()=>{
      let token =localStorage.getItem('token')
      axios({
        'method':'GET',
        'url':'http://127.0.0.1:8000/api/productslist',
         headers : {
          'Authorization' : `JWT ${token}`
        }
        })
      .then(response => {
        setproducts(response.data)
        setloding(true)
      }).catch((response) => { 
        console.log(response); 
    })
   
    },[])
  
  
  
    //console.log(products);
   
      return ( 
       
        <div className="App">
        {loading?<ProductTable products={products} />: <p> LOADING....</p>}
        </div>
       
    
        )
    
   
      
  
    

   
    

 
}

export default App2;
