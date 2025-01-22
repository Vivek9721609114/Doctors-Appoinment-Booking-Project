import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [submit, setSubmit] = useState("Login");
  const [allUser, setAllUser] = useState([]);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://doctors-appointment-data-default-rtdb.firebaseio.com/user.json"
      )
      .then((res) => {
        const newData = [];

        for (const ind in res.data) {
          newData.push(res.data[ind]);
        }
        setAllUser(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const isExistingUser = allUser.find(
      (it) => it.email === email && it.password === password
    );
    console.log(allUser);

    if (isExistingUser) {
      const { password, ...restData } = isExistingUser;
      localStorage.setItem("userDet", JSON.stringify(restData));
      toast.success("Login Successfully");
      navigate("/");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {submit === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {submit === "Sign Up" ? "sign up" : "login"} to book appoinment
        </p>
        {submit === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="paasword"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          {submit === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {submit === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setSubmit("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span
              onClick={() => navigate("/create-user")}
              className="text-primary underline cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
