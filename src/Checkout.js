import React from 'react';
import {Link, useLocation} from "react-router-dom";

import './index.css';
import {POST} from './api.js';

const Checkout = () => {

    //get orders from ocation 
    const location = useLocation();
    let datas = location.state.orders;
    let total = 0;

    const orderSubmit=(event)=>{
        event.preventDefault();
        if(total > 0)
        {
            const customer = {
                "firstName" : event.target.firstname.value,
                "lastName" : event.target.lastname.value,
                "telephone" : event.target.tele.value,
                "email" : event.target.email.value,
                "purchase" : datas,
            };

            // posting the customer data to inventory using axios
            POST('orders', customer, '1');

            alert("Thank you ordering!")
        }
        else{
            alert("Your cart is empty. Please return to the home page to add to cart. Thank you!");
        }
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
                        datas && datas.length > 0 && datas.map((item)=>{
                           
                                total += item.count * item.price;
                                return(
                                    <tr> 
                                        <td>{item.name}</td>
                                        <td style={{textAlign: "center"}}>{item.count}</td>
                                        <td style={{textAlign: "center"}}>${item.count * item.price}</td>
                                    </tr>
                                )
                        })
                    }
                </table>

                <h2>Total: ${total.toFixed(2)}</h2>

                {/* Customer Information Form */}
                <div> 
                    <h1> Contact Information </h1>
                    <form onSubmit={orderSubmit} style={{paddingLeft:"10%"}}>
                        <label htmlFor="firstname" classname="contact"> First Name:  <input type="text" name="firstname"  className="contact" required/> </label>

                        <label htmlFor="lastname" classname="contact"> Last Name: <input type="text" name="lastname" className="contact" required/></label><br/>

                        <label htmlFor="tele" classname="contact"> Telephone: <input type="tel" name="tele" className="contact" pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'  placeholder="123-456-2121" required/> </label>

                        <label htmlFor="email" classname="contact"> Email: <input type="email" name="email" className="contact" placeholder='myemail@gmail.com' required/> </label>

                        <button className='submit'> Submit </button>

                    </form>
    
                </div>
            </section>
        </>
    );
};

export default Checkout;
