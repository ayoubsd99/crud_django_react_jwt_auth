import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import React,{useState} from 'react'
import qs from 'qs'

const  ProductTable=({products})=> {
  const [product,setproduct]=useState({
    id:null,
    title:'',
    price:0,
    discount_price:0,
    small_desc:'',
    big_desc:''
  
  })
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setproduct({
      id:null,
      title:'',
      price:0,
      discount_price:0,
      small_desc:'',
      big_desc:''
      })
  };
  const handleShow = () =>setShow(true)

  const showdetails=(e)=>{
    handleShow()
    let prod=products.filter((prod)=>prod.id==e.target.id)
    prod.map((p)=>{
      setproduct(p)
      console.log(product)
    })
  }

 const handlechange=(e)=>{
        let name=e.target.name
        let value =e.target.value
        setproduct({...product,[name]:value})
        
  }

  const handeldelete=(e)=>{
    console.log(e.target.id);
    axios.delete('http://127.0.0.1:8000/api/productview/'+e.target.id+'/')
    .then((res)=>{
      window.location.reload();
   
    })
  }
  const handelupdatete=()=>{
   
     if(product.id!=null){

      //console.log(product)
      //console.log(qs.stringify(product))
      axios({
        'method': 'post',
        'url': 'http://127.0.0.1:8000/api/productview/'+product.id+'/',
        'data':qs.stringify(product),
        headers:{'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
        })
        .then(function (response) {
            //handle success
            //console.log(response);
            alert('data updated succfuly')
            setproduct({
              id:null,
              title:'',
              price:0,
              discount_price:0,
              small_desc:'',
              big_desc:''
              })
        })
        .catch(function (response) {
            //handle error
           // console.log(response);

        });
     }else{
       axios({
         'method':'post',
         'url':'http://127.0.0.1:8000/api/productslist',
         'data':qs.stringify(product),
         'headers':{'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
       }).then(function (response) {
        //handle success
        //console.log(response);
        alert('data added succfuly')
        
        setproduct({
          id:null,
          title:'',
          price:0,
          discount_price:0,
          small_desc:'',
          big_desc:''
          })
    })
    .catch(function (response) {
        //handle error
       // console.log(response);

    });

     }
     handleClose()
     window.location.reload();
 }


    return (
        <div className='container'>
          <div>
            <button 
            onClick={handleShow}
            >new product</button>
          </div>
        <table className="table">
        <thead>
          <tr>
            <th scope="col">title</th>
            <th scope="col">price</th>
            <th scope="col">discount price</th>
            <th scope="col">small desc</th>
            <th scope="col">big desc</th>
            <th scope="col">delete</th>
            <th scope="col">update</th>

          </tr>
        </thead>
        <tbody>
          {products.map((prod,index)=>{
         return  <tr key={index}>
         <td >{prod.title}</td>
         <td >{prod.price}</td>
         <td >{prod.discount_price}</td>
         <td >{prod.small_desc}</td>
         <td>{prod.big_desc}</td>
         <td><button id={prod.id}
         onClick={(e)=>{handeldelete(e)}}
         >delete</button></td>
         <td>
           <button
            id={prod.id}
            onClick={(e)=>showdetails(e)}
            >update</button></td>
           </tr>
          })}
         
        </tbody>
      </table>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Hi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type="text"
        onChange={(e)=>handlechange(e)}
        value={product.title} name='title' class="form-control mb-2 mr-sm-2"  placeholder="title"/>
        <input type="number"
        onChange={(e)=>handlechange(e)}
        value={product.price}  name='price' class="form-control mb-2 mr-sm-2"  placeholder="Jane Doe"/>
        <input type="number"
        onChange={(e)=>handlechange(e)}
        value={product.discount_price}  name='discount_price' class="form-control mb-2 mr-sm-2"  placeholder="Jane Doe"/>
        <input type="text"
        onChange={(e)=>handlechange(e)}
        value={product.small_desc}  name='small_desc' class="form-control mb-2 mr-sm-2" placeholder="small description"/>
        <textarea 
        onChange={(e)=>handlechange(e)}
        class="form-control mb-2 mr-sm-2"
        value={product.big_desc}
        name='big_desc'
        placeholder="big description"></textarea>

        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-danger btn-sm' onClick={handleClose}>Cancel</button>
          <button
          className='btn btn-info btn-sm'
          onClick={()=>{handelupdatete()}}
          >Save</button>
        </Modal.Footer>
      </Modal>
    
      </div>
    )
  }

  export default ProductTable