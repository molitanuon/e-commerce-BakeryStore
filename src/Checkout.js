import React from 'react';
import {Link, useLocation} from "react-router-dom";

import './index.css';

const Checkout = (props) => {

    //get orders from props 
    const location = useLocation();
    let datas = location.state.orders;
    let pasData = location.state.pastries;
    let total = 0;

    const orderSubmit=(event)=>{
        event.preventDefault();
        if(total > 0)
        {
            const customer = JSON.stringify({
                "firstName" : event.target.firstname.value,
                "lastName" : event.target.lastname.value,
                "telephone" : event.target.tele.value,
                "email" : event.target.email.value
            });

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
                        datas && datas.length > 0 && datas.map((amt,id)=>{
                            if(amt !== 0){
                                total += amt * pasData[id]['price'];
                                return(
                                    <tr> 
                                        <td>{pasData[id]['name']}</td>
                                        <td style={{textAlign: "center"}}>{amt}</td>
                                        <td style={{textAlign: "center"}}>${amt * pasData[id]['price']}</td>
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
                        <label htmlFor="firstname"> First Name:  <input type="text" name="firstname" required/> </label>

                        <label htmlFor="lastname"> Last Name: <input type="text" name="lastname" required/></label><br/>

                        <label htmlFor="tele"> Telephone: <input type="tel" name="tele" pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'  placeholder="123-456-2121" required/> </label>

                        <label htmlFor="email"> Email: <input type="email" name="email" placeholder='myemail@gmail.com' required/> </label>

                        <button className='submit'> Submit </button>

                    </form>
    
                </div>
            </section>
        </>
    );
};

export default Checkout;
