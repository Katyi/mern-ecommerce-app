import { useState } from "react";
import "./newUser.css";
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish, DeleteOutline } from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';
import { imageUpload } from '../../services/imageUpload';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Select from '../../UI/select/Select';
import CalendarPicker from '../../UI/CalendarPicker/CalendarPicker';
import { useAddUserMutation } from '../../redux/usersApi';

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [gender, setGender] = useState("Choose gender");
  const [role, setRole] = useState("Choose role");
  const [active, setActive] = useState("Choose active or not");
  const [openIsAdmin, setOpenIsAdmin] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();

  const optionsIsAdmin  = [
    { value: 'Admin'},
    { value: 'User'},
  ];

  const optionsForActive  = [
    { value: 'Yes'},
    { value: 'No'},
  ];

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onOptionChange = (e) => {
    setGender(e.target.value)
  };

  const handleIsAdminSelectChange = (value) => {
    if (openIsAdmin) {
      setRole(value);
      setOpenIsAdmin(false);
    } else if (openActive) {
      setActive(value);
      setOpenActive(false);
    }
  };

  const handleChangeImage = (e) => {
    e.preventDefault();
    const forNameOfFile = `${Date.now()}_${e.target.files[0].name}`;
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], forNameOfFile);
    setFileName(forNameOfFile);
    setFile(formData);
  };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    setFileName(null);
    setFile(null);
    const file = document.getElementById('file1');
    file.value = '';
  };

  const handleClick = async(e) => {
    e.preventDefault();
    let newUser;
    if (file !== null) {
      imageUpload(file);
      newUser = { ...inputs, gender: gender ? gender : "Choose gender", active: active === 'Yes' ? true : false, isAdmin: role === 'Admin' ? true : false, img: `http://alexegorova.ru/images/${fileName}` };
    }  else {
      newUser = { ...inputs, gender: gender ? gender : "Choose gender", active: active === 'Yes' ? true : false, isAdmin: role === 'Admin' ? true : false };
    }
    addUser(newUser);
    setFileName(null);
    navigate('/users');
  };

  return (
    <div className="newUser">
      <div className="newUserTitle">New User</div>
      <form className="newUserForm" onSubmit={handleClick}>
        <div className="userUpload">
          <img className="newUserUpdateImg" src={"https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}/>
          <div className="newUserImage">
            <label htmlFor="file1" className="userImageLabel">
              <Publish className="userUpdateIcon" />
            </label>
            <input
              type="file" 
              id="file1"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChangeImage}
            />
            <button className="userImageBtn" onClick={handleDeleteImage} id="resetbtn" type="button">
              <HighlightOffIcon className="userUpdateIcon"/>
            </button>
            <div>{fileName}</div>
          </div>
        </div>
        <div className="newUserWrapper">
          <div className="newUserItem">
            <label>Username</label>
            <input
              name="username" 
              type="text" 
              placeholder="john"
              onChange={handleChange}
            />
          </div>
          <div className="newUserItem">
            <label>Full Name</label>
            <input 
              name="fullname"
              type="text" 
              placeholder="John Smith" 
              onChange={handleChange}
            />
          </div>
          <div className="newUserItem">
            <label>birthday</label>
            <CalendarPicker
              selectedDate={inputs.birthday} 
              setSelectedDate={v => setInputs({ ...inputs, birthday: v })}
            />
          </div>
          <div className="newUserItem">
            <label>Gender</label>
            <div className="newUserGender">
              <input type="radio" name="gender" value="Male" id="male" checked={gender === "Male"} onChange={onOptionChange} />
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" value="Female" id="female" checked={gender==="Female"} onChange={onOptionChange}/>
              <label htmlFor="female">Female</label>
              <input type="radio" name="gender" value="Other" id="other" checked={gender==="Other"} onChange={onOptionChange}/>
              <label htmlFor="other">Other</label>
            </div>
          </div>
          <div className="newUserItem">
            <label>Occupation</label>
            <input 
              name="occupation"
              type="text" 
              placeholder="occupation" 
              onChange={handleChange}
            />
          </div>
          <div className="newUserItem">
            <label>Address</label>
            <input 
              name="address"
              type="text"
              placeholder="New York | USA"
              onChange={handleChange}
            />
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input 
              name="email"
              type="email" 
              placeholder="john@gmail.com"
              onChange={handleChange}
            />
          </div>
          <div className="newUserItem">
            <label>Phone</label>
            <input 
              name="phone"
              type="text" 
              placeholder="+1 123 456 78" 
              onChange={handleChange}
            />
          </div>
          <div className="newUserItem">
            <label>Role</label>
            <Select 
              options={optionsIsAdmin}
              selected={role || ""}
              onChange={handleIsAdminSelectChange}
              open={openIsAdmin}
              setOpen={setOpenIsAdmin}
            />
          </div>
          <div className="newUserItem">
            <label>Password</label>
            <input 
              name="password"
              type="text" 
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          <div className="newUserItem">
            <label>Active</label>
            <Select 
              options={optionsForActive}
              selected={active || ""}
              onChange={handleIsAdminSelectChange}
              open={openActive}
              setOpen={setOpenActive}
            />
          </div>
        </div>
        <button type="submit" className="newUserButton">Create</button>
      </form>
    </div>
  );
}
