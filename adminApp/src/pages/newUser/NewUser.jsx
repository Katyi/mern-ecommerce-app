import { useState } from "react";
import "./newUser.css";
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";
import app from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [gender, setGender] = useState("male");
  const [selected, setSelected] = useState(false);
  const [role, setRole] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onOptionChange = (e) => {
    setGender(e.target.value)
  };

  const handleSelectChange = (e) => {
    setSelected(e.target.value === 'yes' ? true : false);
    console.log(selected);
  };

  const handleIsAdminSelectChange = (e) => {
    setRole(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    let fileName = inputs.img;
    if (file !== null) {
      fileName = new Date().getTime() + file.name;
      const storage = getStorage();
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed', 
        (snapshot) => {
          const progress = 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newUser = { ...inputs, gender: gender, active: selected, isAdmin: role, img: downloadURL };
            addUser(newUser, dispatch);
          });
        }
      );
      navigate('/users');
    } else {
      const newUser = { ...inputs, gender: gender, active: selected, isAdmin: role };
      addUser(newUser, dispatch);
      navigate('/users');
    }
  };

  return (
    <div className="newUser">
      <div className="newUserTitle">
        <h1>New User</h1>
      </div>
      
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Image</label>
          <input 
            className="newUserImg"
            type="file" 
            id="file" 
            onChange={(e) => setFile(e.target.files[0])}
          />
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
            <label>Occupation</label>
            <input 
              name="occupation"
              type="text" 
              placeholder="occupation" 
              onChange={handleChange}
            />
          </div>
          <div className="newUserItem">
            <label>Role</label>
            <select className="newUserSelect" value={role} onChange={handleIsAdminSelectChange}>
              <option value={true}>Admin</option>
              <option value={false}>User</option>
            </select>
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
            <label>Password</label>
            <input 
              name="password"
              type="text" 
              placeholder="password"
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
            <label>Address</label>
            <input 
              name="address"
              type="text"
              placeholder="New York | USA"
              onChange={handleChange}
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
            <label>Active</label>
            <select className="newUserSelect" name="active" id="active" onChange={handleSelectChange}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <button onClick={handleClick} className="newUserButton">Create</button>
      </form>
    </div>
  );
}
