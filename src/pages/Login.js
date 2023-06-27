import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Authcontext } from "../components/Provider/AuthProvider";
import { toast } from "react-hot-toast";
import Helmet from "../components/shared/Helmet";

function Login() {
  const [password, setpassword] = useState("");
  const [email, setmail] = useState("");
  const [loading, setloading] = useState(false);
  const { signin, gogleloggedin } = useContext(Authcontext);
  const navigate = useNavigate();
  const singin = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      await signin(email, password);
      setloading(false);
      toast.success("login successfully");
      navigate("/");
    } catch (error) {
      setloading(false);
      toast.error(error.message);
    }
  };

  const googleloginhandeler = () => {
    gogleloggedin()
      .then((result) => {
        if (result.user) {
          navigate("/");
        }
      })
      .then((err) => toast.error(err.message));
  };

  return (
    <div className="container px-6 mx-auto">
      <Helmet title="Login" />
      <div className="flex items-center justify-center flex-col my-10">
        <h1 className="text-[#0a1d37] font-bold capitalize mb-4 text-xl">
          login
        </h1>
        <form
          onSubmit={singin}
          className={`bg-gray-600 px-6 pt-8 pb-5 rounded-md  w-full md:w-[40%] flex items-center justify-center flex-col`}
        >
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
          <button
            type="submit"
            className={`text-[#0a1d37] bg-white rounded-md px-4 py-2  mx-auto text-center cursor-pointer capitalize font-semibold mt-2 w-full`}
          >
            login
          </button>
          <div className="divider text-white">OR</div>
          <div className="text-align-center">
            <span onClick={googleloginhandeler}>
              {" "}
              <FcGoogle size={24} />
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-gray-300 font-medium">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
