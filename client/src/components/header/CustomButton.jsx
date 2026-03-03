import { useState, useContext } from "react";
import { Box, Button, Typography, styled, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";

import LoginDialog from "../login/LoginDialog";
import Profile from "./Profile";
import { DataContext } from "../../context/DataProvider";


// ================= Wrapper =================

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  gap: 35,

  // Drawer / Mobile View
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 20,
    padding: "20px",
    margin: 0
  }
}));


// ================= Login Button =================

const LoginButton = styled(Button)(({ theme }) => ({
  color: "#2874f0",
  background: "#ffffff",
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 2,
  padding: "5px 40px",
  height: 32,
  boxShadow: "none",

  "&:hover": {
    background: "#ffffff"
  },

  [theme.breakpoints.down("md")]: {
    width: "100%",
    justifyContent: "flex-start"
  }
}));


// ================= Cart =================

const CartContainer = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
  gap: 8,

  [theme.breakpoints.down("md")]: {
    width: "100%"
  }
}));


// ================= Component =================

const CustomButton = () => {
  const [open, setOpen] = useState(false);
  const { account, setAccount } = useContext(DataContext);

  const cartItems = []; // Replace with real cart data later

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <Wrapper>
      {/* Login / Profile */}
      {account ? (
        <Profile account={account} setAccount={setAccount} />
      ) : (
        <LoginButton variant="contained" onClick={openDialog}>
          Login
        </LoginButton>
      )}

      {/* Become Seller */}
      <Typography
        sx={{
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        Become a Seller
      </Typography>

      {/* More */}
      <Typography
        sx={{
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        More
      </Typography>

      {/* Cart */}
      <CartContainer to="/cart">
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCart />
        </Badge>
        <Typography sx={{ fontSize: 16 }}>
          Cart
        </Typography>
      </CartContainer>

      {/* Login Dialog */}
      <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
    </Wrapper>
  );
};

export default CustomButton;