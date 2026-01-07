import { Dialog, Box, TextField, Typography, Button, styled } from "@mui/material";
import { useState } from "react";

import { authenticateSignup } from "../../services/api";

/* ---------- Styled Components ---------- */

const Component = styled(Box)`
  height: 70vh;
  width: 80vh;
  display: flex;
  overflow: hidden;
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  flex: 1;

  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const ImgBox = styled(Box)`
  background: #2874f0
    url("https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png")
    center 80% no-repeat;
  background-size: contain;
  height: 100%;
  width: 40%;
  padding: 45px 35px;

  & > p,
  & > h5 {
    color: #fff;
    font-weight: 600;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const RequestOTP = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const CreateAccount = styled(Typography)`
  font-size: 14px;
  text-align: center;
  color: #2874f0;
  margin-top: auto;
  font-weight: 600;
  cursor: pointer;
`;

/* ---------- Initial Values ---------- */

const accountInitialValues = {
  login: { view: "login" },
  signup: { view: "signup" },
};

const signupInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

/* ---------- Component ---------- */

const LoginDialog = ({ open, setOpen }) => {
  const [account, setAccount] = useState(accountInitialValues.login);
  const [signup, setSignup] = useState(signupInitialValues);

  const handleClose = () => {
    setOpen(false);
    setAccount(accountInitialValues.login);
  };

  const toggleSignup = () => {
    setAccount(accountInitialValues.signup);
  };

  const toggleLogin = () => {
    setAccount(accountInitialValues.login);
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    try {
      console.log("SIGNUP DATA:", signup);
      const response = await authenticateSignup(signup);
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="body"
      PaperProps={{
        sx: {
          maxWidth: "unset",
          overflow: "hidden",
        },
      }}
    >
      <Component>
        <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
          {/* Left Section */}
          <ImgBox>
            <Typography variant="h5">
              {account.view === "login"
                ? "Login"
                : "Looks like you're new here!"}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {account.view === "login"
                ? "Get access to your Orders, Wishlist and Recommendations"
                : "Sign up with your details to get started"}
            </Typography>
          </ImgBox>

          {/* Right Section */}
          {account.view === "login" ? (
            <Wrapper>
              <TextField variant="standard" label="Enter Email" fullWidth />
              <TextField
                variant="standard"
                label="Enter Password"
                type="password"
                fullWidth
              />

              <Text>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </Text>

              <LoginButton variant="contained">Login</LoginButton>

              <Typography sx={{ textAlign: "center" }}>OR</Typography>

              <RequestOTP>Request OTP</RequestOTP>

              <CreateAccount onClick={toggleSignup}>
                New to Flipkart? Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                name="firstname"
                label="First Name"
                onChange={onInputChange}
                fullWidth
              />
              <TextField
                variant="standard"
                name="lastname"
                label="Last Name"
                onChange={onInputChange}
                fullWidth
              />
              <TextField
                variant="standard"
                name="username"
                label="Username"
                onChange={onInputChange}
                fullWidth
              />
              <TextField
                variant="standard"
                name="email"
                label="Email"
                onChange={onInputChange}
                fullWidth
              />
              <TextField
                variant="standard"
                name="password"
                label="Password"
                type="password"
                onChange={onInputChange}
                fullWidth
              />
              <TextField
                variant="standard"
                name="phone"
                label="Phone"
                onChange={onInputChange}
                fullWidth
              />

              <LoginButton variant="contained" onClick={signupUser}>
                Continue
              </LoginButton>

              <CreateAccount onClick={toggleLogin}>
                Existing user? Login
              </CreateAccount>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
