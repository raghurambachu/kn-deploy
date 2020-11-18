import React from "react";
import { ImArrowLeft2 } from "react-icons/im";
import { FaTimes } from "react-icons/fa";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext } from "react";
import AppContext from "../context/AppContext";
var randomize = require("randomatic");

// function hitBackend() {
//   axios.get("/test").then((res) => console.log(res.data));
// }

function handleFormValidation() {
  return Yup.object({
    message: Yup.string()
      .matches(/OTP-[0-9]{6}/, "Does'nt contain the 6 digit OTP")
      .required("Required"),
  });
}

function SendMessage(props) {
  const context = useContext(AppContext);

  function handleSubmit(values, actions) {
    axios
      .post("/send", { user: props.user, message: values.message })
      .then((res) => {
        if (res?.data?.status === "successful") {
          let sentMessages = localStorage.sentMessages
            ? JSON.parse(localStorage.sentMessages)
            : [];

          sentMessages = [
            {
              message: res.data.message,
              ...res.data.user,
              date: res.data.date,
            },
            ...sentMessages,
          ];
          localStorage.setItem("sentMessages", JSON.stringify(sentMessages));
          context.setSentMessages(sentMessages);
          context.setNotification(
            `Successfully sent message to ${res.data.user.firstName}`
          );
          context.setActivePage("sent-messages");
        } else {
          props.dispatch({ type: "OPEN_CONTACT_LIST" });
          context.setNotification(res.data.msg);
        }
      })
      .catch((err) => {
        context.setNotification(err);
      });
  }

  return (
    <div className="max-w-sm  px-4 py-8 my-4 rounded mx-auto shadow-md bg-gray-100 relative flex flex-col items-center">
      <div
        onClick={() =>
          props.dispatch({
            type: "OPEN_CONTACT_INFO",
            payload: { user: props.user },
          })
        }
        className="absolute left-0 top-0 w-12 h-12 rounded-full flex justify-center items-center m-2 bg-gray-300 cursor-pointer"
      >
        <ImArrowLeft2 />
      </div>
      <div
        onClick={() =>
          props.dispatch({
            type: "OPEN_CONTACT_LIST",
          })
        }
        className="absolute right-0 top-0 w-12 h-12 rounded-full flex justify-center items-center m-2 bg-gray-300 cursor-pointer"
      >
        <FaTimes />
      </div>
      <h3 className="mt-8 mb-4">Message to be sent</h3>
      <Formik
        initialValues={{
          message: `Hi ${props.user.firstName}, your 6 digit OTP-${randomize(
            "0123456789",
            6
          )}. `,
        }}
        validationSchema={handleFormValidation}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <textarea
              name="message"
              id="message"
              value="Something your OTP is 123456"
              className="block w-64 my-4 resize-none p-4"
              {...formik.getFieldProps("message")}
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <small className="block">{formik.errors.message}</small>
            ) : null}
            <button
              type="submit"
              className="my-4 p-2 px-6 bg-green-500 rounded-sm text-green-100 hover:bg-green-400 transition duration ease-in-out"
            >
              {formik.isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SendMessage;
