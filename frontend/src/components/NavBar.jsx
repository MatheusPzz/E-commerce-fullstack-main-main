import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import logo from "../img/Logo.png";
import ButtonBase from "@mui/material/ButtonBase";
import { AuthContext } from "../context/authContext";
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/cart/cartActions';


const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authContext = React.useContext(AuthContext);
  const items = useSelector((state) => state.cartStore.addedItems);
  const [token, setToken] = useState();
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem("isAdmin"));
  }, [token]);

  const goToHome = () => {
    navigate("/");
  };

  const goToAddProduct = () => {
    navigate("/addProduct");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const logOut = () => {
    localStorage.clear();
    dispatch(clearCart());  // Dispatch the clearCart action
    setIsAdmin();
    setToken();
    authContext.logout();
    navigate("/");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const goToOrders = () => {
    navigate("/orders");
  };

  return (
    <React.Fragment>
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="sticky" sx={{ background: "#BACD92" }}>
      <Toolbar>
        <ButtonBase onClick={goToHome}>
          <img 
            src={logo} 
            alt="Home" 
            style={{ width: '5rem', height: '5rem', borderRadius: '50%', padding: '0.5rem'}} 
          />
        </ButtonBase>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} 
          style={{
            color: 'White',
            fontFamily: 'Arial',
            fontSize: '2rem',
            fontWeight: 'bold',
            letterSpacing: '0.1rem',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          Variety Vault
        </Typography>
        {token && isAdmin === "false" && (
          <Button color="inherit" onClick={goToOrders} style={{ margin: '0 12px' }}>
            Orders
          </Button>
        )}
        {isAdmin === "false" && (
          <IconButton onClick={goToCart} style={{ margin: '0 12px' }}>
            <Badge badgeContent={items.length} color="secondary">
              <ShoppingCartIcon 
                style={{
                  color: 'White',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.1rem',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  padding: '0.7rem',
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                }}
              />
            </Badge>
          </IconButton>
        )}
        {isAdmin === "true" && (
          <Button color="inherit" onClick={goToAddProduct} style={{ margin: '0 12px' }}>
            Add product
          </Button>
        )}
        {!token ? (
          <Button 
            color="inherit" 
            onClick={goToLogin} 
            style={{
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              borderRadius: '18px',
              color: '#000000',
              fontWeight: 'bold',
              padding: '6px 20px',
              textTransform: 'none',
              marginRight: '12px'  // Added margin
            }}
          >
            Hello, Sign in
          </Button>
        ) : (
          <Button 
            color="inherit" 
            onClick={logOut}
            style={{
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              borderRadius: '18px',
              color: '#000000',
              fontWeight: 'bold',
              padding: '6px 20px',
              textTransform: 'none',
              marginLeft: '12px'  // Added margin
            }}
          >
            Sign Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  </Box>
</React.Fragment>

  );
};

export default NavBar;
