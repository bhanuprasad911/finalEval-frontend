import React, { useEffect, useState } from "react";
import style from "../styles/teams.module.css";
import {
  AddteamMember,
  fetchTeamMembers,
  deleteMember,
  editMember,
} from "../services/index.js";
import johndoe from "../assets/johndoe.svg";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

function Team() {
  const currentadmin = JSON.parse(localStorage.getItem("currentadmin")) || {};
  const [showmodal, setshowmodal] = useState(false);
  const [isEdit, setISedit] = useState(false);
  const [editId, seteditId] = useState(null);
  const [teamMembers, setteamMembers] = useState([]);
  const [formData, setFormdata] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "Team@123",
    role: "Member",
    assigned: [],
    createdBy: currentadmin._id,
  });
  const fetchmembers = async () => {
    const response = await fetchTeamMembers(currentadmin._id);
    setteamMembers(response.teamMembers);
    console.log(response);
    return;
  };

  const deleteTeamMember = async (id) => {
    const response = await deleteMember(id);
    console.log(response);
    toast.success(response.message);
    fetchmembers();
    return;
  };

  const handleEdit = (member) => {
    setFormdata({
      fullname: member.fullname,
      phone: member.phone,
      email: member.email,
      password: member.password,
      role: member.role,
      assignedChats: member.assignedChats,
      createdBy: member.createdBy,
    });
    seteditId(member._id);
    setISedit(true);
    setshowmodal(true);
  };

  useEffect(() => {
    fetchmembers();
  }, []);

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };
  const handlesubmit = async () => {
    if (
      formData.fullname.trim().length === 0 ||
      formData.email.trim().length === 0 ||
      formData.phone.trim().length === 0
    ) {
      toast.error("Please fill all the fields");
      return;
    } else if (!isEdit) {
      try {
        const response = await AddteamMember(formData);
        console.log(response);
        setshowmodal(false);
        toast.success(response.message);
        // window.location.reload()
        setteamMembers((prev) => [...prev, response.member]);
        setFormdata({
          fullname: "",
          email: "",
          phone: "",
          password: "Team@123",
          role: "Member",
          assigned: [],
          createdBy: currentadmin._id,
        });
      } catch (err) {
        console.log(err);
      }
      return;
    }
    try {
      const response = await editMember(editId, formData);
      console.log(response);
      toast.success(response.message);
      setteamMembers(response.data);
      setFormdata({
        fullname: "",
        email: "",
        phone: "",
        password: "Team@123",
        role: "Member",
        assigned: [],
        createdBy: currentadmin._id,
      });

      setISedit(false);
      seteditId(null);
      setshowmodal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.main}>
      <div className={style.head}>
        <h3>Team</h3>
      </div>
      <br />
      <br />
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
          <tr key={0} className={style.row}>
            <td>
              <img src={johndoe} alt="" />
            </td>
            <td>
              {currentadmin.role === "admin"
                ? `${currentadmin.firstname} ${currentadmin.lastname} `
                : `${currentadmin.fullname}`}
              (Me)
            </td>
            <td>+91 1234567890</td>
            <td>{currentadmin.email}</td>
            <td>{currentadmin.role}</td>
          </tr>
          {teamMembers.map((member, index) => {
            return (
              <tr className={style.row} key={index + 1}>
                <td>
                  <img src={johndoe} alt="" />
                </td>
                <td>{member.fullname}</td>
                <td>{member.phone}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>
                  <div className={style.editbuttons}>
                    <button
                      onClick={() => {
                        handleEdit(member);
                      }}
                      className={style.button}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      className={style.button}
                      onClick={() => {
                        deleteTeamMember(member._id);
                      }}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className={style.add}
        onClick={() => {
          if (currentadmin.role != "admin") {
            toast.error("Team member cannot add another team member");
            return;
          }
          setshowmodal(true);
        }}
      >
        Add Team Member
      </button>

      {showmodal && (
        <div className={style.formMain}>
          <div className={style.form}>
            <h2>Add Team members</h2>
            <br />
            <p>
              Talk with colleagues in a group chat. Messages in this group are
              only visible to it's participants. New teammates may only be
              invited by the administrators.
            </p>{" "}
            <br />
            <label>User name</label>
            <input
              placeholder="Enter name"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label>Email</label>
            <input
              placeholder="Enter email"
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label>Phone</label>
            <input
              placeholder="Enter phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label>Designation</label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
            <div className={style.buttons}>
              <button
                className={style.save}
                onClick={() => {
                  console.log(formData);
                  handlesubmit();
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setFormdata({
                    fullname: "",
                    email: "",
                    phone: "",
                    password: "user@123",
                    role: "",
                    assigned: [],
                    createdBy: currentadmin._id,
                  });
                  setshowmodal(false);
                }}
                className={style.cancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Team;
