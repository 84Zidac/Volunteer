import { useContext, useState, useEffect} from "react";
import {UserContext, OrgContext} from "../App";
import "./Profile.css"
import { editProfile, verifyPassword, saveAboutMe, getEventsAttended} from "../utilities";
import volunteer from '../images/volunteer.jpg'
import { Edit, Save } from '@mui/icons-material';
import {Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, TextField, Alert } from '@mui/material';


export default function Profile(){
  const {user, setUser} = useContext(UserContext)
  const {organization} = useContext(OrgContext)
  const [editMode, setEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmedPassword, setNewConfirmedPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [aboutMe, setAboutMe] = useState(user.aboutMe)
  const [changeSuccess, setChangeSuccess] = useState(false)
  const [editDisabled, setEditDisabled] = useState(true)
  const [save, setSave] = useState(false)
  const [eventsAttended, setEventsAttended] = useState(null)

  useEffect(()=> {
    getEventsAttended()
    .then (data => {
      setEventsAttended(data.eventsAttended)
    })
  },[])

  const capitalized = (name) =>{
      let nameLower = name.toLowerCase().split(' ') 
       return nameLower.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }
  
  const openChangePasswordDialog = () => {
    setEditMode(true)
  }

  const handleCancelEdit = () => {
    setEditMode(false);
    setOldPassword('');
    setNewPassword('');
    setNewConfirmedPassword('')

  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    let response = await verifyPassword(oldPassword)
    if (response.password === false) {
      setPasswordError(true);
      setOldPassword('');
      setNewPassword('');
      setNewConfirmedPassword('')
    } else {
      if (newPassword !== newConfirmedPassword) {
        setNewPasswordError(true);
        setOldPassword('');
        setNewPassword('');
        setNewConfirmedPassword('')
      } else {
        editProfile(newPassword);
        setNewConfirmedPassword('');
        setNewPassword('');
        setOldPassword("")
        setChangeSuccess(true);
      }
    }
  }

  const handleEditButtonClick = () =>{
    setEditDisabled(false)
    setSave(false)
  }

  const handleSaveButtonClick = async(event) =>{
    event.preventDefault();
    setSave(true)
    setEditDisabled(true)
    saveAboutMe(aboutMe, setUser)
  }

  return (
          <div className="profile-main">
            <Box
              sx={{
                width: 600,
                height: 550,
                backgroundColor: '#84A9AC',
                pt: 2, pr: 3, pb: 4, pl: 5,
                borderRadius: '10%',
                marginLeft: '4em',
              }}>
                <div className="profile-div">
                  <Typography variant="h4" gutterBottom>
                    <b>My Profile</b>
                    </Typography>
                  <Typography variant="h6" gutterBottom>
                    Full Name: {capitalized(user.name)}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Email: {user.email}
                  </Typography>
                  { user.isCoordinator && <div className="profile-subdiv">
                    <hr></hr>
                    <Typography variant="h4" gutterBottom>
                    <b>Organization Details</b>
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Name: {organization.organization_name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Description: {organization.description}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Website: {organization.website}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Phone number: {organization.phone_number}
                    </Typography>              
                    <Typography variant="h6" gutterBottom>
                      Email: {organization.contact_email}
                    </Typography>
                    </div>}
                  {!user.isCoordinator &&
                    <div className="profile-subdiv">
                  <Typography variant="h6" gutterBottom>
                    Events attended: {eventsAttended || "0"}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    About me:
                  </Typography>
                  <div className="input-about-me">
                  <TextField
                    value={aboutMe}
                    variant="outlined"
                    multiline
                    maxRows={10}
                    contentEditable={true}
                    disabled = {editDisabled}
                    style = {{width: '500px'}}
                    inputProps={{ maxLength: 500}}
                    onChange={(e)=> {setAboutMe(e.target.value)}}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#204051",
                        fontWeight:'bold',
                      },
                    }}
                    InputProps={{
                      style: {
                        color: '#204051',
                        borderColor: '#204051',
                      },     
                    }}
                  />
                        <div>
                          {editDisabled ? (
                            <IconButton onClick={handleEditButtonClick}>
                              <Edit />
                            </IconButton>
                          ): ( <IconButton onClick={handleSaveButtonClick}>
                            <Save />
                          </IconButton>)}
                        </div>
                      </div>
                  </div>
                  } 
                    {save  && (
                      <Alert severity="info" onClose={() => setSave(false)}>
                        Saved!
                      </Alert> )}
                  <button onClick={openChangePasswordDialog} className='change-button'>
                  Change Password
                </button>
                <Dialog open={editMode} onClose={handleCancelEdit}>
                  <DialogTitle>Change Password</DialogTitle>
                  <form onSubmit={handleChangePassword}>
                    <DialogContent>
                      <TextField label="Current Password" fullWidth value={oldPassword} type="password" onChange={(e) => setOldPassword(e.target.value)} />
                    </DialogContent>
                    <DialogContent>
                      <TextField label="New Password" fullWidth value={newPassword} type="password" onChange={(e) => setNewPassword(e.target.value)} />
                    </DialogContent>
                    <DialogContent>
                      <TextField label="Confirm New Password" fullWidth value={newConfirmedPassword} type="password" onChange={(e) => setNewConfirmedPassword(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                      <button className='change-button'>Change</button>
                    </DialogActions>
                  </form>
                  {passwordError && (
                  <Alert severity="error" onClose={() => setPasswordError(false)}>
                    Your old password is incorrect. Try again!
                  </Alert> )}
                  {newPasswordError && (
                  <Alert severity="error" onClose={() => setNewPasswordError(false)}>
                    Your new passwords didn't match. Try again!
                  </Alert> )}
                  {changeSuccess && (
                  <Alert severity="info" onClose={() => setChangeSuccess(false)}>
                    Your password was changed!
                  </Alert> )}
                </Dialog>
                </div>
              </Box>
              <div className="profile-image">
                <img src={volunteer} alt="volunteers image" style={{ width: '600px', height: '600px', borderRadius: '50%' }}/>
                <a href="https://www.freepik.com/free-vector/people-volunteering-donating-money-items_3530067.htm#query=volunteer&position=4&from_view=search&track=sph" style={{ fontSize: '10px', color: '#204051' }}>Image by rawpixel.com on Freepik</a>
              </div>
            </div>
  )
}