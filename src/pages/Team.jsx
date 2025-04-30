import React, { useEffect, useState } from 'react'
import style from '../styles/teams.module.css'
import { AddteamMember, fetchTeamMembers, deleteMember } from '../services/index.js'
import johndoe from '../assets/johndoe.svg'
import { AiOutlineEdit,  AiOutlineDelete} from "react-icons/ai";


function Team() {
  const currentadmin = JSON.parse(localStorage.getItem('currentadmin'))||{}
  const [showmodal, setshowmodal] = useState(false)
  const [teamMembers, setteamMembers] = useState([])
  const [formData, setFormdata] = useState({
    fullname:"",
    email: "",
    phone: "",
    password:"Team@123",
    role:"Member",
    assigned:[],
    createdBy:currentadmin._id,

  })
const fetchmembers = async()=>{
  const response = await fetchTeamMembers(currentadmin._id)
  setteamMembers(response.teamMembers)
  console.log(response)
  return
  }

const deleteTeamMember = async(id)=>{
  const response = await deleteMember(id)
  console.log(response)
  fetchmembers()
  return

}



  useEffect(()=>{
    fetchmembers()

  },[])

  const handleChange =(e)=>{
    setFormdata({...formData, [e.target.name]:e.target.value})
  }
  const handlesubmit = async()=>{
    if(
      (formData.name.trim().length === 0) || 
    (formData.email.trim().length === 0) ||
    (formData.phone.trim().length === 0)
  ){
    alert('Please fill all the fields')
    return
  }
    try{
      const response = await AddteamMember(formData)
      console.log(response)
      setshowmodal(false)
      alert(response.message)
      window.location.reload()
    }
    catch(err){
      console.log(err)
    }

  }


  return (
    <div className={style.main} >

      <div className={style.head}>
        <h3>Team</h3>
      </div><br /><br />
    <table className={style.table}>
      <thead>
        <tr>
          <th></th>
          <th>Fullname</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr key={0}  className={style.row}>
          <td><img src= {johndoe}alt="" /></td>
          <td>{currentadmin.role==='admin'?`${currentadmin.firstname} ${currentadmin.lastname} `:`${currentadmin.fullname}`}(Me)</td>
          <td>+91 1234567890</td>
          <td>{currentadmin.email}</td>
          <td>{currentadmin.role}</td>
        </tr>
        {
          teamMembers.map((member,index)=>{
            return(
              <tr className={style.row} key={index+1}>
                <td><img src= {johndoe}alt="" /></td>
                <td>{member.fullname}</td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td><div className={style.editbuttons}><button className={style.button}><AiOutlineEdit /></button><button className={style.button} onClick={()=>{
                  deleteTeamMember(member._id)
                }}><AiOutlineDelete/></button></div></td>
              </tr>
    
            )
          })
        }
      </tbody>
    </table>
      <button className={style.add} onClick={()=>{
        if(currentadmin.role != 'admin'){
          alert('Team member cannot add another team member')
          return
        }
        setshowmodal(true)
      }}>Add Team Member</button>

      {
        showmodal && (
          <div className={style.formMain}>
        <div className={style.form}>
          <h2>Add Team members</h2><br />
          <p>Talk with colleagues in a group chat. Messages in this group are only visible to it's participants. New teammates may only be invited by the administrators.</p> <br />
        <label >User name</label>
     <input placeholder='Enter name' type="text" name="fullname" value={formData.fullname} onChange={(e)=>{
      handleChange(e)
     }}/>
        <label >Email</label>
     <input placeholder='Enter email' type="text" name="email" value={formData.email} onChange={(e)=>{
      handleChange(e)
     }}/>
     <label >Phone</label>
     <input placeholder='Enter phone' type="text" name="phone" value={formData.phone} onChange={(e)=>{
      handleChange(e)
     }}/>
     <label >Designation</label>
     <select name="role"  value={formData.role} onChange={(e)=>{
      handleChange(e)
     }}>
      
      <option value="Member">Member</option>
      <option value="Admin">Admin</option>
     </select>

     <div className={style.buttons}>

     <button className={style.save} onClick={()=>{
       console.log(formData)
       handlesubmit()
      //  setFormdata({
      //    fullname:"",
      //    email: "",
      //    phone: "",
      //    password:"user@123",
      //    role:"",
      //    createdBy:currentadmin._id,
      //   })
      }}>Save</button>
      <button onClick={()=>{
        setFormdata({
          fullname:"",
          email: "",
          phone: "",
          password:"user@123",
          role:"",
          assigned:[],
          createdBy:currentadmin._id,
          })
          setshowmodal(false)

      }} className={style.cancel}>Cancel</button>
     </div>
     </div>
      </div>
        )
      }
      
    </div>
  )
}

export default Team
