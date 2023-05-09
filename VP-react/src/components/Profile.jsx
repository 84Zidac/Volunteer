import { useContext} from "react";
import {UserContext, OrgContext} from "../App";
import {Typography} from '@mui/material';
import "./Profile.css"


export default function Profile(){
  const {user} = useContext(UserContext)
  const {organization} = useContext(OrgContext)

  const capitalized = (name) =>{
      let nameLower = name.toLowerCase().split(' ') 
       return nameLower.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }
  
  return (
            <div className="profile-div">
              <Typography variant="h6" gutterBottom>
                Full Name: {capitalized(user.name)}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Email: {user.email}
              </Typography>
              { user.isCoordinator ? (<div className="profile-subdiv">
                <hr></hr>
                <Typography variant="h4" gutterBottom>
                Organization Details
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
                  Phone number:{organization.phone_number}
                </Typography>              
                <Typography variant="h6" gutterBottom>
                  Email: {organization.contact_email}
                </Typography>
                </div>
              ): (
                <div className="profile-subdiv">
              <Typography variant="h6" gutterBottom>
                Events attended:
              </Typography>
              <Typography variant="h6" gutterBottom>
                About me:
              </Typography>
              </div>
               )
              } 
            </div>
  )
}