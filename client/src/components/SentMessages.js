import React, { useEffect } from "react";
import SentMessageItem from "./SentMessageItem";

function SentMessages(props) {
  const { sentMessages } = props;
  useEffect(() => {
    props.setNotification("");
  }, []);
  return (
    <div className="max-w-sm  px-4 py-8 my-4 rounded mx-auto border-2  bg-gray-200 relative flex flex-col items-center">
      <ul>
        {sentMessages?.map((sentMessage) => (
          <SentMessageItem sentMessage={sentMessage} key={sentMessage.date} />
        ))}
      </ul>
    </div>
  );
}

export default SentMessages;
