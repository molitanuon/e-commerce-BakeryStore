import React, { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import {GET, POST} from './api.js';


// move the card rendering to the Display function to change the background image 
// based on if it was a dataURL or local image 


//render a single pastry card
function Card(props){
    return(
        <div className='card' style={{backgroundImage: `url(${props.image})`, height:'250px'}}> 
            <div id="name">{props.name}</div>
        </div>
    );
}

//renders all the pastries in the inventory
function Display(props){
    const [user, setProduct] = useState({addProduct: false});
    const [selectedImage,  setImageData] = useState(null);
    
    function addProduct(){
       setProduct({addProduct : user.addProduct ? false : true});
    }
   
    const writeToInventory=(event)=>{
        event.preventDefault();

        const product = {
            "name" : event.target.name.value,
            "price" : event.target.price.value,
        };

        const imageURL = {
            "link" : selectedImage
        };

        //post to images link to dataUrl 
        POST('images',imageURL,'2');

        //post to the inventory
        POST('pastries',product, '1');
       
        window.location='/login';
    }

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            // const oneLineDataUrl = reader.result.replace(/^(data:.*?;base64,)/i, '');
            setImageData(reader.result);
        };
        
        reader.readAsDataURL(file);
    }

    return(
        <>
            <h1> Welcome Bakery Owner!</h1>

            {/* SUBMIT PRODUCT */}
                {user.addProduct ? (
                    <div className='productForm'>
                        <button onClick={addProduct}> X </button>

                        <h1 style={{fontFamily: "fantasy", fontSize:"15px"}}> ADD PRODUCT TO INVENTORY</h1>

                        <form className="addForm" onSubmit={writeToInventory}>
                        <label htmlFor="name" className='addProd'> Name: </label> <input type="text" name='name' className='addProd' required/>  <br/>
                        <label htmlFor="price"  className='addProd'>  Price: </label> <input type="number" name='price' className='addProd' required/> <br/>
                        <label className='addProd'> Image:  </label>  <input type="file" accept="image/*" 
                        onChange={handleFileSelect} className='addProd' required/> <br/>
                        
                        <button className="submit2"> Submit </button>

                        </form>

                    </div>
                ) : ""}

            <div className="Display">
                    {
                        props.imageData && props.imageData.length>0 && props.imageData.map((item, index) =>
                            <Card 
                                name = {props.data[index].name}
                                image = {item.link}
                            />
                        )
                    }
            
            {/* Upload a product */}
            <button className='card' onClick={addProduct} style={{backgroundColor:'seashell'}} > <p style={{fontSize:'70px', color:'black'}}> + </p> </button>

            </div >
        </>
    );
}

function Login(){

    // MUST CHANGE BACK TO FALSE AFTER DONE TESTING
    const [user, setLog] = useState({isLoggedIn: true});

    const [state, setState] = useState({pastries:[]});
    const [customer, setState2] = useState({order:[]});
    const [sta, setImages] = useState({images:[]});

    async function fetchImages(apiEndpoint) {
        const { data: Items } = await GET(apiEndpoint,'2');
        if (Items) {
          setImages({images:Items});
        }
    }

    async function fetchData(apiEndpoint) {
        const { data: Items } = await GET(apiEndpoint, '1');
        if (Items) {
          setState({pastries:Items});
        }
    }

    async function fetchOrders(apiEndpoint) {
        const { data: Items } = await GET(apiEndpoint, '1');
        if (Items) {
          setState2({order:Items});
        }
    }

    useEffect(() => {
        fetchData('pastries');
        fetchOrders('orders');
        fetchImages('images');
    },[]);

    // data to pass to order checklist
    const myData = {
        orders : customer.order, 
        pastries : state.pastries
    }    

    // Check if user is validated
    const handleSubmit = e =>{
        e.preventDefault();
        if(e.target.username.value === process.env.REACT_APP_USERNAME && e.target.password.value === process.env.REACT_APP_PASSWORD){
            setLog({isLoggedIn: true});
        }
        else{
            alert("You are not authorize!");
            window.location = '/';
        }
    };

    // Log user out
    const logout = () =>{
        setLog({isLoggedIn: false});
    }

   if(user.isLoggedIn === true){
        return(
            <>
                <div className='navbar'>
                    <button onClick={logout}>Logout</button>
                    {/* to do : an order checklist, pass pastries list with state */}
                    {/* <button onClick={""}>Orders</button> */}
                    <Link to='/checklist' state={myData}> Orders </Link>
                </div>
                       
                <Display 
                    data = {state.pastries}
                    imageData = {sta.images}
                />
            </>
        )
    }
    else{
        // Log In form for owner
        return(
            <div className='loginForm'>
                Log In
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">  </label> <input type="text" name='username' placeholder="USERNAME" required/> <br/>
                    <label htmlFor="password">  </label> <input type="password" name='password' placeholder="PASSWORD" required/> <br/>
                    <button className='login'> Login </button>
                </form>
            </div>
        )
    }
}
export default Login;