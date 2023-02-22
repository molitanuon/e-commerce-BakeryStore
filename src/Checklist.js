import React, { useState, useEffect } from 'react';
import {Link, useLocation} from "react-router-dom";
import './index.css';
import {GET, DELETE} from './api.js';

var queue = [];

function Card(props){
    
    const [order, setState] = useState({isChecked:false});

    const handleClick=()=>{

        if(!order.isChecked){
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
        
        setState({isChecked: !order.isChecked});
    }

    return(
        <div className='card'style={{backgroundColor:"peachpuff"}} >
            <div className='listTitle'> 
                <label className='complete'></label>
                <input type="checkbox" onClick={handleClick} className='largerCheckbox'/> 
                {props.lname}, {props.fname} <br/>

                <div className='contactInfo'> 
                    Contact Information <br/>
                    <hr/> <br/>
                    Email : {props.email} <br/>
                    Tel : {props.tele}
                </div>
            </div>

              <div className='orderList'>
                {
                    props.purchase && props.purchase.length > 0 && props.purchase.map((amt, index)=>{
                        if(amt !== 0){
                            return(<p>{amt} {amt > 1 ? "orders" : "order"} of {props.pasData[index-1]['name']}</p>);
                        }
                        else return("");
                    })
                }
            </div>
        </div>
    );
}


const Checklist = () => {

    const location = useLocation();
    let pasData = location.state.pastries;
    const [customer, setState2] = useState({order:[]});

    const handleSubmit=(event)=>{
        event.preventDefault();
        while(queue.length > 0){
            DELETE('orders', queue[0], '1');
            queue.shift();
        }
        fetchOrders('orders');
        window.location='/checklist';
    }

    async function fetchOrders(apiEndpoint) {
        const { data: Items } = await GET(apiEndpoint, '1');
        if (Items) {
          setState2({order:Items});
        }
    }

    useEffect(() => {
        fetchOrders('orders');
    },[]);
    
    return(
        <>
            <Link className='navbar' to='/login' state={true}>Home</Link>
            <Link className="navbar2" onClick={handleSubmit}> Submit </Link>
            <h1>ORDERS TO COMPLETE</h1>
            <div>
                {   
                    // data from inventory
                    customer.order && customer.order.length>0 && customer.order.map((item)=>
                    {
        
                        return(
                            <Card   
                                fname = {item.firstName}
                                lname = {item.lastName}
                                email = {item.email}
                                tele = {item.telephone}
                                pasData = {pasData}
                                purchase = {item.purchase}
                                id = {item.id}
                            />    
                        )    
                    })
                }
            </div>
        </>
    );
}

export default Checklist;