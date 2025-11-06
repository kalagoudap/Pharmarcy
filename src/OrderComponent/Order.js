import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logincontext from "../Context/LoginContext";
import axios from "axios";

export default function Order(){
    const loginContext = useContext(Logincontext) 
    const userAccount = loginContext.customer
    const location = useLocation();
    const products = location.state;
    const [totalprice, setTotalPrice] = useState(0);
    const [totalquantity, setTotalquantity] = useState(0);
    const [orderConfirmed, setOrderConfirmed] = useState(false)
    const [productIds, setProductIds] = useState([])

    const calculateItemDetails = () =>{
        let price = 0, qnt = 0;
        products.map((item)=>{
            price = price+item.total_price;
            qnt = qnt + item.quantity;
            setProductIds((prev)=> [...prev, item.id]);
        })
            setTotalPrice(price)
            setTotalquantity(qnt)
            console.log("Printing product Ids :" +productIds)
    }

    useEffect(()=>{
        calculateItemDetails()
    },[]);

    const OrderConfirmation = () =>{
        const order_JSON = {
           "customerId":  userAccount.id,
           "productsIds": productIds,
           "totalprice": totalprice,
           "quantity": totalquantity
        }
        axios.post("http://localhost:8080/orderCartItem", order_JSON)
        .then((response) => {
            setOrderConfirmed(true)
        })
        .catch((error) => {
            alert("Error Occured")
        })
    }

    return(<> 
        {!orderConfirmed &&
        <div className="container-fuild">
            <div className="row bg-light" style={{textAlign: "center", height: "80px", width: "100%"}}>
                <div style={{alignContent: "center",color: "#333333"}}>
                    <h3 style={{color: "#333333"}}>Product Order</h3>
                </div>
            </div>
            {
                products.map((data)=>{
                    return(<div className=" shadow p-3" style={{width: "100%", height: "350px"}}>
                        <div className="row" style={{height: "100%"}}>
                            <div className="col-sm-4 shadow p-3" style={{color: "red"}}>TODO: Image Display</div>
                            <div className=" col-sm-8" >
                                <div  className="border-bottom" style={{marginTop: "10px"}}>
                                    <h5>Product Details</h5>
                                </div>
                                <div className="container" style={{padding: "20px", fontSize:"20px"}}>
                                    <div className="row border-bottom" style={{padding: "20px"}}>
                                        <div className="col-sm-4">
                                            <span>Name: {data.name}</span>
                                        </div>
                                    </div>
                                    <div className="row border-bottom" style={{padding: "20px"}}>
                                        <div className="col-sm-4">
                                            <span>Quantity: {data.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="row border-bottom" style={{padding: "20px"}}>
                                        <div className="col-sm-4">
                                            <span>Price : {data.total_price}/- Rs</span>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })

            }
            <div className="container-fluid" style={{marginTop: "20px",marginBottom: "10px", fontSize:"18px"}}>
                <div className="row">
                    <div className="col-sm-6 border">
                        <h5 className="border-bottom">Address: </h5>
                        <div className="row"><span>Name : {userAccount.name}</span></div>
                        <div className="row"><span>Location : {userAccount.address}</span></div>
                        <div className="row"><span>E-Mail : {userAccount.email}</span></div>
                        <div className="row"><span>Phone Number : {userAccount.phonenumber}</span></div>
                    </div>
                    <div className="col-sm-6 border">
                        <h5 className="border-bottom">Cart Details : </h5>
                        <div className="row">
                            <span>Total Product Quantity: {totalquantity}</span>
                        </div>
                        <div className="row"><span>Total Product Price: {totalprice}</span></div>
                        <div className="row">
                            <button className="btn btn-success border" style={{width: "400px", marginTop: "10px"}} onClick={OrderConfirmation}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}
       { orderConfirmed && 
        <div className="container d-flex justify-content-center" style={{marginTop: "100px"}}>
            <div className="row border p-3 bg-light rounded align-items-center shadow p-3"style={{width: "400px", height: "300px"}}>
                <h5 style={{color: "green"}}>🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉 ✅Order Confirmed....!🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉 🎉🎉🎉</h5>
            </div>
        </div>
}
        </>
        
    );
}