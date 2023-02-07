import React, { useEffect, useState }from 'react';
import './index.css';

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

    const writeToInventory=(event)=>{

    }

    return(
        <>
            <h1> Welcome Bakery Owner!</h1>

            {/* SUBMIT PRODUCT */}
                {user.addProduct ? (
                    <div className='productForm'>
                        <button onClick={addProduct}> X </button>

                        <h1 style={{fontFamily: "fantasy", marginLeft:"-200px", fontSize:"15px"}}> ADD PRODUCT TO INVENTORY</h1>

                        <form className="addForm" onSubmit={writeToInventory}>
                        <label htmlFor="name"> Name: </label> <input type="text" name='name' required/>  <br/>
                        <label htmlFor="price">  Price: </label> <input type="number" name='price' required/> <br/>
                        <label htmlFor="image"> Image:  </label>  <input type="file" name='image'   accept="image/png, image/jpeg" required/> <br/>
                        
                        <button className="submit2"> Submit </button>

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
    const [user, setLog] = useState({isLoggedIn: true});

    const [hasError, setErrors] = useState(false);
    const [state, setState] = useState({});

    //fetch data from API using React Hooks
    async function fetchData(){
        const res = await fetch("http://localhost:3000/pastries");
        res
            .json()
            .then(res => setState(res))
            .catch(err => setErrors(err));
    }
    
    useEffect(() => {
        fetchData();
    },[]);

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
                        data = {state}
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