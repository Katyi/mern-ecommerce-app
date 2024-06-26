import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await userRequest.get("users/?new=true");
      setUsers(res.data);
    } catch {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user)=>(
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img 
                || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";
              }}
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}