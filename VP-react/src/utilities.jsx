// /Users/alexandermills/Documents/personal_projects/VolunteerPlanner/VP-react/src/utilities.jsx
import axios from 'axios';

export const signUp = async (firstName, lastName, email, password) => {
    let response = await axios.post('/register/', {
        first_name: firstName, // Change this line
        last_name: lastName, // Change this line
        email: email,
        password: password,
    });
    console.log(response.data.success);
    return response.data.success;
  };

  export const createOrgUser = async (firstName, 
                                     lastName, 
                                     email, 
                                     password, 
                                     orgName, 
                                     description, 
                                     website, 
                                     orgEmail, 
                                     orgPhone) => {
    let response = await axios.post('/organization/', {
        first_name: firstName, 
        last_name: lastName,
        email: email,
        password: password,
        organization_name: orgName,
        description: description,
        website: website,
        contact_email: orgEmail,
        phone_number: orgPhone
    })
    return response.data.success
    };
// export const logIn = async(email, password, setUser) => {
//     let response = await axios.post('/user/login/', {
//         'email' : email,
//         'password' : password
//     })

//     console.log("Login response data:", response.data); // Add this line to check the response data

//     setUser(response.data)
//     return response.data.success; // Add this line
// }

export const logIn = async(email, password, setUser) => {
    let response = await axios.post('/user/login/', {
        'email' : email,
        'password' : password
    })

    console.log("Login response data:", response.data);

    if (response.data.email) { // Check for the email property in the response data
      setUser(response.data);
      return true; // Return true to indicate a successful login
    }

    return false; // Return false if the login was not successful
}


export const currUser = async() =>{
    let response = await axios.get('/user/curruser/')
    console.log(response.data)
    return response.data
}

export const logOut = async(setUser) => {
    let response = await axios.post('/user/logout/')
    if(response.data.logout){
        setUser(null)
    }
}

export const getEvents = async() => {
    let response = await axios.get('/events/')
    return response.data
}

export const getEventsByOrganization = async(organizationId) => {
  //console.log("organizationId", organizationId)
  let response;
    try{
      if (organizationId) {
            response = await axios.get(`/events/organization/${organizationId}`)
          }
          return response.data
    } catch (error) {
        console.log(error);
        return [];
    }

    
}

export const createEvent = async (
    eventName,
    startTime,
    endTime,
    description,
    volunteersRequired,
    protectiveEquipment,
    streetAddress,
  ) => {
    let response = await axios.post('/event-creation/', {
      event_name: eventName,
      start_time: startTime,
      end_time: endTime,
      description: description,
      volunteers_required: volunteersRequired,
      protective_equipment: protectiveEquipment,
      street_address: streetAddress.label,
    });
  
    console.log(response.data.success);
    return response.data.success;
  };
  
  export async function getVolunteersList(date) {
    try {
      const response = await axios.get(`/volunteers_list/${date}/`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
}
  export async function getVolunteersByEventId(eventId) {
    console.log('eventId', eventId)
    try {
      const response = await axios.get(`/volunteers_list_by_event_id/${eventId}/`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
}

  export const getOrganization = async(email) => {
    let response = await axios.post('/organization/', {
        'email' : email
    })
    return response.data.organization
  }

  export const verifyPassword = async(password) => {
    let response = await axios.post('/user/curruser/', {
      "password": password
    })
    return response.data
  }

  export const editProfile = async (password) => {
    let response = await axios.put('/user/curruser/', {
      "password": password,
    })
    return response.data
  }

  export const saveAboutMe = async (aboutMe, setUser) => {
    let response = await axios.put('/user/curruser/', {
      "about_me": aboutMe,
    })
    setUser(response.data)
    return response.data
  }


  export const volunteersAccounted = async (volunteerIds, isPresent) => {
    try {
      const response = await axios.put('/volunteer_attendance/', {volunteerIds, isPresent})
        return response.data
    } catch (error) {
      console.error(error);
      return [];
    }
  }