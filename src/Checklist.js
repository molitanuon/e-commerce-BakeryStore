import React, { useState } from 'react';
import './index.css';
import {GET} from './api.js';
import {useLocation} from "react-router-dom";

function Card(props){
    const [checked, setChecked] = useState(false);
    

    return(
        <div className='card'style={{backgroundColor:"peachpuff"}} >

            <div className='listTitle'> 
            
                <label className='complete'></label>
                <input type="checkbox" className='largerCheckbox'/>

                {props.lname}, {props.fname}

            </div>

              <div className='orderList'>
                {
                    props.purchase && props.purchase.length > 0 && props.purchase.map((amt, id)=>{
                        if(amt !== 0){
                            return(<p>{amt} order of {props.pasData[id]['name']}</p>);
                        }
                    })
                }
            </div>
        </div>
    );
}


const Checklist = () => {

    const location = useLocation();
    let orders = location.state.orders;
    let pasData = location.state.pastries;
    
    return(
        <>
            <h1>ORDERS TO COMPLETE</h1>
            <div style={{display: "grid", gridTemplateColumns: "auto auto"}}>
                {   
                    // data from inventory
                    orders && orders.length>0 && orders.map((item)=>
                        <Card   
                            fname = {item.firstName}
                            lname = {item.lastName}
                            pasData = {pasData}
                            purchase = {item.purchase}

                        />
                    )
                }
            </div>
        </>
    );
}

export default Checklist;