// /Users/alexandermills/Documents/personal_projects/VolunteerPlanner/VP-react/src/components/NavBar.jsx
import { Link, useNavigate } from "react-router-dom"
import { logOut } from "../utilities";
import { UserContext } from "../App";
import { useContext } from 'react';
import "./Button.css";
import { AppBar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const theme = createTheme({
    palette: {
      primary: {
        main: '#204051'  //color of the nav-bar should be changed here
      },
    },
  });

function stringAvatar(name) {
    return {
      sx: {
        bgcolor: '#f3e5ab',
        width: 56, 
        height: 56,
        color: '#204051',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#84A9AC',
          },
      },
      children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[1][0].toUpperCase()}`,
    };
  }


export const NavBar = ()=> {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()
    const handleLogout = () => {
        logOut(setUser);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar color="primary">
                <div className="nav-buttons">
                    <div className="logo">
                        <h1>VolunteerCompass</h1>
                    </div>
                    <div className="right-buttons">
                        {user && user.name && user.isCoordinator ? (
                            <div className="inner-right-buttons">
                                <Link to="/">
                                    <button className="nav-button">Home</button>
                                </Link>
                                <Link to="/event-creation">
                                    <button className="nav-button">Event Creation Page</button>
                                </Link>
                                <Link to="/organizer/dashboard">
                                    <button className="nav-button">Dashboard</button>
                                </Link>
                                <Link to="/">
                                    <button className="nav-button" onClick={handleLogout}>LOG OUT</button>
                                </Link>
                                <Avatar {...stringAvatar(user.name)} onClick={(e)=> navigate('user/profile')}/>
                            </div>
                            ) : user && user.name ? (
                            <div className="inner-right-buttons">
                                {/* <h1>Hello {user.name.toUpperCase()}</h1> */}
                                <Link to="/">
                                    <button className="nav-button">Home</button>
                                </Link>
                                <Link to="/user/dashboard">
                                    <button className="nav-button">Dashboard</button>
                                </Link>
                                <Link to="/">
                                    <button className="nav-button" onClick={handleLogout}>LOG OUT</button>
                                </Link>
                                <Avatar {...stringAvatar(user.name)} onClick={(e)=> navigate('user/profile')}/>
                            </div>
                        ) : (
                            <div className="inner-right-buttons">
                                <Link to="/">
                                    <button className="nav-button">Home</button>
                                </Link>
                                <Link to="/register">
                                        <button className="nav-button">Register</button>
                                </Link>
                                <Link to="/login/">
                                        <button className="nav-button">Login</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </AppBar>
        </ThemeProvider>
        
    );
};

// // /Users/alexandermills/Documents/personal_projects/VolunteerPlanner/VP-react/src/components/NavBar.jsx
// import { Link } from "react-router-dom"
// import { logOut } from "../utilities";
// import { UserContext } from "../App";
// import { useContext } from 'react';
// import "./Button.css";

// export const NavBar = () => {

//     const { user, setUser } = useContext(UserContext);

//     const handleLogout = () => {
//         logOut(setUser);
//     };

//     return (
//         <div className="nav-buttons">
//         {user ? (
//             <>
//                 <Link to="/user/dashboard">
//                     <button className="nav-button">Dashboard</button>
//                 </Link>
//                 <button to="/" className="nav-button" onClick={handleLogout}>Log Out</button>
//             </>
//         ) : (
//             <>
//                 <Link to="/login">
//                     <button className="nav-button">Log In</button>
//                 </Link>
//                 <Link to="/register">
//                     <button className="nav-button">Register</button>
//                 </Link>
//             </>
//         )}
//         </div>
//     );
// };
