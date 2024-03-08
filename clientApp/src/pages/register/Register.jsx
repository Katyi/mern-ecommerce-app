import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { register } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Publish } from "@mui/icons-material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Container, Wrapper, Title, Form, Input, Select, Agreement, Button, Link, ImgDiv, NewUserImg, Label, Error, UserImage, UserImageBtn } from './styled';
import { imageUpload } from '../../services/imageUpload';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { isFetching, currentUser, error } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [err, setErr] = useState(null);

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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let newUser;
    if (user?.password !== confirmPassword) {
      setErr('Password mismatch!');
      return;
    } else {
      setErr(null)
    }

    if (file !== null) {
      imageUpload(file);
      newUser = {...user, fullname: name.concat(" ").concat(lastname), img: `http://alexegorova.ru/images/${fileName}` };            
    } else {
      newUser = {...user, fullname: name.concat(" ").concat(lastname)};
    }
    register(dispatch, newUser);
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  },[navigate, currentUser]);

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <UserImage>
            <img src={user?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";
              }}
            />  
            {/* <ImgDiv> */}
              {/* <Label>Image</Label> */}
              <label htmlFor="file1" className="userImageLabel">
                <Publish className="userUpdateIcon" />
              </label>
              <NewUserImg 
                // className="newUserImg"
                type="file" 
                id="file1"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChangeImage}
              />
              <UserImageBtn className="userImageBtn" onClick={handleDeleteImage} id="resetbtn" type="button">
                <HighlightOffIcon className="userUpdateIcon"/>
              </UserImageBtn>
              <div>{fileName}</div>
            {/* </ImgDiv> */}
          </UserImage>
        {/* <InputWrapper> */}
          {/* <Label>name</Label> */}
          <Input 
            placeholder="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        {/* </InputWrapper> */}
          <Input 
            placeholder="last name"
            onChange={(e) => setLastname(e.target.value)}
          />
          <Input 
            placeholder="username*" 
            name='username'
            onChange={(e) => setUser({...user, username: e.target.value})}
          />
          <Select className="newUserSelect" name="active" id="active" onChange={(e)=>setUser({...user, gender: e.target.value})}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>

          <Input 
            placeholder="email*" 
            name="email"
            onChange={(e) => setUser({...user, email: e.target.value})}
          />
          <Input 
            placeholder="phone" 
            onChange={(e) => setUser({...user, phone: e.target.value})}
          />
          <Input 
            placeholder="address" 
            onChange={(e) => setUser({...user, address: e.target.value})}
          />
          <Input 
            placeholder="occupation" 
            onChange={(e) => setUser({...user, occupation: e.target.value})}
          />
          <Input 
            placeholder="password*" 
            name="password"
            type="password"
            onChange={(e) => setUser({...user, password: e.target.value})}
            autoComplete="off"
          />
          <Input
            placeholder="confirm password*"
            name="confirm password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="off"
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b><br/>
            <b style={{color: "red"}}>* - required field</b>
          </Agreement>
          <Button>CREATE</Button>
          <div style={{height:"12px", width:"100%", marginTop:"3px"}}>
            {!err && error && <Error>{error}</Error>}
            {err && <Error>{err}</Error>}
          </div>
        </Form>
        <br/>
        <Link onClick={()=>navigate("/")}>SIGN IN IF YOU ALREADY HAVE AN ACCOUNT</Link>
      </Wrapper>
    </Container>
  )
}

export default Register;