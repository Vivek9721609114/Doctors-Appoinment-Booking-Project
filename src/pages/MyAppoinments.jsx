import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import { AppContext } from "../context/AppContext";
import Modal from "../Modal";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
const MyAppoinments = () => {
  const [modal, setModal] = useState(false);
  const { doctors } = useContext(AppContext);

  const [totalAmount, setTotalAmount] = useState(0);

  const Shipping = parseInt(100);

  const grandToatal = Shipping + totalAmount;

  // payment Intigration

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const OngetPay = async () => {
    setModal(true);
    // if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
    //   return toast.error("All fields are required", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    // }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString({
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    var options = {
      key: "rzp_test_8qV1WhfU8MDfsP",
      key_secret: "S6UCrOLHFLnDAQhhDgAIqx5g",
      amount: parseInt(grandToatal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "Book Appoinment With Trusted Doctors",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response);
        toast.success("Payment Successful");
      },

      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
    // console.log(pay);
  };

  return (
    <>
      {modal && (
        <Modal>
          <div className={styles.paymodal}>
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.top}>
                  <div></div>
                  <div onClick={() => setModal(false)} className={styles.close}>
                    <IoCloseSharp />
                  </div>
                </div>
                <div className={styles.bottom}>
                  <span>Enter Full Name :</span>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                  />
                  <span>Enter Full Address :</span>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    type="text"
                  />
                  <span>Enter Pin Code :</span>
                  <input
                    onChange={(e) => setPincode(e.target.value)}
                    value={pincode}
                    type="text"
                  />
                  <span>Enter Mobile Number :</span>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    type="text"
                  />
                  <button className={styles.btn1}>Pay Now</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div>
        <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
          My Appoinments
        </p>
        <div>
          {doctors.slice(0, 3).map((item, index) => (
            <div
              className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img className="w-32 bg-indigo-50" src={item.image} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.name}</p>
                <p>{item.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.address.line1}</p>
                <p className="text-xs">{item.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  25, July, 2024 | 8:30 PM
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                <button
                  onClick={OngetPay}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                  Cancel appoinment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAppoinments;
