import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { register } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { Container, Wrapper, Title, Form, Input, Select, Agreement, Button, Link, ImgDiv, NewUserImg, Label, Error } from './styled';

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