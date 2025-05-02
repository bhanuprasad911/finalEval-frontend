import { MdRemoveShoppingCart } from "react-icons/md";

const backendurl = import.meta.env.VITE_BACKEND_URL;

const signup = async (user) => {
  try {
    const response = await fetch(`${backendurl}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to signup user" };
  }
};

export const editProfile = async (user) => {
  try {
    const response = await fetch(`${backendurl}/user/signup`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to edit profile" };
  }
};

export const login = async (user) => {
  try {
    const response = await fetch(`${backendurl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to login user" };
  }
};

export const addEndUser = async (user) => {
  try {
    const response = await fetch(`${backendurl}/message/adduser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message, data: err };
  }
};

export const sendMessage = async ({ id, message }) => {
  try {
    const response = await fetch(`${backendurl}/message/addmessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id, message }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

export const fetchusers = async () => {
  try {
    const response = await fetch(`${backendurl}/message/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

export const updatestatus = async ({ id, status }) => {
  try {
    const response = await fetch(`${backendurl}/message/updatestatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id, status }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

export const AddteamMember = async (user) => {
  try {
    const response = await fetch(`${backendurl}/user/member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

export const editMember = async (id, formData)=>{
  try{
    const response = await fetch(`${backendurl}/user/member/${id}`, {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Accept: 'application/json'

      },
      body:JSON.stringify(formData)
    })
    const data = await response.json()
    return data
  }catch(err){
    console.log(err)
    return {error:err.message}
  }
}

export const fetchTeamMembers = async (id) => {
  try {
    const response = await fetch(`${backendurl}/user/fetchmembers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

export const assignChat = async (memberId, ticketId) => {
  console.log(memberId, ticketId);
  try {
    const response = await fetch(
      `${backendurl}/message/assign?memberId=${memberId}&ticketId=${ticketId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

export const membermessagefetch = async (id) => {
  try {
    const response = await fetch(`${backendurl}/message/member/${id}`, {
      method: "GET",
      header: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { err: error.message };
  }
};

export const deleteMember = async (id) => {
  try {
    const response = await fetch(`${backendurl}/user/member`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

export const updatemissed = async (userid, dateobj) => {
  try {
    const response = await fetch(`${backendurl}/message/adduser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id: userid, date: dateobj }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
};

export const fetchMissed = async ()=>{
  try{
    const response = await fetch(`${backendurl}/message/missed`, {
      method:'GET',
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json()
    return data

  }catch(err){
    console.log(err.message)
    return(err)
  }
}

export default signup;
