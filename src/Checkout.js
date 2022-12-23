import React from 'react';
import {Link, useLocation} from "react-router-dom";

import './index.css';
import data from "./inventory";
const pastries = data.pastries;

const Checkout = (props) => {

    //get orders from props 
    const location = useLocation();
    const datas = location.state.data;
    let total = 0;

    const orderSubmit=()=>{
        if(total > 0)
        {
            alert("Thank you for ordering!");
            window.location = '/';
        }
        else{
            alert("Your cart is empty. Please return to the home page to add to cart. Thank you!");
        }
    };

    return (
        <>
            <div className="nav-bar-ch">
                <Link to='/'>Home</Link>
            </div>

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
                <button className='submit' onClick={orderSubmit}> Submit </button>
            </section>
        </>
    );
};

export default Checkout;
