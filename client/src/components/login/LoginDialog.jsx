import { Dialog, Box, TextField, Typography, Button, styled } from "@mui/material";
import { useState, useContext } from "react";
import { authenticateSignup, authenticateLogin } from "../../services/api";
import { DataContext } from "../../context/DataProvider";

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

const signupInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

const loginInitialValues = {
  email: "",
  password: "",
};

/* ---------- Component ---------- */

const LoginDialog = ({ open, setOpen }) => {
  const [view, setView] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const[login,setLogin]= useState(loginInitialValues);

  const { setAccount } = useContext(DataContext);

  const handleClose = () => {
    setOpen(false);
    setView("login");
  };

  const toggleSignup = () => setView("signup");
  const toggleLogin = () => setView("login");

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  // ✅ CONTINUE BUTTON LOGIC
  const signupUser = async () => {
    try {
      const response = await authenticateSignup(signup);

      console.log("API Response:", response.data); // Debugging log

      // ⭐ username context me save
      setAccount({
        firstname: response.data.firstname,
        email: response.data.email,
      });

      handleClose();
    } catch (error) {
      alert("Signup failed");
    }
  }
  const onValueChange = (e) => {

    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  const loginUser = async() => {
    try {
      const response = await authenticateLogin(login);
      console.log("Login API Response:", response.data); // Debugging log 
      
      if(response.status === 200){
        setAccount({
          firstname: response.data.firstname,
          email: response.data.email,
        });
        alert("Logged in successfully");
        handleClose();
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Please enter valid username or password");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} scroll="body">
      <Component>
        <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
          {/* LEFT */}
          <ImgBox>
            <Typography variant="h5">
              {view === "login" ? "Login" : "Looks like you're new here!"}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {view === "login"
                ? "Get access to your Orders, Wishlist and Recommendations"
                : "Sign up with your details to get started"}
            </Typography>
          </ImgBox>

          {/* RIGHT */}
          {view === "login" ? (
            <Wrapper>
              <TextField variant="standard" onChange={(e)=>onValueChange(e)} name='email' label="Enter Email" fullWidth />
              <TextField
                variant="standard" onChange={(e)=>onValueChange(e)} name='password'
                label="Enter Password"
                type="password"
                fullWidth
              />

              <Text>
                By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
              </Text>

              <LoginButton onClick ={() => loginUser()}>Login</LoginButton>

              <Typography sx={{ textAlign: "center" }}>OR</Typography>

              <RequestOTP>Request OTP</RequestOTP>

              <CreateAccount onClick={toggleSignup}>
                New to Flipkart? Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField name="firstname" label="First Name" variant="standard" onChange={onInputChange} />
              <TextField name="lastname" label="Last Name" variant="standard" onChange={onInputChange} />
              <TextField name="username" label="Username" variant="standard" onChange={onInputChange} />
              <TextField name="email" label="Email" variant="standard" onChange={onInputChange} />
              <TextField name="password" label="Password" type="password" variant="standard" onChange={onInputChange} />
              <TextField name="phone" label="Phone" variant="standard" onChange={onInputChange} />

              <LoginButton onClick={signupUser}>
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

