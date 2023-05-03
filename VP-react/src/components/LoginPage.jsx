// VP-react/src/components/RegisterLoginPage.jsx
import { useContext, useState } from "react";
import { logIn } from "../utilities";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Button.css";
import "./Input.css";
import { Grid, Paper } from '@mui/material';
import Alert from '@mui/material/Alert';
import {Visibility as VisibilityIcon} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {VisibilityOff as VisibilityOffIcon} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#E7DFD5'  //color of the icon 
      },
    },
  });

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await logIn(email, password, setUser);

    if (success) {
      navigate("/user/dashboard");
    }
    else {
      setError(true)
    }

    setEmail("");
    setPassword("");
  };

  return (
    <ThemeProvider theme={theme}>
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper style={{ padding: 15, backgroundColor: "#3B6978" }}>
          <form className="log-in-form" onSubmit={handleLogin}>
            <h3 style = {{color:"white"}}>Log In</h3>
            <div className="log-in-input-div">
              <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <div className="password-input-div">
                <input
                  placeholder="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={(e)=> setShowPassword(!showPassword)}
                    color="primary"
                  >
                    {showPassword ? (<VisibilityOffIcon className="svg_icons"/>)
                  : (<VisibilityIcon className="svg_icons"/>)}
                </IconButton>
              </div>
            </div>
            <div className="log-in-button-div">
              <input type="submit" value="Submit" className="nav-button"/>
              <input type="reset" value="Reset" className="nav-button" onClick={() => [setEmail(""), setPassword("")]}/>
            </div>
          </form>
          {error && (
        <Alert severity="error" onClose={() => setError(false)}>
          Wrong password or email. Try again!
        </Alert> )}
        </Paper>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
};
