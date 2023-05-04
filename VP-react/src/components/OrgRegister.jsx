import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { createOrgUser } from "../utilities";
import "./Button.css";
import "./Input.css";
import "./RegisterPage.css"
import { Grid, Paper } from '@mui/material';
import Alert from '@mui/material/Alert';

export default function OrgRegister() {
  const [orgName, setOrgName] = useState("")
  const [description, setDescription] = useState("")
  const [website, setWebsite] = useState("")
  const [orgEmail, setOrgEmail] = useState("")
  const [orgPhone, setOrgPhone] = useState("")

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const checkForMatch =(password, confirmedPassword)=> {
    if (password === confirmedPassword) {
      createOrgUser(firstName,
        lastName,
        email,
        password,
        orgName, 
        description, 
        website, 
        orgEmail, 
        orgPhone)
      setEmail("")
      setPassword("")
      setFirstName("")
      setLastName("")
      setConfirmedPassword("")
      setOrgName("")
      setDescription("")
      setWebsite("")
      setOrgEmail("")
      setOrgPhone("")
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
          <h3 style = {{color:"white"}}>Tell us about your organization!</h3>
            <form
                onSubmit={(e) => [
                  e.preventDefault(),
                  checkForMatch(password, confirmedPassword)
                ]}
                style={{ display: "flex", flexDirection: "column" }}
                  >
                  <input
                      placeholder="Name"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="input-field"
                      required
                  />
                  <input
                      type="text"
                      placeholder="Website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="input-field"
                  />
                  <input
                      placeholder="Email"
                      value={orgEmail}
                      type = "email"
                      onChange={(e) => setOrgEmail(e.target.value)}
                      className="input-field"
                      required
                  />
                  <input
                      placeholder="Phone number XXX-XXX-XXXX"
                      value={orgPhone}
                      type = "tel"
                      maxlength="12"
                      onChange={(e) => setOrgPhone(e.target.value)}
                      className="input-field"
                      required
                  />
                  <textarea
                      placeholder="Description"
                      type="text"
                      maxLength="250"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="input-field textarea"
                      required
                  />
                  <h3 style = {{color:"white"}}>Tell us about your yourself!</h3>
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
                      placeholder="Confirm password"
                      type="password"
                      value={confirmedPassword}
                      onChange={(e) => setConfirmedPassword(e.target.value)}
                      className="input-field"
                      required
                  />
                  <div className="sign-up-button-div">
                    <input type="submit" value="Submit!" className="nav-button"/>
                    <input type="reset" value="Reset" className="nav-button" onClick={() => [setEmail(""),
                                                                                      setPassword(""),
                                                                                      setConfirmedPassword(""),
                                                                                      setFirstName(""),
                                                                                      setDescription(""),
                                                                                      setEmail(""),
                                                                                      setLastName(""),
                                                                                      setOrgEmail(""),
                                                                                      setOrgName(""),
                                                                                      setOrgPhone(""),
                                                                                      setWebsite("")]}/>
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