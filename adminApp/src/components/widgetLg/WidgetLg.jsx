import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import {format} from "timeago.js"
import { getUsers } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function WidgetLg() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user?.users);
  const [orders, setOrders] = useState([]);

  const getUserNamefromOrder = (userId) => {
    return users?.find(elem => elem._id === userId)?.username;
  };
  
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders/?new=true");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  useEffect(() => {
    getUsers(dispatch);
  },[dispatch])


  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        </thead>
        <tbody>
          {orders?.map((order)=> (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">
                  {getUserNamefromOrder(order.userId)}
                </span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}