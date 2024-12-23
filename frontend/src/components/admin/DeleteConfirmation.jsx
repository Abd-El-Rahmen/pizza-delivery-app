import React from "react";

const DeleteConfirmation = ({ Item, setOpen,handleConfirmation }) => {

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20 ">
      <div className="bg-white w-2/3 md:w-2/5 relative flex flex-col overflow-y-auto h-[200px] md:h-[150px]  items-center gap-8 rounded-lg shadow-lg p-10 z-30 \">
        <h2>
          Are you sure you want to delete{" "}
          <span className="text-lg text-red-400">{Item?.name || Item?.userName}</span>
        </h2>
        <div className="absolute right-5 bottom-5">
          <button
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            onClick={() => handleConfirmation(Item)}
          >
            Yes
          </button>
          <button
            className="  py-1 px-3 rounded hover:text-red-600"
            onClick={() => setOpen(null)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
