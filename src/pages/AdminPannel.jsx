import React, { useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminPannel = () => {
  const navigate = useNavigate();
  const reducer = (state, action) => {
    switch (action.type) {
      case "DATA":
        return {
          ...state,
          ...action.payload,
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    fullname: "",
    email: "",
    password: "",
  });

  const onHandleChange = (e) => {
    dispatch({
      type: "DATA",
      payload: { ...state, [e.target.id]: e.target.value },
    });
  };
  console.log(state);

  const onSaveData = (e) => {
    e.preventDefault();
    const config = {
      url: "https://doctors-appointment-data-default-rtdb.firebaseio.com/user.json",
      method: "post",
      data: { ...state, role: "user" },
    };

    axios(config)
      .then((res) => {
        toast.success("Account Created");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Admin Pannel</p>

        <div className="w-full">
          <p>Full Name</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={onHandleChange}
            id="fullname"
            type="text"
            required
          />
        </div>

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={onHandleChange}
            id="email"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            onChange={onHandleChange}
            id="password"
            type="paasword"
            required
          />
        </div>
        <button
          onClick={onSaveData}
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Create User
        </button>
      </div>
    </form>
  );
};

export default AdminPannel;
