import React from "react";

function SentMessageItem(props) {
  const { firstName, lastName, message, date } = props?.sentMessage;
  const getDate = new Date(date);
  return (
    <li className="contact-list-item  shadow-md bg-gray-100 w-full my-2  p-2 py-4 cursor-pointer  hover:shadow-lg ">
      <div className="flex items-center my-3 space-x-4">
        <div className="w-3/12">
          <div className="rounded-full bg-gray-300 w-20 h-20 flex justify-center items-center font-semibold shadow-md">
            {firstName[0].toUpperCase(0) + lastName[0].toUpperCase()}
          </div>
        </div>
        <div className="w-9/12">
          <h3 className="name text-xl font-normal">{`${firstName}  ${lastName} `}</h3>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      <h4 className="text-sm text-center">
        Sent on: {getDate.toLocaleString()}{" "}
      </h4>
    </li>
  );
}

export default SentMessageItem;
