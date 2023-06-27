import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

import Helmet from "../components/shared/Helmet";

const UpdateToys = () => {
  const data = useLoaderData();
  const { name, price, quantity, description, rating, category, _id } =
    data || {};
  const [Ucategory, setcategory] = useState(category);

  const navigate = useNavigate();

  const handlesubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.toysname.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const description = form.description.value;
    const rating = form.rating.value;

    const toysdata = {
      price,
      name,
      category: Ucategory,
      quantity,
      description,
      rating,
    };

    fetch(`https://toyserver-iota.vercel.app/toys/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(toysdata),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("toys data updated was successfully");

          navigate("/mytoys");
        }
      });
  };
  return (
    <div className="container mx-auto mt-8">
      <Helmet title="Updated toy" />
      <h1 className="text-2xl font-bold mb-4">Updated Toy</h1>
      <form onSubmit={handlesubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Toys Name</span>
            </label>
            <input
              defaultValue={name}
              type="text"
              placeholder="toys name"
              name="toysname"
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="input input-bordered "
              value={Ucategory}
              onChange={(e) => setcategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="Language">Language</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              required
              defaultValue={price}
              placeholder="price"
              name="price"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <input
              type="number"
              required
              defaultValue={rating}
              placeholder="rating"
              name="rating"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity</span>
            </label>
            <input
              type="number"
              required
              defaultValue={quantity}
              placeholder="quantity"
              name="quantity"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              required
              defaultValue={description}
              placeholder="description"
              name="description"
              className="input input-bordered"
            />
          </div>
        </div>
        <button
          className="btn btn-block my-5 bg-[#FF3811] text-white"
          type="submit"
        >
          Updated toys
        </button>
      </form>
    </div>
  );
};

export default UpdateToys;
