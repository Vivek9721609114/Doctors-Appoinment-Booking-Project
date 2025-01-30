import React, { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import Modal from "../Modal";
import { IoMdClose } from "react-icons/io";
import styles from "./index.module.css";
import axios from "axios";
import toast from "react-hot-toast";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [modal, setModal] = useState(false);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [date, setDate] = useState("");
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(true); // To track if slots are loading

  const fetchDocInfo = async () => {
    const docData = doctors.find((doc) => doc._id === docId);
    dispatch({
      type: "DOCTOR",
      payload: {
        ...state,
        doctorname: docData?.name,
        department: docData?.speciality,
      },
    });
    setDocInfo(docData);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    setLoadingSlots(true);

    let today = new Date();
    let allSlots = [];
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      allSlots.push(timeSlots);
    }
    setDocSlots(allSlots);
    setLoadingSlots(false);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  const onOpenModal = () => {
    setModal(true);
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "DATA":
        return {
          ...state,
          ...action.payload,
        };
      case "DOCTOR":
        return {
          ...state,
          ...action.payload,
        };
      case "TIME":
        return {
          ...state,
          ...action.payload,
        };
      case "DATE":
        return {
          ...state,
          ...action.payload,
        };
      case "UPLOAD_IMAGE":
        return;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    patientname: "",
    department: docInfo?.speciality,
    doctorname: docInfo?.name,
    email: "",
    age: "",
    phone: "",
    gender: "Male",
    bio: "",
    profileImage: "",
    date: date,
    time: slotTime,
    status: "pending",
  });

  const onHandleChange = (e) => {
    dispatch({
      type: "DATA",
      payload: {
        ...state,
        [e.target.id]: e.target.value,
      },
    });
  };

  console.log(state);

  const onSaveData = (event) => {
    event.preventDefault();

    const config = {
      url: "https://doctors-appointment-data-default-rtdb.firebaseio.com/book.json",
      method: "post",
      data: state,
    };

    axios(config)
      .then((res) => {
        toast.success("Apponitment booked successfully");
      })
      .catch((err) => {
        console.log(err);
      });
    setModal(false);
  };

  const onSelectDay = (ind, it) => {
    const date = new Date(it[ind].dateTime);

    const newDate = `${
      date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
    }-${
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }-${date.getFullYear()}`;

    setDate(newDate);

    dispatch({
      type: "DATE",
      payload: { date: newDate },
    });

    setSlotIndex(ind);
  };

  const onSelectTime = (item) => {
    setSlotTime(item.time);
    dispatch({
      type: "TIME",
      payload: { time: item.time },
    });
  };

  return (
    docInfo && (
      <div>
        {modal && (
          <>
            <div>
              <Modal>
                <div className={styles.modalopen}>
                  <div className={styles.modal_header}>
                    <h4 className={styles.modal_header_left}>
                      Book an Appointment
                    </h4>
                    <div className={styles.header_right}>
                      <IoMdClose onClick={() => setModal(false)} size={25} />
                    </div>
                  </div>
                  <div className={styles.modal_body}>
                    <form onSubmit={onSaveData}>
                      <div className={styles.body_content}>
                        <div className={styles.input_full}>
                          <div>Patient Name *</div>
                          <input
                            required
                            onChange={onHandleChange}
                            type="text"
                            id="patientname"
                            placeholder="Patient Name :"
                          />
                          {state.patientname.length < 3
                            ? " ! Please Enter the correct name"
                            : ""}
                        </div>
                        <div className={styles.mid_box}>
                          <div className={styles.input_mid}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "10px",
                              }}
                            >
                              <div>Departments *</div>
                              <div>
                                <input
                                  type="text"
                                  value={docInfo?.speciality}
                                  id="department"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "10px",
                              }}
                            >
                              <div>Doctor Name *</div>
                              <div>
                                <input
                                  // onChange={onHandleChange}
                                  required
                                  type="text"
                                  id="doctorname"
                                  value={docInfo?.name}
                                  placeholder="Doctor Name :"
                                  readOnly
                                />
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "10px",
                              }}
                            >
                              <div>Your Email *</div>
                              <div>
                                <input
                                  onChange={onHandleChange}
                                  type="email"
                                  required
                                  id="email"
                                  placeholder="Email :"
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "10px",
                              }}
                            >
                              <div>Age *</div>
                              <div>
                                <input
                                  onChange={onHandleChange}
                                  type="number"
                                  required
                                  id="age"
                                  placeholder="Age :"
                                />
                                {state.age.length > 2
                                  ? " ! Please Enter the correct age"
                                  : ""}
                              </div>
                            </div>
                          </div>
                          <div className={styles.input_mid}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "10px",
                              }}
                            >
                              <div>Your Phone *</div>
                              <div>
                                <input
                                  onChange={onHandleChange}
                                  type="number"
                                  id="phone"
                                  placeholder="Phone :"
                                  required
                                />
                                {state.phone.length > 0 &&
                                  state.phone.length !== 10 && (
                                    <p>
                                      Please Enter A valid Phone Number (10
                                      Digits)
                                    </p>
                                  )}
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "10px",
                              }}
                            >
                              <div>Date :</div>
                              <div>
                                <input
                                  // onChange={onHandleChange}
                                  type="text"
                                  id="date"
                                  placeholder="dd-mm-yyyy :"
                                  required
                                  value={date}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "10px",
                              }}
                            >
                              <div>Gender *</div>
                              <div>
                                <select
                                  name=""
                                  id="gender"
                                  style={{ color: "#212529" }}
                                  onChange={onHandleChange}
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: "10px",
                              }}
                            >
                              <div>Time :</div>
                              <div>
                                <input
                                  // onChange={onHandleChange}
                                  type="text"
                                  id="time"
                                  placeholder="Time :"
                                  readOnly
                                  value={slotTime}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.input_top}>
                          <div style={{ marginBottom: "0.5rem" }}>
                            Comments *
                          </div>
                          <input
                            type="text"
                            id="bio"
                            placeholder="Bio here :"
                            onChange={onHandleChange}
                          />
                        </div>

                        <div className={styles.btn}>
                          <input
                            style={{ background: "#5F6FFF", color: "#fff" }}
                            type="submit"
                            value="Book An Apponitment"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Modal>
            </div>
          </>
        )}
        {/* ---Doctors Details------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt="Doctor"
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-end gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} = {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience} Years
              </button>
            </div>

            {/* -----Doctor About------ */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ---Booking Slots--- */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {loadingSlots ? (
              <p>Loading available slots...</p>
            ) : (
              docSlots.map((item, index) => (
                <div
                  onClick={() => onSelectDay(index, item)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{daysOfWeek[item[0]?.dateTime.getDay()]}</p>
                  <p>{item[0]?.dateTime.getDate()}</p>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {loadingSlots ? (
              <p>Loading available slots...</p>
            ) : (
              docSlots[slotIndex]?.map((item, index) => (
                <p
                  onClick={() => onSelectTime(item)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))
            )}
          </div>
          <button
            onClick={onOpenModal}
            disabled={!slotTime}
            className={`bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 ${
              !slotTime ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Book an Appointment
          </button>
        </div>

        {/* --Listing Related Doctors-- */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
