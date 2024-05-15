import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart, removeFromCart } from "../store/cart/cartActions";
import { useDispatch } from "react-redux";
import axios from "axios";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(props.product);
  const [token, setToken] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const amountInputRef = useRef();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem("isAdmin"));
  }, [token]);

  const handleUpdate = (id) => {
    navigate("/update/" + id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/product/delete/${id}`);
      console.log(response.data);
      if (response.data.message === "Product deleted!") {
        props.getProduct(); // Assuming this method fetches the list of products
      }
    } catch (e) {
      console.log("Error when trying to delete product:", e);
    }
};
const Lightbox = ({ src, alt, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000, // Make sure it's above everything else
    }} onClick={onClose}>
      <img src={src} alt={alt} style={{ maxHeight: '80%', maxWidth: '80%' }} onClick={e => e.stopPropagation()} />
    </div>
  );
};

  const handleAddToCart = (product) => {
    console.log(amountInputRef.current.value);
    const product_item = {
      product: product,
      amount: amountInputRef.current.value,
    };

    dispatch(addToCart(product_item));
    amountInputRef.current.value = 1;
    setOpenSnackbar(true); // Open the Snackbar when a product is added
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          width: 300,
          height: 700,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <CardHeader title={product.title} />
        <CardMedia
          component="img"
          height="245"
          image={product.images || product.image}
          alt="Product image"
          style={{
            width: '100%',
            height: '245px',
            objectFit: 'cover',
            cursor: 'pointer'
          }}
          onClick={() => setLightboxOpen(true)}
        />
        {lightboxOpen && (
          <Lightbox
            src={product.images}
            alt="Expanded product image"
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
          />
        )}
        <CardContent>
          <Stack direction="column" spacing={1}>
          <Typography
  variant="body2"
  color="text.secondary"
  width="100"
  height="100"
  sx={{
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical'
  }}
>
  {product.description}
</Typography>
            <Stack direction="row" spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating.rate || product.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body1" color="text.primary">
                {product.rating.rate || product.rating}
              </Typography>
            </Stack>
            <Stack direction="column">
              <Typography variant="body1" color="text.primary">
                {product.price} $
              </Typography>
              <Stack direction="row" spacing={1}>
              <Typography variant="body1" color="text.primary">
                Price discount: {product.discountPercentage}%
              </Typography>
              {token && isAdmin === "true" ? (
              <Typography variant="body1" color="text.primary">
                Stock: {product.stock}
              </Typography>
              ) : (
              <Typography variant="body1" color="text.primary">
                Stock: {product.stock > 0 ? "In stock" : "Out of stock"}
              </Typography>
              )}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions>
          {token && isAdmin === "true" ? (
            <Stack direction="row" gap={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleUpdate(product._id)}
              >
                Update
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </Button>
            </Stack>
          ) : (
            <>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<AddShoppingCartIcon />}
                  onClick={
                    token
                      ? () => handleAddToCart(product)
                      : () => navigate("/login")
                  }
                >
                  + Add
                </Button>
                <TextField
                  inputRef={amountInputRef}
                  sx={{ width: 70 }}
                  label="Amount"
                  id={"amount_" + props.id}
                  type="number"
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={1}
                />
              </Stack>
            </>
          )}
        </CardActions>
      </Card>
      <Snackbar
  open={openSnackbar}
  autoHideDuration={2500}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}  // Center at the top of the page
  sx={{
    top: { xs: '50%', sm: '50%' }, // Adjust for different screen sizes if necessary
    transform: 'translateY(-50%)',  // This helps to truly center it vertically
  }}
>
  <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
    Product added to cart!
  </Alert>
</Snackbar>
    </React.Fragment>
  );
};

export default ProductCard;
