import React, { useContext, useEffect, useState } from "react";
import Loader from "../shared/Loader";
import Swal from "sweetalert2";
import Helmet from "../shared/Helmet";
import { Authcontext } from "../Provider/AuthProvider";
import MyToysCard from "./MyToysCard";

const MyToys = () => {
  const [toys, settoys] = useState([]);

  const [loading, setloading] = useState(true);
  const { user } = useContext(Authcontext);

  useEffect(() => {
    fetch(` https://toyserver-iota.vercel.app/query?email=${user?.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setloading(false);
          settoys(data);
        }
      });
  }, []);

  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(` https://toyserver-iota.vercel.app/toys/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            const remaininigtoys = toys.filter((toy) => toy._id !== id);
            settoys(remaininigtoys);
          });
      }
    });
  };

  const sortinghandler = (value) => {
    if (value === "ascending") {
      const filterdata = toys.slice().sort((a, b) => a.price - b.price);
      settoys(filterdata);
    } else if (value === "descending") {
      const filterdata = toys.slice().sort((a, b) => b.price - a.price);
      settoys(filterdata);
    } else {
      settoys(products);
    }
  };

  return (
    <>
      <Helmet title="My toys" />
      <div className="container">
        <h1 className="text-2xl font-bold text-center py-10">All Toys</h1>
        <div className="pb-5 w-[200px]">
          <div className="form-control">
            <label className="font-bold py-2 capitalize">Order by price</label>
            <select
              className="input input-bordered "
              onChange={(e) => sortinghandler(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="ascending">Ascending</option>
              <option value="descending">descending</option>
            </select>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Seller</th>
                  <th>Toyname</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {toys.length === 0 && (
                  <tr>
                    <td colSpan="6">
                      <h1 className="font-bold capitalize text-center py-5 text-2xl">
                        no toys found
                      </h1>
                    </td>
                  </tr>
                )}
                {toys.map((toy) => (
                  <MyToysCard
                    toy={toy}
                    key={toy._id}
                    handledelete={handledelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyToys;
