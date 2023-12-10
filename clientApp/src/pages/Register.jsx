import styled from "styled-components";
import backGroundphoto from "../img/backGroundphoto.png";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";
import app from "../firebase";
// import backGroundphoto from "../img/category_photo_1.jpg";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: contain;
  background: linear-gradient(
    rgba(255, 255, 255, 0.4),
    rgba(255,255,255, 0.4)
    ),
    url('${backGroundphoto}') center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({background:"rgba(180,130,238,0.4)"})}
`;

const Wrapper = styled.div`
  width: 40vw;
  padding: 20px;
  background-color: white;
  ${mobile({width:"75%"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;

`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  &[name='username']::placeholder, &[name='email']::placeholder,
  &[name='password']::placeholder, &[name='confirm password']::placeholder {
  opacity: 0.6;
  color: red;
}
`;

const Select = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;

`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Link = styled.a`
  margin: 10px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const ImgDiv = styled.div`
  min-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const NewUserImg = styled.input`
  border: none !important;
`;

const Label = styled.label`
  font-weight: 700;
`;

const Error = styled.span`
  margin-top: 10px;
  color: red;
  font-size: 12px;
  width: 100%;
`;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { isFetching, currentUser, error } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(null);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user?.password !== confirmPassword) {
      setErr('Password mismatch!');
      return;
    } else {
      setErr(null)
    }

    if (file !== null) {
      let fileName = new Date().getTime() + file.name;
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
            const newUser = {...user, fullname: name.concat(" ").concat(lastname), img: downloadURL};
            register(dispatch, newUser);
          });
          
        }
      );
    } else {
      const newUser = {...user, fullname: name.concat(" ").concat(lastname)};
      register(dispatch, newUser);
    }
  };

  // useEffect(() => {
  //   setErr(null);
  // },[]);

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
        <ImgDiv>
          <Label>Image</Label>
          <NewUserImg 
            // className="newUserImg"
            type="file" 
            id="file" 
            onChange={(e) => setFile(e.target.files[0])}
          />
        </ImgDiv>
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
          />
          <Input
            placeholder="confirm password*"
            name="confirm password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
