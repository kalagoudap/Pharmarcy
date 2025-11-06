import './App.css';
import {BrowserRouter  as Router,Routes, Route, useNavigate} from 'react-router-dom'
import Home from './HomeComponents/Home';
import CustomerRegistration from './RegistrationComponents/CustomerRegistration';
import Login from './LoginComponents/Login';
import AddProducts from './ProductComponents/AddProducts';
import ProductDisplay from './DisplayProductsComponents/ProductDisplay';
import Order from './OrderComponent/Order';
import { useLocation } from 'react-router-dom';

function App() {

  const Sidebar = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    return(
      <div style={{ position: "absolute",
                    top: "10px",   // distance from top
                    left: "10px", // distance from right
                    fontSize: "2rem",
                    cursor: "pointer"}}>
          {location.pathname !== "/" &&
          <span onClick={(e)=>{e.preventDefault();navigate("/")}}>🏠</span>
          }
      </div>
    );
  }
  const FootBar = () =>{
    return(
    <footer className="bg-light text-center text-muted py-3  border-top">
      <span>© 2025 Pharmarcy Application — CopyWrite Owned by Kalagouda Patil</span>
    </footer>
    )
  }

  return (  
      <Router>
        <Sidebar/>
        <div className="d-flex flex-column min-vh-100">
          <div className="flex-grow-1">
            <Routes>
              <Route exact path='/' Component={Home}></Route>
              <Route exact path='/registration' Component={CustomerRegistration}></Route>
              <Route exact path='/login' Component={Login}></Route>
              <Route exact path='/addProduct' Component={AddProducts}></Route>
              <Route exact path='/productDisplay' Component={ProductDisplay}></Route>
              <Route exact path='/order' Component={Order}></Route>
            </Routes>
          </div>
        </div>
        <FootBar/>
      </Router>
  );
}

export default App;
