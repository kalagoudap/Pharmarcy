import { useContext, useState } from "react";
import "./ProductDisplay.css"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Logincontext from "../Context/LoginContext";

export default function ProductDisplay(){
    const location = useLocation();
    const response = location.state; 
    const loginContext = useContext(Logincontext);
    const customer = loginContext.customer
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate()

    const AddtoCart = (name, price, quantity,productid) => {
        console.log(productid)
        const request_Body = {
            "productId": productid,
            "customerId": customer.id,
            "name" : name,
            "quantity": quantity,
            "price": price
        }

        axios.post("http://localhost:8080/savecart",request_Body)
        .then((response) => {
            alert("Data Added Succesfully")
        })
        .catch((error) => {
            alert("Error Occure")
        })
    }

    let OrderCartDisplay = (e) => {
        axios.get("http://localhost:8080/getbyCustmerId/"+customer.id)
        .then((response)=>{
             navigate("/order",{state: response.data} )
        })
        .catch((error) => {
            alert("Error Occured")
        })
    }

    return(
        <div>
           <title>Product Display</title>
           <div className="product-heading border bg-light">
                <span className="fw-bold ">🛍️ Product Display </span>
                <span className="fw-bold " style={{marginRight: "20px"}} onClick={() => {OrderCartDisplay()}}>🛒</span>
            </div>
            <div className="container-fluid">
            <div className="row">
                {
                   response.map((data) =>(
                    <div className="col-sm-3 border shadow p-3 mb-5 bg-white rounded" style={{marginLeft: "10px"}}>
                        <div className="border" style={{height: "200px", width: "250px"}}> TODO: Image</div>
                        <div className="container">
                            <div className="row" style={{paddingTop: "5px"}}>
                                <span className="col border">Name : </span>
                                <span className="col border">{data.productname}</span>
                            </div>
                            <div className="row" style={{paddingTop: "5px"}}>
                                <span className="col border" >Price : </span>
                                <span className="col border">{data.price}/- Rs</span>
                            </div>
                            <div className="row" style={{paddingTop: "5px"}}>
                                <span className="col border">Qantity : </span>
                                <input type = "number" className="form-control col border" onChange={(e)=>{setQuantity(e.target.value)}}></input>
                            </div>
                            <div className="row" style={{paddingTop: "5px", paddingBottom: "5px"}}>
                                <button className="btn btn-primary" onClick={()=>AddtoCart(data.productname, data.price,quantity,data.id)}> Add Cart</button>
                            </div>
                        </div>
                    </div>
                   ))
                }
            </div>
           </div>
        </div>
    );
}