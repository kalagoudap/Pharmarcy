import React, { useState } from "react";

 const Logincontext = React.createContext();


export  const LogincontextProvider = ({children}) =>{
    const [islogedin, setislogedin] = useState(false)
    const [customer, setCustomer] = useState({})
    const [admin_email, setAdminemail] = useState("")
    const loginContext = {
        "islogedin": islogedin,
        "setislogedin": setislogedin,
        "customer": customer,
        "setCustomer": setCustomer,
        "admin_email": admin_email,
        "setAdminemail":setAdminemail
    }
    
    return(
        <Logincontext.Provider value={loginContext}>
            {children}
        </Logincontext.Provider>
    )

}

export default Logincontext;