import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import { Authcontext } from "../components/Provider/AuthProvider";
import { toast } from "react-hot-toast";
import Loader from "../components/shared/Loader";
import Helmet from "../components/shared/Helmet";

function Signup() {
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [email, setmail] = useState("");
  const [loading, setloading] = useState(false);
  const [file, setfile] = useState(null);

  const { createUser, gogleloggedin } = useContext(Authcontext);

  const navigate = useNavigate();

  const googleloginhandeler = () => {
    gogleloggedin()
      .then((result) => {
        if (result.user) {
          navigate("/");
        }
      })
      .then((err) => console.log(err));
  };
  const singup = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const usercredintial = await createUser(email, password);
      const user = usercredintial.user;
      const storageref = ref(storage, `images/${Date.now() + name}`);
      const uploadTask = uploadBytesResumable(storageref, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // update user profile
            await updateProfile(user, {
              displayName: name,
              photoURL: downloadURL,
            });
          });
        }
      );
      setloading(false);
      toast.success("account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error("something is wrong");
    }
  };

  return (
    <div className="container px-6 mx-auto">
      <Helmet title="Register" />
      {!loading ? (
        <div className="flex items-center justify-center flex-col my-10">
          <h1 className="text-[#0a1d37] font-bold capitalize mb-4 text-xl">
            Signup
          </h1>
          <form
            onSubmit={singup}
            className={`bg-gray-600 px-6 pt-8 pb-5 rounded-md  w-full md:w-[40%] flex items-center justify-center flex-col`}
          >
            <label className="text-white font-semibold py-3 w-full pl-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter your name"
              className="px-3 py-2 rounded-md border border-gray-300 outline-none mb-4 w-full text-sm"
            />
            <label className="text-white font-semibold py-1 w-full pl-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setmail(e.target.value)}
              placeholder="Enter your email"
              className="px-3 py-2 rounded-md border border-gray-300 outline-none mb-4 w-full text-sm"
            />
            <label className="text-white font-semibold py-1 w-full pl-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
              className="px-3 py-2 rounded-md border border-gray-300 outline-none mb-4 w-full text-sm"
            />
            <label className="text-white font-semibold pt-1 w-full pl-1">
              Photo Url
            </label>
            <input
              type="file"
              required
              placeholder="your photo link"
              onChange={(e) => setfile(e.target.files[0])}
              className="my-2 text-gray-300 text-xs font-medium w-full"
            />
            <button
              type="submit"
              className={`text-[#0a1d37] bg-white rounded-md px-4 py-2  mx-auto text-center cursor-pointer capitalize font-semibold mt-4 text-sm w-full`}
            >
              create an account
            </button>
            <div className="divider text-white">OR</div>
            <div className="text-align-center">
              <span onClick={googleloginhandeler}>
                {" "}
                <FcGoogle size={24} />
              </span>
            </div>
            <p className="text-xs text-gray-100 mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Signup;
