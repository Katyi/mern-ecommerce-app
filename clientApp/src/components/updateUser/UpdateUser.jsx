import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Publish, DeleteOutline } from "@mui/icons-material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { updateUser, getUser } from '../../redux/apiCalls';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import InputMask from 'react-input-mask';
import Select from '../../UI/select/Select';
import DateInput from '../../UI/DateInput/DateInput';
import Xmark from '../../assets/circle-xmark-solid.svg';
import { handleValidation } from "./handleValidation";
import {Container, Title, UserForm, UserImage, CloseModalIcon, UserItem, UserImageBtn } from './styled';
import { imageUpload, imageDelete } from '../../services/imageUpload';

const UpdateUser = ({openModal, setOpenModal}) => {
  const dispatch = useDispatch();
  let currentUser = useSelector((state) => state.user.currentUser);
  let userId = useSelector((state) => state.user.currentUser._id);
  
  const [gender, setGender] = useState(currentUser?.gender);
  const [file, setFile] = useState(null);
  const [fileForDelete, setFileForDelete] = useState(null);
  const [fileName, setFileName] = useState(null);
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    let newUser;
    if (handleValidation(user, setErrors)) {
      if (file !== null) {
        if (user.img) {
          imageDelete(user.img.slice(29));
        }
        imageUpload(file);
        newUser = { ...user, gender: gender, img: `http://alexegorova.ru/images/${fileName}` };
      } else if (fileForDelete !== null) {
        imageDelete(fileForDelete);
        newUser = { ...user, gender: gender, img: null };
      } else {
        newUser = { ...user, gender: gender };
      }
      delete newUser.password;
      setUser(newUser);
      await updateUser(userId, newUser, dispatch);
      await getUser(userId, dispatch);
      setOpenModal(false);
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
          <img src={user?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";
            }}
          />
          <label htmlFor="file"><Publish/></label>
          <input type="file" id="file" style={{ display: "none" }} accept="image/*" onChange={handleChangeImage}/>

          {user.img ? <UserImageBtn className="userImageBtn" onClick={handleDeleteImage} id="" type="button">
            <DeleteOutline className="userUpdateIcon"/>
          </UserImageBtn>
          : <UserImageBtn className="userImageBtn" onClick={handleDeleteInputFile} id="resetbtn" type="button">
            <HighlightOffIcon className="userUpdateIcon"/>
          </UserImageBtn>}
          <div>{fileName}</div>
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