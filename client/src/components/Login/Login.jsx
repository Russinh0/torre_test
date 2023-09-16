import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate()
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  const passwordErrorMessage="The password must contain:\n - 8 characters - \n At least one uppercase and one lowercase letter - \n At least one number"
  const usernameErrorMessage="User cannot be empty\n"
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const { username, password } = {
      username: data.get("username"),
      password: data.get("password"),
    };
    if (!username.trim())
      return changeAlertState({ message: usernameErrorMessage, severity: "error" });
    if (!passwordRegex.test(password)) {
      return changeAlertState({ message: passwordErrorMessage, severity: "error" });
    }
    var res;
    try {
      switch (e.nativeEvent.submitter.id) {
        case "login":
          res = await axios.post("http://localhost:8080/api/user/login", { username, password });
          localStorage.setItem('token',`bearer ${res.data.payload}`)
          if(res){
            changeAlertState({ message: res.data.message, severity: "success" })
            return navigate('/search')
          }
          break;
        case "register":
          res = await axios.post("http://localhost:8080/api/user/register", { username, password });
          if(res)changeAlertState({ message: res.data.message.message || "", severity: "success" })
          break;
        default:
          break;
      }
    } catch (e) {
      console.log(e)
      if(e.response)return changeAlertState({ message: e.response.data.message || 'Error interno, intente más tarde...,', severity: "error" });
      changeAlertState({ message:'Internal error, try later...,', severity: "error" });
    }
  };
  const [passwordErrorState, changePasswordState] = React.useState(false);
  const [usernameErrorState, changeUsernameState] = React.useState(false);
  const [alertState, changeAlertState] = React.useState({message:'',severity:'success'});
  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon color='primary' />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Collapse in={!!alertState.message}>
              <Alert
                severity={alertState.severity}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      changeAlertState({message:'',severity:''});
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {alertState.message}
              </Alert>
            </Collapse>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={usernameErrorState}
              helperText={
                usernameErrorState
                  ? usernameErrorMessage
                  : ""
              }
              onChange={(e) => {
                changeUsernameState(!e.target.value.trim());
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordErrorState}
              onChange={(e) => {
                changePasswordState(!passwordRegex.test(e.target.value));
              }}
              helperText={
                passwordErrorState
                  ? passwordErrorMessage
                  : ""
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10%",
              }}
            >
              <Button
                type="submit"
                variant="outlined"
                sx={{ width: "45%" }}
                id="login"
                
              >
                Login
              </Button>
              <Button
                type="submit"
                sx={{ width: "45%" }}
                variant="outlined"
                id="register"
              >
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
  );
}