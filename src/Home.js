import React from 'react';
import {Link} from "react-router-dom";
import './index.css';
import {GET} from './api.js';

// need to changing length
let orders = [];

//render a single pastry card
function Card(props){
    return(
      <div className='card' style={{backgroundImage:`url(${props.image})`}}> <div id="name">{props.name}</div>
            {/* order bar  */}
                <div className='Add' style={{width:'40px'}}>${props.price}</div>
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
        orders : orders
    } 

    return (
        <div>
            <span className='header'>Top Pastries </span> 

            <Link to='/checkout' state={myData}>
                 <img className= 'cart' src={ props.flagCart === false ? "images/cart.jpg" : "images/cartFull.png"}  alt=""/>
            </Link>

            <div className="Display">
                {
                    props.images && props.images.length>0 && props.images.map((item, index) =>
                        <Card 
                                name = {props.data[index].name}
                                image = {item.link}
                                price = {props.data[index].price}
                                count = {orders.find(item => item.name === props.data[index].name) == null ? 0 : orders.find(item => item.name === props.data[index].name).count}
                                onClick ={() => props.onClick(props.data[index].name,props.data[index].price )}
                                onClick2 ={() => props.onClick2(props.data[index].name)}
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
            flagCart: orders.length === 0 ? false : true,
            pastries: [],
            images: []
        }
    }

    async getImages(apiEndpoint) {
        const { data: Items } = await GET(apiEndpoint, '2');
        if (Items) {
          this.setState({images:Items});
        }
    }

    // Getting the pastries data from the API using axios
    async getData(apiEndpoint) {
        const { data: Items } = await GET(apiEndpoint, '1');
        if (Items) {
          this.setState({pastries:Items});
        }
    }

    componentDidMount(){
        this.getData('pastries');
        this.getImages('images');
    }

    addHandleClick(name, price){

        let item = orders.find(item => item.name === name);
        if(item==null){
            let order = {
                "name":name,
                "price":price,
                "count": 1
            }

            orders.push(order);
        }
        else{
            item.count+=1;
        }

        this.setState({
            flagCart : orders.length === 0  ? false : true
        })
    }
 
    subHandleClick(name){
       
        let item = orders.find(item => item.name === name);
        if(item){
            if(item.count >= 2) item.count -= 1;
            else if(item.count === 1) orders = orders.filter(x => x.name !== name);
        }

        this.setState({
            flagCart : orders.length === 0 ? false : true
        })
    }

    render(){
        return(
            <Display 
                data = {this.state.pastries}
                images = {this.state.images}
                onClick ={(name,price) => this.addHandleClick(name,price)}
                onClick2 ={(name) => this.subHandleClick(name)}
                flagCart = {this.state.flagCart}
            />
        )
    }
}

export default Home;