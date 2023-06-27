import React from "react";
import { Link } from "react-router-dom";

const MyToysCard = ({ toy, handledelete }) => {
  const { name, price, quantity, category, _id, sellername } = toy;

  return (
    <tr>
      <th>{sellername}</th>
      <td>{name}</td>
      <td>{category}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <th>
        <Link to={`/updatedtoys/${_id}`}>
          <button className="btn btn-warning btn-xs">Update</button>
        </Link>
      </th>
      <th>
        <button
          className="btn btn-xs btn-error"
          onClick={() => handledelete(_id)}
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

export default MyToysCard;
