import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AllToysCard = ({ toy }) => {
  const navigate = useNavigate();
  const navigationhandeler = (id) => {
    if (!user) {
      toast.error("You have to log in first to view details");
    } else {
      navigate(`/toys/${id}`);
    }
  };

  const { name, price, quantity, category, _id, sellername } = toy;

  return (
    <tr>
      <th>{sellername}</th>
      <td>{name}</td>
      <td>{category}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <th>
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => navigationhandeler(_id)}
        >
          View
        </button>
      </th>
    </tr>
  );
};

export default AllToysCard;
