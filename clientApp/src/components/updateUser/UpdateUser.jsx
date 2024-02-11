import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Publish } from "@mui/icons-material";
import { updateUser, getUser } from '../../redux/apiCalls';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import InputMask from 'react-input-mask';
import Select from '../../UI/select/Select';
import DateInput from '../../UI/DateInput/DateInput';
import Xmark from '../../assets/circle-xmark-solid.svg';
import { handleValidation } from "./handleValidation";
import {Container, Title, UserForm, UserImage, CloseModalIcon, UserItem } from './styled';

const UpdateUser = ({openModal, setOpenModal}) => {
  const dispatch = useDispatch();
  let currentUser = useSelector((state) => state.user.currentUser);
  let userId = useSelector((state) => state.user.currentUser._id);
  
  const [gender, setGender] = useState(currentUser?.gender);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(currentUser);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const options  = [
    { value: 'Female'},
    { value: 'Male'},
  ];
  
  const handleChange = (e) => {
    setUser({ ...user, [e.target?.name]: e.target?.value });
  };

  const handleGenderSelectChange = (value) => {
    setGender(value);
    setOpen(false);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    let fileName = user.img;
    if (handleValidation(user, setErrors)) {
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
              let newUser = { ...user, gender: gender, img: downloadURL };
              setUser(newUser);
              updateUser(userId, newUser, dispatch);
              getUser(userId, dispatch);
              console.log(newUser)
              setOpenModal(false);
            });
          }
        );
      } else {
        let newUser = { ...user, gender: gender };
        setUser(newUser);
        await updateUser(userId, newUser, dispatch);
        await getUser(userId, dispatch);
        console.log(newUser)
        setOpenModal(false);
      }
    }
  };

  return (
    <Container>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <Title>{user?.username}'s account:</Title>
        <CloseModalIcon onClick={() => setOpenModal(false)}>
          <img src={Xmark} alt="Xmark" />
        </CloseModalIcon>
      </div>
      <UserForm onSubmit={handleSubmit}>
        {/* USER IMAGE PART */}
        <UserImage>
          <img src={user?.img}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";
            }}
          />
          <label htmlFor="file"><Publish/></label>
          <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
        </UserImage>
        {/* USER OTHER INFO */}
        <UserItem>
          <label>Username*</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={user?.username}
            onChange={handleChange}
          />
          <span className="error">{errors.username}</span>
        </UserItem>
        <UserItem>
          <label>Fullname*</label>
          <input 
            name="fullname" 
            type="text" 
            placeholder="Fullname" 
            value={user?.fullname} 
            onChange={handleChange}
          />
          <span>{errors.fullname}</span>
        </UserItem>
        <UserItem>
          <label>Gender</label>
          <Select
            options={options}
            selected={gender || ""}
            onChange={handleGenderSelectChange}
            open={open}
            setOpen={setOpen}
          />
        </UserItem>
        <UserItem>
          <label>birthday</label>
          <DateInput 
            selectedDate={user?.birthday || ""} 
            setSelectedDate={v => setUser({ ...user, birthday: v })}
          />
          <span className="error">{errors.birthday}</span>
        </UserItem>
        <UserItem>
          <label>Occupation</label>
          <input 
            name="occupation"
            type="text" 
            placeholder="Occupation" 
            value={user?.occupation} 
            onChange={handleChange}
          />
        </UserItem>
        <UserItem>
          <label>Phone</label>
          <InputMask
            name="phone"
            className="inputMask" 
            mask='+9 999 999-999-99' 
            maskChar="" 
            placeholder='Phone'	
            value={user?.phone || ""} 
            onChange={handleChange}
          />
          <span className="error">{errors.phone}</span>
        </UserItem>
        <UserItem>
          <label>Email*</label>
          <input
            name="email"
            type="text" 
            placeholder="Email" 
            value={user?.email} 
            onChange={handleChange}
          />
          <span>{errors.email}</span>
        </UserItem>
        <UserItem>
          <label>Address</label>
          <input 
            name="address"
            type="text" 
            placeholder="Address" 
            value={user?.address} 
            onChange={handleChange}
          />
        </UserItem>
        <UserItem style={{marginTop: "22px"}}>
          <button type="submit">UPDATE</button>
        </UserItem>
      </UserForm>
      <span>* - required</span>
    </Container>
  )
}

export default UpdateUser;