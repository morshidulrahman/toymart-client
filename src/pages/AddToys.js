import { useContext, useState } from "react";
import Helmet from "../components/shared/Helmet";
import { Authcontext } from "../components/Provider/AuthProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddToys = () => {
  const [category, setcategory] = useState("");
  const { user } = useContext(Authcontext);

  const navigate = useNavigate();

  const handlesubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const sellername = form.selername.value;
    const picture = form.url.value;
    const name = form.toysname.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const description = form.description.value;
    const rating = form.rating.value;

    const toysdata = {
      email,
      sellername,
      price,
      picture,
      name,
      category,
      quantity,
      description,
      rating,
    };

    fetch("https://toyserver-iota.vercel.app/toys", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(toysdata),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("toys data was successfully inserted");
          form.reset();
          setcategory("");
          navigate("/");
        }
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <Helmet title="Add toy" />
      <h1 className="text-2xl font-bold mb-4">Add A Toy</h1>
      <form onSubmit={handlesubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Seller Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              name="email"
              readOnly
              defaultValue={user?.email}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Seller Name</span>
            </label>
            <input
              type="text"
              placeholder="seler name"
              name="selername"
              readOnly
              defaultValue={user?.displayName}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo url</span>
            </label>
            <input
              type="text"
              placeholder="photo url"
              name="url"
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Toys Name</span>
            </label>
            <input
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
              value={category}
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
          Add toys
        </button>
      </form>
    </div>
  );
};

export default AddToys;
