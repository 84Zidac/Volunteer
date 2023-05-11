// /Users/alexandermills/Documents/personal_projects/VolunteerPlanner/VP-react/src/components/RegisterPage.jsx
import { useState } from "react";
import "./Button.css";
import "./Input.css";
import "./RegisterPage.css";
import volunteer from '../images/help.png';
import organization from '../images/non-profit-organization.png';
import {VolunteerRegister} from "./VolunteerRegister";
import OrgRegister from "./OrgRegister";
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';


const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#84A9AC',
  },
}));


export const Register = () => {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const handleLeftPaperClick = () => {
    setLeftOpen(!leftOpen);
    setRightOpen(false);
  };

  const handleRightPaperClick = () => {
    setRightOpen(!rightOpen);
    setLeftOpen(false);
  };

  return (
    <div>
      <div className="registration-page">
        <div className="registration-page-welcome">
          <h2>Register</h2>
        </div>
          <div className="registration-selection"> 
          <CustomPaper 
            elevation={3}
            onClick={handleLeftPaperClick} >
            <div className="volunteer-selector">
              <img src={volunteer} />
              <h2>Volunteer</h2>
            </div>
          </CustomPaper>
          <CustomPaper 
            elevation={3}
            onClick={handleRightPaperClick}>
            <div  className="coordinator-selector">
              <img src={organization} />
              <h2>Organization</h2>
            </div>
          </CustomPaper> 
        </div>
      </div>
      <div className="register-forms">
        {leftOpen && <VolunteerRegister/>
        }
        {rightOpen && <OrgRegister/>}
        <a href="https://www.flaticon.com/authors/freepik" title="flaticon icons" style={{ fontSize: '10px', color: '#204051' }}>Icons created by Freepik - Flaticon</a>
      </div>
    </div>
  );
};