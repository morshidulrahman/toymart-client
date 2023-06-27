import React, { useEffect, useState } from "react";

import ProjectType from "./ProjectType";
import ShopCard from "./ShopCard";
import { types } from "../../data/Data";
import Loader from "../shared/Loader";

function Shop() {
  const [selectedtype, setselectedtype] = useState("All");
  const [menu, setmenu] = useState([]);
  const [items, setitems] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetch("https://toyserver-iota.vercel.app/toys")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setloading(false);
        }
        setmenu(data);
        setitems(data);
      });
  }, []);

  const filtermenu = (type) => {
    if (type === "All") return setmenu(items);
    const menus = items.filter((cure) => {
      return cure.category === type;
    });
    setmenu(menus);
    console.log(menus);
  };
  const selectedtypes = (type) => {
    setselectedtype(type);
    filtermenu(type);
  };

  return (
    <div className="container py-10 ">
      <h1 className="text-center capitalize font-bold text-3xl">
        shop by category
      </h1>
      {/* ==========projectType==========  */}
      <ProjectType
        types={types}
        selectedtype={selectedtype}
        selectedtypes={selectedtypes}
      />
      {/* shop card */}
      {loading ? <Loader /> : <ShopCard menu={menu} />}
    </div>
  );
}

export default Shop;
