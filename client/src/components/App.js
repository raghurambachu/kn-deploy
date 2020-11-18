import React, { useEffect, useState } from "react";
import AppContext from "../context/AppContext";

import ContactsPage from "./ContactsPage";
import SentMessages from "./SentMessages";

function App() {
  const [contacts, setContacts] = useState([]);
  const [activePage, setActivePage] = useState("contacts");
  const [notification, setNotification] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  useEffect(() => {
    setContacts(getContacts());
    if (localStorage.sentMessages) {
      setSentMessages(JSON.parse(localStorage.sentMessages));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ setNotification, setActivePage, setSentMessages }}
    >
      <div className="min-h-screen bg-gray-200 pt-16">
        <div className="flex justify-center pt-4 space-x-8 text-lg">
          <button
            className={`${
              activePage === "contacts"
                ? "bg-blue-400 hover:bg-blue-500 focus:outline-none px-3 rounded shadow-md py-2 text-blue-100"
                : "focus:outline-none"
            }`}
            onClick={() => setActivePage("contacts")}
          >
            Contacts
          </button>
          <button
            className={`${
              activePage === "sent-messages"
                ? "bg-blue-400 hover:bg-blue-500 focus:outline-none px-3 rounded shadow-md py-2 text-blue-100"
                : "focus:outline-none"
            }`}
            onClick={() => setActivePage("sent-messages")}
          >
            Messages Sent
          </button>
        </div>
        {/* className="card max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-md p-4 " */}

        <div className="max-h-80">
          {activePage === "contacts" ? (
            <ContactsPage
              setNotification={setNotification}
              contacts={contacts}
            />
          ) : (
            <SentMessages
              setNotification={setNotification}
              sentMessages={sentMessages}
            />
          )}
        </div>
        {notification && (
          <small className="text-gray-800 block my-4 text-center">
            {notification}
          </small>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;

function getContacts() {
  return [
    {
      firstName: "Raghuram",
      lastName: "Bachu",
      id: 10001,
      mobile: "7021425912",
    },
    {
      firstName: "Radha",
      lastName: "Bachu",
      id: 10002,
      mobile: "9869483038",
    },
    {
      firstName: "Jayaram",
      lastName: "Ganapathy",
      id: 10003,
      mobile: "7021425912",
    },
    {
      firstName: "Sudhanshu",
      lastName: "Shekar",
      id: 10004,
      mobile: "7021425912",
    },
  ];
}
