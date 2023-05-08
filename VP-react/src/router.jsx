// /Users/alexandermills/Documents/personal_projects/VolunteerPlanner/VP-react/src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/HomePage";
import { LogIn } from "./components/LoginPage";
import { Register } from "./components/RegisterPage";
import UserDashboard from "./components/UserDashboard";
import CalendarDate from "./components/CalendarDate";
import { CheckInPage } from "./components/CheckInPage";
import EventCreationPage from "./components/EventCreationPage";
import EventOrganizerDashboard from "./components/EventOrganizerDashboard";
import Profile from "./components/Profile";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "login",
                element: <LogIn />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "user/dashboard",
                element: <UserDashboard />,
            },
            {
                path: "calendar-date/:date",
                element: <CalendarDate />,
            },
            {
                path: "checkin",
                element: <CheckInPage />,
            },
            {
                path: "event-creation",
                element: <EventCreationPage />,
            },
            {
                path: "organizer/dashboard",
                element: <EventOrganizerDashboard />,
            },
            {
                path: "user/profile",
                element: <Profile/>
            }
        ],
    },
]);

export default router;