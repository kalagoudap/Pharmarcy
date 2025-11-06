import { useState, useEffect } from 'react';
import axios from 'axios';
import './Registration.css'
import { useNavigate, useLocation } from 'react-router-dom';

export default function CustomerRegistration(){
    const location = useLocation();
    const data = location.state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState(0)
    const [gender, setgender] = useState("")
    const navigate = useNavigate();

    const display = (e) => {
        e.preventDefault();
        console.log("Name"+name+"Email"+email+"Address"+address+"Phone"+phone+"Gender"+gender)
        const request_json = {
            "name": name,
            "email": email,
            "address": address,
            "phonenumber": phone,
            "gender": gender
        }
        if(data != null){
            console.log("updating....")
            axios.put("http://localhost:8080/upadateCustomer",request_json)
            .then(() => {
                alert("Hi "+name+" Successfully Updated Account")
                navigate("/")
            })
            .catch((error) =>{
                console.log("got error");
            })
        }else{
            axios.post("http://localhost:8080/saveCustomer",request_json)
            .then(() => {
                alert("Hi "+name+" Successfully Craeated Account")
                navigate("/")
            })
            .catch((error) =>{
                console.log("got error");
            })
        }
    }

     useEffect(() =>{
        if(data != null){
            setName(data.name);
            setEmail(data.email);
            setAddress(data.address);
            setPhone(data.phonenumber);
            setgender(data.gender);
        }
    },[]);


    return(
        <div className="reg-page">
            <div className="border reg shadow-lg p-3 bg-light">
                <p className='fw-bold heading-text'>. Registration Form .</p>
                <form className='fw-bold' onSubmit={display}>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Name:</label>
                        <div class="col-sm-10">
                            <input type="text" defaultValue={data == null ? "" : data.name} className='form-control input-tag' onChange={(e) => {setName(e.target.value)}}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">E-mail:</label>
                        <div class="col-sm-10">
                            <input type="email" defaultValue={data == null ? "" : data.email} className='form-control input-tag' onChange={(e) => {setEmail(e.target.value)}}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Address:</label>
                        <div class="col-sm-10">
                            <input type="text" defaultValue={data == null ? "" : data.address} className='form-control input-tag' onChange={(e) => {setAddress(e.target.value)}}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Phone:</label>
                        <div class="col-sm-10">
                            <input type="number" defaultValue={data == null ? "" : data.phonenumber} className='form-control input-tag' onChange={(e) => {setPhone(e.target.value)}}/>
                        </div>
                    </div>
                    <div class="form-group row ">
                    <label  class="col-sm-2 col-form-label ">Gender:</label>
                    <select class="input-tag select-tag form-control " defaultValue={data == null ? "" : data.gender} onChange={(e) => {setgender(e.target.value)}} name="gender">
                        <option selected disabled>Select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                    <div className='submit-button'>
                        <button type="submit" class="btn btn-primary btn-lg btn-block">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    );
}