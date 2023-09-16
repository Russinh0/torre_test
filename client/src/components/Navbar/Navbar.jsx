import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
export default function Navbar() {
    const navigate = useNavigate();
    const {pathname} = useLocation()
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [buttonTitle, setButtonTitle] = useState("");
  useEffect(()=>{
    if(pathname==='/')setButtonTitle('Favorites')
    else if(pathname==='/favorites')setButtonTitle('Home')
  },[pathname])
  const handleLogoutButton = () => {
    localStorage.removeItem("token");
    setToken(false);
    return navigate("/form");
  };
  const handleLoginButton = () => {
    return navigate("/form");
  };
  const handleFavButton = () => {
    return pathname==='/'?navigate('/favorites'):navigate('/')
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NoTorre
          </Typography>
          {token ? (
            <Container sx={{ gap:'10px',justifyContent: "right", display: "flex" }}>
              <Button
              sx={{width:'13%'}}
                variant={"outlined"}
                color="primary"
                onClick={() => handleFavButton()}
              >
                {buttonTitle}
              </Button>
              <Button
               sx={{width:'13%'}}
                variant={"outlined"}
                color="primary"
                onClick={() => handleLogoutButton()}
              >
                Logout
              </Button>
            </Container>
          ) : (
            <Button
              variant={"outlined"}
              color="primary"
              onClick={() => handleLoginButton()}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
