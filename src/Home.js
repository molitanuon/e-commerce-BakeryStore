import React from 'react';
import {Link} from "react-router-dom";
import './index.css';

// need to changing length
const orders = Array(5).fill(0);

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

    const myData = {
        orders : orders, 
        pastries : props.data
    }    
        return (
            <div>
                <span className='header'>Top Pastries </span> 

                <Link to='/checkout' state={myData}>
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
            </div>
          );
}

//render dashboard 
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            flagCart: orders.reduce((res, num) => res += num) === 0 ? false : true,
            isLoading: true, 
            pastries: [],
            error: null
        }
    }

    // Getting the pastries data from the API 
    // for reference : https://betterprogramming.pub/how-to-fetch-data-from-an-api-with-react-hooks-9e7202b8afcd
    getFetchPastries(){
        this.setState({
            loading: true
        }, () => {
            fetch("http://localhost:3000/pastries")
                .then(res => res.json())
                .then(result => this.setState({loading : false, pastries: result}))
                .catch(console.log);
        });
    }

    componentDidMount(){
        this.getFetchPastries();
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
            <Display 
                data = {this.state.pastries}
                onClick ={(id) => this.addHandleClick(id)}
                onClick2 ={(id) => this.subHandleClick(id)}
                flagCart = {this.state.flagCart}
            />
        )
    }
}

export default Home;