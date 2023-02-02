import React, { useState }from 'react';
import './index.css';

import data from "./inventory";
const pastries = data.pastries;

//render a single pastry card
function Card(props){
    return(
        <div className='card' style={{backgroundImage:`url(/images/${props.image})`, height:'250px'}}> <div id="name">{props.name}</div></div>
    );
}

//renders all the pastries in the inventory
function Display(props){
    const [user, setProduct] = useState({addProduct: false});

    function addProduct(){
       setProduct({addProduct : user.addProduct ? false : true});
    }

    return(
        <>
            <h1> Welcome Bakery Owner!</h1>

            {/* SUBMIT PRODUCT */}
                {user.addProduct ? (
                    <div className='productForm'>
                        <h1> ADD A PRODUCT FORM</h1>

                        <form onSubmit={""}>
                        <label htmlFor="name">  </label> <input type="text" name='name' required/> <br/>
                        <label htmlFor="price">  </label> <input type="number" name='password' required/> <br/>
                        <label htmlFor="image">  </label> <input type="file" name='image'   accept="image/png, image/jpeg" required/> <br/>
                        
                        <div style={{marginLeft: "40%"}}>
                            <button className="close"> Submit </button>
                            <button className="close" onClick={addProduct}> Close </button>
                        </div>

                        </form>

                    </div>
                ) : ""}

            <div className="Display">
            {
                props.data && props.data.length>0 && props.data.map((item)=>
                    <Card 
                        name = {item.name}
                        image = {item.image}
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
    const [user, setLog] = useState({isLoggedIn: false});

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

    const logout = () =>{
        setLog({isLoggedIn: false});
    }

   if(user.isLoggedIn === true){
            return(
                <>
                    <div className='navbar'>
                        <button onClick={logout}>Logout</button>
                    </div>
                       
                    <Display 
                        data = {pastries}
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