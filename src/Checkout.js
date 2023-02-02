import React from 'react';
import {Link, useLocation} from "react-router-dom";

import './index.css';
import data from "./inventory";

const pastries = data.pastries;

const Checkout = (props) => {

    //get orders from props 
    const location = useLocation();
    let datas = location.state;
    let total = 0;

    
    const orderSubmit=(event)=>{
        if(total > 0)
        {
            alert("Thank you for ordering!");
        }
        else{
            alert("Your cart is empty. Please return to the home page to add to cart. Thank you!");
        }
        event.preventDefault();
        // navigate('/');
        window.location='/';
    };

    return (
        <>
            <div className="nav-bar-ch">
                <Link to='/'>Home</Link>
            </div>

            {/* Receipt Format */}
            <section className='purchases'>
                <h1>Your Orders</h1>
                <table>
                    <tr>
                        <th> Pastry <hr></hr></th>
                        <th> Amount <hr></hr></th>
                        <th> Price <hr></hr></th>
                    </tr>

                    {   
                        datas && datas.length > 0 && datas.map((amt,id)=>{
                            if(amt !== 0){
                                total += amt * pastries[id]['price'];
                                return(
                                    <tr> 
                                        <td>{pastries[id]['name']}</td>
                                        <td style={{textAlign: "center"}}>{amt}</td>
                                        <td style={{textAlign: "center"}}>${amt * pastries[id]['price']}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                </table>

                <h2>Total: ${total.toFixed(2)}</h2>

                {/* Customer Information Form */}
                <div> 
                    <h1> Contact Information </h1>
                    <form onSubmit={orderSubmit}>
                        <label> First Name:  <input type="text" required/> </label>

                        <label> Last Name: <input type="text" required/></label><br/>

                        <label> Telephone: <input type="tel" pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'  placeholder="123-456-2121" required/> </label>

                        <label > Email: <input type="email" placeholder='myemail@gmail.com' required/> </label>

                        <button className='submit'> Submit </button>

                    </form>
    
                </div>
            </section>
        </>
    );
};

export default Checkout;
