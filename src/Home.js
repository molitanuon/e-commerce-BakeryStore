import React from 'react';
import {Link} from "react-router-dom";
import './index.css';

import data from "./inventory";
const pastries = data.pastries;
const orders = Array(pastries.length).fill(0);

<<<<<<< HEAD
=======

>>>>>>> master/main
//render a single pastry card
function Card(props){
    return(
        <div className='card' style={{backgroundImage:`url(/images/${props.image})`}}> <div id="name">{props.name}</div>
            {/* order bar  */}
                <div className='nav-bar'>
                    <span className='Add' onClick={props.onClick}> + </span> 
                    <span className='Amount' > {props.count} </span>
                    <span className='Remove'  onClick={props.onClick2}> - </span>
                </div>
        </div>
    );
}

//renders all the pastries in the inventory
function Display(props){
<<<<<<< HEAD
        return (
            <div>
                <span className='header'>Top Pastries </span> 

                <Link to='/checkout' state={orders}>
=======
    return (
        <div>
             <span className='header'>Top Pastries </span> 

                <Link to='/checkout' state={{data: orders}}>
>>>>>>> master/main
                    <img className= 'cart' src={ props.flagCart === false ? "images/cart.jpg" : "images/cartFull.png"}  alt=""/>
                </Link>
               
                <div className="Display">
                    {
                        props.data && props.data.length>0 && props.data.map((item)=>
                            <Card 
                                name = {item.name}
                                image = {item.image}
                                count = {orders[item.id]}
                                onClick ={() => props.onClick(item.id)}
                                onClick2 ={() => props.onClick2(item.id)}
                            />
                    )
                    }
                </div>
<<<<<<< HEAD
            </div>
          );
=======
        </div>
   );
>>>>>>> master/main
}

//render dashboard 
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            flagCart: orders.reduce((res, num) => res += num) === 0 ? false : true,
        }
    }

    addHandleClick(id){
        orders[id] += 1;
        this.setState({
            flagCart : orders.reduce((res, num) => res += num) === 0 ? false : true
        })
     }
 
     subHandleClick(id){
        if(orders[id] > 0) orders[id] -= 1;
        this.setState({
            flagCart : orders.reduce((res, num) => res += num) === 0 ? false : true
        })
    }

    render(){
        return(
<<<<<<< HEAD
            <Display 
                data = {pastries}
                onClick ={(id) => this.addHandleClick(id)}
                onClick2 ={(id) => this.subHandleClick(id)}
                flagCart = {this.state.flagCart}
            />
=======
            <div>
                <div className='display'>
                    <Display 
                        data = {pastries}
                        onClick ={(id) => this.addHandleClick(id)}
                        onClick2 ={(id) => this.subHandleClick(id)}
                        flagCart = {this.state.flagCart}
                    />
                </div>
            </div>
>>>>>>> master/main
        )
    }
}

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> master/main
