import React from "react";
import ContactListItem from "./ContactListItem";

function ContactList(props) {
  const { contacts, dispatch } = props;
  return (
    <div className="max-w-sm bg-gray-100 p-4 rounded mx-auto border-2">
      <ul>
        {contacts?.map((contactItem) => (
          <ContactListItem
            dispatch={dispatch}
            key={contactItem.id}
            contactItem={contactItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
