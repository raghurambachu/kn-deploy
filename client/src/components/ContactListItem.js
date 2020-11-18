import React from "react";

function ContactListItem(props) {
  const { firstName, lastName } = props.contactItem;
  return (
    <li
      onClick={() =>
        props.dispatch({
          type: "SET_USER",
          payload: { activeTab: "contact-info", user: props.contactItem },
        })
      }
      className="contact-list-item flex items-center my-3 space-x-4 shadow-md p-2 cursor-pointer hover:shadow-lg "
    >
      <div className="rounded-full bg-gray-300 w-20 h-20 flex justify-center items-center font-semibold shadow-md">
        {firstName[0].toUpperCase(0) + lastName[0].toUpperCase()}
      </div>
      <h3 className="name text-xl font-normal">{`${firstName}  ${lastName} `}</h3>
    </li>
  );
}

export default ContactListItem;
