import { useContext, useState } from 'react';
import './Addproduct.css'
import Logincontext from '../Context/LoginContext';
import axios from 'axios';

export default function AddProducts(){
    const [productname, setproductname] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [catagory, setCatagory] = useState("")
    const loginContext = useContext(Logincontext)

    const addProduct = (e) =>{
        e.preventDefault();
        const request_data = {
            "productname": productname,
            "price": price,
            "catagory": catagory,
            "quantity": quantity,
            "admin_email": loginContext.admin_email
        }
        console.log("Admin Email: "+loginContext.admin_email)

        axios.post("http://localhost:8080/saveProduct",request_data)
        .then((respose)=>{
            alert("Product "+request_data.productname+" is Added to Database")
        })
        .catch((error) => {
            alert("Error Occured")
        })
    }

    return(
        <div className="product-page">
            <div className="border product-div shadow-lg p-3">
                <p className='fw-bold product-title-text'>. Product Add .</p>
                <form className='fw-bold' onSubmit={addProduct}>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Name:</label>
                        <div class="col-sm-10">
                            <input type="text" className='form-control input-tag' onChange={(e)=>{setproductname(e.target.value)}}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">price:</label>
                        <div class="col-sm-10">
                            <input type="number" className='form-control input-tag' onChange={(e)=>{setPrice(e.target.value)}}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">quantity:</label>
                        <div class="col-sm-10">
                            <input type="number" className='form-control input-tag' onChange={(e)=>{setQuantity(e.target.value)}}/>
                        </div>
                    </div>
                    <div class="form-group row">
                    <label  class="col-sm-2 col-form-label">catagory:</label>
                    <select class="input-tag select-tag form-control" name="catagory" onChange={(e)=>{setCatagory(e.target.value)}}>
                        <option selected disabled>Select your gender</option>
                        <option value="Human">Human</option>
                        <option value="Cow">Cow</option>
                        <option value="Cat">Cat</option>
                        <option value="Dog">Dog</option>
                    </select>
                    </div>
                    <div className='submit-button'>
                        <button type="submit" class="btn btn-primary btn-lg btn-block">Add</button>
                    </div>
                </form>
            </div>
        </div>

    );
}