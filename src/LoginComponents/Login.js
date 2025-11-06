import './Login.css'
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logincontext from '../Context/LoginContext';

export default function Login(){
    const loginContext = useContext(Logincontext)
    const setislogedin = loginContext.setislogedin
    const setCustomer = loginContext.setCustomer
    const setAdminemail = loginContext.setAdminemail
    const [isVisible, setisVisible] = useState(false)
    const [email, setemail] = useState("")
    const [otp, setOTP] = useState(0)
    const navigate = useNavigate()
    const [userType, setuserType] = useState("User")

    const sendOTP = (e) =>{
        e.preventDefault();
        const otp_requestbody = {
            "to": email,
            "userType": userType    
        }
        console.log("Debugger"+ otp_requestbody.to)
        setAdminemail(email)
        axios.post("http://localhost:8080/loginotp", otp_requestbody)
            .then((response) => {
                if(response.data)
                    setisVisible(true)
                else
                    alert("Wrong mail address")
                console.log(response)
            })
            .catch((error) => {
                alert("error occured")
            })
    }

    const LoginVerify = (e) =>{
        e.preventDefault();
        const reqestLogin_json = {
            "otp": otp
        }
        console.log("OTP :  "+otp);

        if (userType === "User"){
            axios.post("http://localhost:8080/customerLogin",reqestLogin_json)
            .then((response) => {
                if (response != null){
                    console.log(response.data)
                    setislogedin(true)
                    setCustomer(response.data)
                    alert("successfully Logged in")
                    navigate("/",response.data)
                }
                else
                    alert("error")
            })
        }else{
            axios.post("http://localhost:8080/adminLogin",reqestLogin_json)
            .then((response) => {
                if (response != null){
                    console.log(response.data)
                    setislogedin(true)
                    setCustomer(response.data)
                    alert("successfully Logged in")
                    navigate("/addProduct",response.data)
                }
                else
                    alert("error")
                })
            }
    }

    const HandleUserType = (userTypeArgs) =>{
        setuserType(userTypeArgs)
    }

    return(
        <div className="border shadow-lg p-3 login-page">
            <div className='row login-title'>
                <div className='col login-sub-title border' onClick={() => {HandleUserType("User")}} style={userType === "User"?{ backgroundColor: "#a3c3e7" }:{ backgroundColor: "transparent" }}>
                    <span className='fw-bold'>USER</span> 
                </div>
                <div className='col login-sub-title border' onClick={() => {HandleUserType("Admin")}} style={userType === "Admin"?{ backgroundColor: "#a3c3e7" }:{ backgroundColor: "transparent" }}>
                    <span className='fw-bold'>ADMIN</span>
                </div>
            </div>
            <div className='container email-site'>
                <span className='fw-bold'>{userType} Login</span>
                <div className='form-group row'>
                    <label id='email' class="col-sm-2">Email:</label>
                    <div class="col-sm-10">
                        <input type='email' className='form-control' onChange={(e) => {setemail(e.target.value)}} />
                    </div>
                    <div className='send-btn'>
                        <button type='submit' className='btn btn-primary' onClick={sendOTP}>SendOTP</button>
                        {isVisible && <span style={{paddingLeft: "10px", color: "green"}} className='fw-bold'>.OTP sent</span>}
                    </div>  
                </div>
                {isVisible && (
                    <div className='form-group row'>
                        <label id='email' class="col-sm-2">OTP:</label>
                        <div class="col-sm-10">
                            <input type='number' className='form-control' onChange={(e) => {setOTP(e.target.value)}}/>
                        </div> 
                        <div className='send-btn'>
                            <button type='submit' className='btn btn-primary' onClick={LoginVerify}>Login</button>
                        </div>  
                    </div>
                )}
            </div>
        </div>
    );
}