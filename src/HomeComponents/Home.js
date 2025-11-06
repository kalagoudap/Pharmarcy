import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../Context/LoginContext";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';

export default function Home(){
    const loginContext = useContext(LoginContext)
    const setislogedin = loginContext.setislogedin;
    const islogedin = loginContext.islogedin;
    const customer = loginContext.customer
    let navigate = useNavigate();
    const [path] = useState("./Resources/HomeSlidebarimage1.jpg");

   
    let HandleRegistrationpage = (e) =>{
        e.preventDefault();
        navigate('/registration')
    }

    let HandleLogin = (e) => {
        e.preventDefault();
        navigate('/login')
    }

    let logoutCustomer = () =>{
        setislogedin(false);
        window.location.reload()
    }

    let getProductsbycatagory = (catagoryargs) => {
        window.scrollTo(0, 0);
        if(islogedin){
            axios.get("http://localhost:8080/getByproductCatagory/"+catagoryargs)
            .then((response) => {
                console.log(response.data)
                navigate("/productDisplay", {state: response.data})
            })
            .catch((error) => {
                alert("Error occured")
            }) 
        }else{
            navigate("/login")
        }
    }

    const getAllcartitem = () =>{
        console.log("Calling get All cart items")
        axios.get("http://localhost:8080/getbyCustmerId/"+customer.id)
        .then((responseCart) =>{
            console.log(responseCart)
            navigate("/order",{state:  responseCart.data})
        })
        .catch((error) => {
            alert(error)
        })
    }
    return(
        <React.Fragment>
        <div className="home_page">
            <title>Hpme Page</title>
        <div className="container-fluid">
            <div className="row advertisement-topbar border" style={{backgroundImage: `url(${path})`}}>
                <div className="container top-bar fixed-top shadow-sm">
                    <div className="row inner-cotaint-search-bar">
                        <div className="col-sm-8">
                            <input type="text" placeholder="Search..." className="form-control search-tab" />
                        </div>
                        {islogedin && 
                            <div className="col-sm-3">
                                <Dropdown  style={{marginTop: "5px"}}>
                                    <Dropdown.Toggle variant="none" className="cursor-pointer focus:outline-none focus:ring-0" as="span">
                                        <span>👤 {customer.name}</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={()=> {navigate("/registration",{state: customer})}}>Edit Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={()=> getAllcartitem()}>Cart</Dropdown.Item>
                                        <Dropdown.Item onClick={()=> logoutCustomer()}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                            </div>   
                        }
                        {!islogedin && 
                        <React.Fragment>
                            <div className="col-sm-2">
                                <button className="btn login-btn" onClick={HandleLogin}>Login</button>
                            </div>
                            <div className="col-sm-1">
                                <button className="btn signup-btn" onClick={HandleRegistrationpage}>Singup</button>
                            </div>
                        </React.Fragment>
                        }
                    </div>
                </div>
            </div>
            <div className="row border product-catagory">
                <div className="container-fluid">
                    <div className="row" style={{height: "300px"}}>
                        <div className="col-sm-3 border shadow-sm" onClick={() => {getProductsbycatagory("Human")}}>Human</div>
                        <div className="col-sm-3 border shadow-sm" onClick={() => {getProductsbycatagory("Cow")}}>Cow</div>
                        <div className="col-sm-3 border shadow-sm" onClick={() => {getProductsbycatagory("Cat")}}>Cat</div>
                        <div className="col-sm-3 border shadow-sm" onClick={() => {getProductsbycatagory("Dog")}}>Dog</div>
                    </div>
                </div>
            </div>
        </div>
        </div>               
        </React.Fragment>
    );
}