import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { signUp } from "../utilities";
import "./Button.css";
import "./Input.css";
import "./RegisterPage.css"
import { Grid, Paper } from '@mui/material';
import Alert from '@mui/material/Alert';

export const VolunteerRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const checkForMatch =(password, confirmedPassword)=> {
    if (password === confirmedPassword) {
      signUp(firstName,
        lastName,
        email,
        password)
      setEmail("")
      setPassword("")
      setFirstName("")
      setLastName("")
      setConfirmedPassword("")
      navigate("/login")
    }
    else {
      setError(true)
      setPassword("")
      setConfirmedPassword("")
    }
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper style={{ padding: 15, backgroundColor: "#3B6978" }}>
          <h3 style = {{color:"white"}}>Tell us about yourself!</h3>
          <form
              onSubmit={(e) => [
                e.preventDefault(),
                checkForMatch(password, confirmedPassword)
              ]}
              style={{ display: "flex", flexDirection: "column" }}
                >
                <div className="sign-up-input-div">
                  <input
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="input-field"
                      required
                  />
                  <input
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="input-field"
                      required
                  />
                  <input
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field"
                      required
                  />
                  <input
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field"
                      required
                  />
                  <input 
                      type={"password"} 
                      placeholder="Confirm password"
                      value = {confirmedPassword}
                      onChange = {(e) => setConfirmedPassword(e.target.value)}
                      className="input-field"
                      required
                  />
                </div>
                <div className="sign-up-button-div">
                  <input type="submit" value="Submit!" className="nav-button"/>
                  <input type="reset" value="Reset" className="nav-button" onClick={() => [setEmail(""),
                                                                                          setPassword(""),
                                                                                          setFirstName(""),
                                                                                          setLastName(""),
                                                                                          setConfirmedPassword("")]}/>
                  </div>
            {error && (
              <Alert severity="error" onClose={() => setError(false)}>
                Passwords don't macth. Try again!
              </Alert> )}
            </form>
          </Paper>
      </Grid>
    </Grid>
  )
}