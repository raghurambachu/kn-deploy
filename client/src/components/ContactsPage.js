import React, { useReducer, useEffect } from "react";

import ContactInfo from "./ContactInfo";
import ContactList from "./ContactList";
import SendMessage from "./SendMessage";

const initialState = {
  user: null,
  activeTab: "contact-list",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER": {
      const { user, activeTab } = action.payload;
      return { ...state, user, activeTab };
    }
    case "OPEN_CONTACT_LIST": {
      return { ...state, user: null, activeTab: "contact-list" };
    }
    case "OPEN_SEND_MESSAGE": {
      // SendMessage is a component
      const { user } = action.payload;
      return { ...state, user, activeTab: "send-message" };
    }
    case "OPEN_CONTACT_INFO": {
      const { user } = action.payload;
      return { ...state, user, activeTab: "contact-info" };
    }
    default:
      return state;
  }
}

function getActiveTabComponent(activeTab, info, dispatch) {
  switch (activeTab) {
    case "contact-list": {
      const contacts = info;
      return <ContactList dispatch={dispatch} contacts={contacts} />;
    }
    case "contact-info": {
      const user = info;
      return <ContactInfo dispatch={dispatch} user={user} />;
    }
    case "send-message": {
      const user = info;
      return <SendMessage dispatch={dispatch} user={user} />;
    }
    default: {
      const contacts = info;
      return <ContactList contacts={contacts} />;
    }
  }
}

function ContactsPage(props) {
  const { contacts } = props;

  useEffect(() => {
    props.setNotification("");
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  let info = contacts;
  if (state.activeTab === "contact-list") info = contacts;
  else if (state.activeTab === "contact-info") info = state.user;
  else if (state.activeTab === "send-message") info = state.user;

  return (
    <div className="text-center text-gray-700">
      <h3 className="text-xl mt-2">
        {state.activeTab
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")}
      </h3>
      {getActiveTabComponent(state.activeTab, info, dispatch)}
    </div>
  );
}

export default ContactsPage;
