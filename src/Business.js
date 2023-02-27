import React, { useEffect, useState }from 'react';
import { Link, useLocation} from 'react-router-dom';
import './index.css';
import {GET, POST, DELETE} from './api.js';
var queue = [];

//render a single pastry card
function Card(props){
    const [pas, setState] = useState({isChecked:false});

    const handleClick=()=>{

        if(!pas.isChecked){
            queue.push(props.id);
        }else{
            var found = false;
            while(queue.length > 0 && found === false ){
                if(queue[0] === props.id) {queue.shift(); found = true;}
                else{
                    queue.push(queue[0]);
                    queue.shift();
                }
            }
        }
        
        setState({isChecked: !pas.isChecked});
    }

    return(
        <div className='card' style={{backgroundImage: `url(${props.image})`, height:'250px'}}> 
             <div>
                <input type="checkbox" onClick={handleClick} className='largerCheckbox'/> 
                <span id="name"> {props.name}</span>
            </div>
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

        const state = {data: true};
        const queryString = `?data=${JSON.stringify(state)}`;
        window.location = `/login${queryString}`;
    }

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
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
                                id = {item.id}
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

    const location = useLocation();
    const newState = location.search ? JSON.parse(decodeURIComponent(location.search.split("=")[1])) : null;
    // MUST CHANGE BACK TO FALSE AFTER DONE TESTING
    const [user, setLog] = useState({isLoggedIn: (location.state || (newState && newState.data)) ? true : false});

    const [state, setState] = useState({pastries:[]});
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

    useEffect(() => {
        fetchData('pastries');
        fetchImages('images');
    },[]);

    // data to pass to order checklist
    const myData = {
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


    const handleDelete=(event)=>{
        event.preventDefault();
        while(queue.length > 0){
            DELETE('pastries', queue[0], '1');
            DELETE('images', queue[0], '2');
            queue.shift();
        }
       
        const state = {data: true};
        const queryString = `?data=${JSON.stringify(state)}`;
        window.location = `/login${queryString}`;
    }

    // Log user out
    const logout = () =>{
        setLog({isLoggedIn: false});
    }

   if(user.isLoggedIn === true){
        return(
            <>
                <div>
                    <Link  className='navbar' to='/checklist' state={myData}> Orders </Link>
                    <Link  className='navbar2' onClick={logout}>Logout</Link> 
                    <Link className="navbar" onClick={handleDelete}> Delete </Link>
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
                    <label htmlFor="username" >  </label> <input className='loginName' type="text" name='username' placeholder="USERNAME" required/> <br/>
                    <label htmlFor="password" >  </label> <input className='loginPSW' type="password" name='password' placeholder="PASSWORD" required/> <br/>
                    <button className='login'> Login </button>
                </form>
            </div>
        )
    }
}
export default Login;