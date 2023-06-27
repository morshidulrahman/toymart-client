import React, { useEffect, useState } from "react";
import Loader from "../shared/Loader";
import AllToysCard from "./AllToysCard";
import Helmet from "../shared/Helmet";

const AllToys = () => {
  const [toys, settoys] = useState([]);
  const [loading, setloading] = useState(true);
  const [search, setsearch] = useState("");

  useEffect(() => {
    fetch("https://toyserver-iota.vercel.app/toys")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setloading(false);
        }
        settoys(data);
      });
  }, []);

  useEffect(() => {
    if (search) {
      const filteredToys = toys.filter((toy) =>
        toy.name.toLowerCase().includes(search.toLowerCase())
      );
      settoys(filteredToys);
    }
  }, [search]);

  return (
    <>
      <Helmet title="All toys" />
      <div className="container">
        <h1 className="text-2xl font-bold text-center py-10">All Toys</h1>
        <div className="pb-5 w-[200px]">
          <input
            type="text"
            placeholder="search toys"
            onChange={(e) => setsearch(e.target.value)}
            className="py-2 px-2 rounded-md w-full border outline-none border-gray-400"
          />
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
                  <th>View</th>
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
                  <AllToysCard toy={toy} key={toy._id} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AllToys;
