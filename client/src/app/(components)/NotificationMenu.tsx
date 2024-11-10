import React from "react";

type NotificationMenuProps = {
  hideNotif: boolean;
  setHideNotif: (hideNotif: boolean) => void;
};

const NotificationMenu = ({
  hideNotif,
  setHideNotif,
}: NotificationMenuProps) => {
  const handleOnClick = () => {
    setHideNotif(true);
  };

  if (hideNotif) {
    return <></>;
  } else {
    return (
      <div className="bg-slate-200 shadow-lg rounded-md px-4 py-2">
        <div className="w-full flex justify-end">
          <button
            onClick={handleOnClick}
            className="bg-red-400 rounded-full w-6 h-6"
          >
            X
          </button>
        </div>
        <div className="mt-4 bg-white rounded-md">
          <p className="mx-2 text-lg">John is requesting to connect</p>
        </div>
        <div>
          <ul className="mx-2 list-disc list-inside">
            <li>EECS3101</li>
            <li>Wed 4:20 PM</li>
          </ul>
        </div>
        <div className="bg-white rounded-md">
          <p className="mx-2 text-lg">Meet at Scott Libr</p>
        </div>
        <div className="flex mt-4 space-x-2 mb-6">
          <button
            onClick={handleOnClick}
            className="bg-green-200 hover:bg-green-300 px-1 rounded-md"
          >
            Accept
          </button>
          <button
            onClick={handleOnClick}
            className="bg-red-200 hover:bg-red-300 px-1 rounded-md"
          >
            Deny
          </button>
        </div>
      </div>
    );
  }
};

export default NotificationMenu;
