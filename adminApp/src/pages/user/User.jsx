import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import "./user.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { format } from "timeago.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateUser } from "../../redux/apiCalls";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  let currentUser = useSelector((state) =>
    state.user.users.find((user) => user?._id === userId)
  );
  // const currentUser = useSelector((state) => state.user.currentUser);

  const [user, setUser] = useState(currentUser);
  const [file, setFile] = useState(null);
  const [active, setActive] = useState(user.active);
  const [gender, setGender] = useState(user.gender);
  const [role, setRole] = useState(user.isAdmin);

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleActiveSelectChange = (e) => {
    setActive(e.target.value);
  };

  const handleGenderSelectChange = (e) => {
    setGender(e.target.value);
  };

  const handleIsAdminSelectChange = (e) => {
    setRole(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    let fileName = user.img;
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
            let newUser = { ...user, gender: gender, active: active, isAdmin: role, img: downloadURL };
            setUser(newUser);
            updateUser(userId, newUser, dispatch);
          });
        }
      );
    } else {
      let newUser = { ...user, gender: gender, active: active, isAdmin: role }
      setUser(newUser);
      updateUser(userId, newUser, dispatch);
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User edit</h1>
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
              <span className="userShowUsername">{user.fullname}</span>
              <span className="userShowUserTitle">{user.occupation}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username} - {user.isAdmin ? "Admin" : "User"}</span>
            </div>

            <div className="userShowInfo">
              <span>Joined</span>
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{format(user.createdAt)}</span>
            </div>
            <div className="userShowInfo">
              <span>Seen</span>
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{format(user.updatedAt)}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">

          <form className="userUpdateForm" onSubmit={handleClick}>
            <div className="userUpdateUpload">
              <img className="userUpdateImg" src={user?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";
                }}
              />
              <label htmlFor="file">
                <Publish className="userUpdateIcon" />
              </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Nickname"
                  className="userUpdateInput"
                  value={user.username}
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
                  value={user.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Occupation</label>
                <input
                  name="occupation"
                  type="text"
                  placeholder="occupation"
                  className="userUpdateInput"
                  value={user.occupation}
                  onChange={handleChange}
                />
              </div>
              <div className="userSelectItem">
                <label>Role</label>
                <select className="newUserSelect" value={role} onChange={handleIsAdminSelectChange}>
                  <option value={true}>Admin</option>
                  <option value={false}>User</option>
                </select>
              </div>
              <div className="userSelectItem">
                <label>Gender</label>
                <select className="newUserSelect" value={gender} onChange={handleGenderSelectChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="user@gmail.com"
                  className="userUpdateInput"
                  value={user.email}
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
                  value={user.phone}
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
                  value={user.address}
                  onChange={handleChange}
                />
              </div>
              <div className="userSelectItem">
                <label>Active</label>
                <select className="newUserSelect" value={active} onChange={handleActiveSelectChange}>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>
            <button type="submit" className="userUpdateButton">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}
