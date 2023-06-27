import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineMenu } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import userlogo from "../../assets/user-icon.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Authcontext } from "../Provider/AuthProvider";
import { toast } from "react-hot-toast";

function Header() {
  const [active, setactive] = useState("");
  const [toggle, settoggle] = useState(false);
  const navigation = useNavigate();
  const { user, singout } = useContext(Authcontext);
  const [Toggle, setToggle] = useState(false);

  const navitems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      <li>
        <Link to="/alltoys">All Toys</Link>
      </li>
      {user && (
        <>
          <li>
            <Link to="/addtoys">Add Toys</Link>
          </li>
          <li>
            <Link to="/mytoys">My Toys</Link>
          </li>
        </>
      )}
    </>
  );

  const logout = () => {
    singout()
      .then(() => {
        setToggle(false);
        toast.success("logout successfully");
        navigation("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <header className="border-b border-b-gray-200 w-full">
      <div className="container">
        <div className="flex justify-between items-center py-5">
          <div className="flex space-x-2">
            <Link className="text-3xl font-bold font-heading" to="/">
              Toysmart
            </Link>
          </div>
          <div>
            <ul
              className={` ${
                toggle
                  ? "flex  fixed top-0 right-0 w-48 bg-slate-100 h-full flex-col justify-center items-center z-50 gap-2"
                  : "md:flex items-center hidden space-x-5"
              }`}
            >
              {navitems}
              <span
                className="md:hidden absolute top-3 right-[155px]"
                onClick={() => settoggle(false)}
              >
                <GrFormClose size={23} color="white" />
              </span>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              {!user ? (
                <Link to="/login">
                  <button className="bg-gray-700 text-white px-4 py-2 rounded-md ">
                    Login
                  </button>
                </Link>
              ) : (
                <>
                  <div className="tooltip" data-tip={user.displayName}>
                    <img
                      onClick={() => setToggle(!Toggle)}
                      src={user && user.photoURL ? user.photoURL : userlogo}
                      alt="user-logo"
                      className="w-6 h-6 rounded-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </>
              )}
              {Toggle ? (
                <div className="bg-[#fdefe6] px-4 py-2 rounded-sm absolute top-11 text-sm font-semibold -left-5 md:left-0 z-50">
                  {user ? (
                    <div className="flex flex-col gap-1">
                      <span onClick={logout}>Logout</span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 text-sm">
                      <Link to="/signup">
                        <span onClick={() => setToggle(false)}>Signup</span>
                      </Link>
                      <Link to="/login">
                        <span onClick={() => setToggle(false)}>Login</span>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <span className=" md:hidden block" onClick={() => settoggle(true)}>
              <AiOutlineMenu size={22} color="#0a1d37" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
