import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.currentUser);

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("persist:root");
    navigate('/');
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin panel</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          {/* <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          <div className="topbarIconContainer">
            {/* <Settings /> */}
            <div className="username">User: {user?.username}</div>
          </div> 
          <img src={user?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} 
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";
            }} 
            className="topAvatar" />
          
          <button onClick={handleOut} className="outBtn">LogOut</button>
        </div>
      </div>
    </div>
  );
}
