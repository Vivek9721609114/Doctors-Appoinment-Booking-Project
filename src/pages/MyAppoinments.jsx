import React, { useContext, useState } from "react";
import styles from "./index.module.css";
import { AppContext } from "../context/AppContext";
import Modal from "../Modal";
import { IoCloseSharp } from "react-icons/io5";
import PaygateWay from "../components/PaygateWay";
const MyAppoinments = () => {
  const [modal, setModal] = useState(false);
  const { doctors } = useContext(AppContext);
  const OngetPay = () => {
    setModal(true);
  };
  const OnHandleDelete = () => {
    alert("Hlo");
  };
  return (
    <>
      {modal && (
        <Modal>
          <PaygateWay></PaygateWay>
        </Modal>
      )}
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
                  <span htmlFor="">Enter Full Name :</span>
                  <input type="text" />
                  <span htmlFor="">Enter Full Address :</span>
                  <input type="text" />
                  <span htmlFor="">Enter Pin Code :</span>
                  <input type="text" />
                  <span htmlFor="">Enter Mobile Number :</span>
                  <input type="text" />

                  <button className={styles.btn1}>Pay</button>
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
                <button
                  onClick={OnHandleDelete}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
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
