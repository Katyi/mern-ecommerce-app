import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish, DeleteOutline } from "@mui/icons-material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useLocation, useNavigate } from "react-router-dom";
import "./user.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { format } from "timeago.js";
import { getUsers, updateUser } from "../../redux/apiCalls";
import Select from '../../UI/select/Select';
import CalendarPicker from '../../UI/CalendarPicker/CalendarPicker';
import { imageUpload, imageDelete } from '../../services/imageUpload';

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let currentUser = useSelector((state) =>
    state.user.users.find((user) => user?._id === userId)
  );
  const currentImage = useSelector((state) => state.image.images);

  const [user, setUser] = useState(currentUser);
  const [file, setFile] = useState(null);
  const [fileForDelete, setFileForDelete] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [active, setActive] = useState(user?.active ? 'Yes' : 'No');
  const [gender, setGender] = useState(currentUser?.gender);
  const [role, setRole] = useState(user?.isAdmin ? 'Admin' : 'User');
  const [openIsAdmin, setOpenIsAdmin] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const optionsIsAdmin  = [
    { value: 'Admin'},
    { value: 'User'},
  ];
  const optionsForGender  = [
    { value: 'Female'},
    { value: 'Male'},
  ];
  const optionsForActive  = [
    { value: 'Yes'},
    { value: 'No'},
  ];

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleActiveSelectChange = (e) => {
    setActive(e.target.value);
  };

  const handleGenderSelectChange = (value) => {
    setUser((prev) => {
      return { ...prev, gender: value };
    });
    setOpenGender(false)
  };

  const handleIsAdminSelectChange = (value) => {
    if (openIsAdmin) {
      setRole(value);
      setOpenIsAdmin(false);
    } else if (openGender) {
      setGender(value);
      setOpenGender(false);
    } else if (openActive) {
      setActive(value);
      setOpenActive(false);
    }
  };

  const handleChangeImage = (e) => {
    let forNameOfFile = `${Date.now()}_${e.target.files[0].name}`;
    setFileName(forNameOfFile);
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], forNameOfFile);
    setFile(formData);
  };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    setFileForDelete(user.img.slice(29));
    setFileName(null);
    setFile(null);
  };

  const handleDeleteInputFile = (e) => {
    e.preventDefault();
    setFileName(null);
    setFile(null);
    const file = document.getElementById('file');
    file.value = '';
  };

  const handleClick = async(e) => {
    e.preventDefault();
    let newUser;
    if (file !== null) {
      if (user.img) {
        imageDelete(user.img.slice(29));
      }
      imageUpload(file);
      newUser = { ...user, gender: gender, active: active === 'Yes' ? true : false, 
          isAdmin: role === 'Admin' ? true : false, img: `http://alexegorova.ru/images/${fileName}` }
    } else if (fileForDelete !== null) {
      imageDelete(fileForDelete);
      newUser = { ...user, gender: gender, active: active === 'Yes' ? true : false, isAdmin: role === 'Admin' ? true : false, img: null }
    } else {
      newUser = { ...user, gender: gender, active: active === 'Yes' ? true : false, isAdmin: role === 'Admin' ? true : false }
    }
    delete newUser.password;
    setUser(newUser);
    setFileName(null);
    updateUser(userId, newUser, dispatch);
    getUsers(dispatch);
    navigate('/users');
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <div className="userTitle">User edit</div>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";
              }}
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.fullname}</span>
              <span className="userShowUserTitle">{user?.occupation}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.username} - {user?.isAdmin ? "Admin" : "User"}</span>
            </div>

            <div className="userShowInfo">
              <span>Joined</span>
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{format(user?.createdAt)}</span>
            </div>
            <div className="userShowInfo">
              <span>Seen</span>
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{format(user?.updatedAt)}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <form className="userUpdateForm" onSubmit={handleClick}>
            <div className="userUpdateUpload">
              <img className="userUpdateImg" src={user?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                // onError={({ currentTarget }) => {
                //   currentTarget.onerror = null; // prevents looping
                //   currentTarget.src = "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";
                // }}
              />
              <div className="userImageUpdate">
                <label htmlFor="file" className="userImageLabel">
                  <Publish className="userUpdateIcon" />
                </label>
                <input 
                  type="file"
                  id="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleChangeImage}
                />

                {user.img ? <button className="userImageBtn" onClick={handleDeleteImage} id="" type="button">
                  <DeleteOutline className="userUpdateIcon"/>
                </button>
                : <button className="userImageBtn" onClick={handleDeleteInputFile} id="resetbtn" type="button">
                  <HighlightOffIcon className="userUpdateIcon"/>
                </button>}
                <div>{fileName}</div>
              </div>
            </div>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Nickname"
                  className="userUpdateInput"
                  value={user?.username}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  name="fullname"
                  type="text"
                  placeholder="User full name"
                  className="userUpdateInput"
                  value={user?.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="userSelectItem">
                <label>birthday</label>
                <CalendarPicker
                  selectedDate={user?.birthday || ""} 
                  setSelectedDate={v => setUser({ ...user, birthday: v })}
                /> 
              </div>
              <div className="userSelectItem">
                <label>Gender</label>
                <Select 
                  options={optionsForGender}
                  selected={gender || ""}
                  onChange={handleIsAdminSelectChange}
                  open={openGender}
                  setOpen={setOpenGender}
                />
              </div>
              <div className="userUpdateItem">
                <label>Occupation</label>
                <input
                  name="occupation"
                  type="text"
                  placeholder="occupation"
                  className="userUpdateInput"
                  value={user?.occupation}
                  onChange={handleChange}
                />
              </div>
              <div className="userSelectItem">
                <label>Role</label>
                <Select 
                  options={optionsIsAdmin}
                  selected={role || ""}
                  onChange={handleIsAdminSelectChange}
                  open={openIsAdmin}
                  setOpen={setOpenIsAdmin}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="user@gmail.com"
                  className="userUpdateInput"
                  value={user?.email}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  name="phone"
                  type="text"
                  placeholder="+1 999 999 99 99"
                  className="userUpdateInput"
                  value={user?.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  name="address"
                  type="text"
                  placeholder="user addres"
                  className="userUpdateInput"
                  value={user?.address}
                  onChange={handleChange}
                />
              </div>
              <div className="userSelectItem">
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
            <button type="submit" className="userUpdateButton">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}