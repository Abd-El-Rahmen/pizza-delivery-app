import { BookmarkCheck } from "lucide-react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { setFalseSuccess } from "../../store/reducers/orderSlice";
import Loading from "../../components/common/Loading";
import { useSelector } from "react-redux";

const SuccessPayment = () => {
  const { isLoading, successPayment } = useSelector(
    (state) => state.orderSlice
  );
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  return (
    <div className="w-full flex justify-center py-14">
      {successPayment ? (
        <div className="max-w-5xl bg-gray-30 p-10 flex flex-col items-center gap-5 ">
          <h2 className="font-bold text-2xl md:text-4xl ">
            Payment Successful
          </h2>
          <BookmarkCheck size={120} />
          <p className="text-gray-400 font-semibold">
            Your payment has been completed
          </p>
          <button
            onClick={() => {
              navigate("/");
              setFalseSuccess();
            }}
            className="w-2/3 rounded-lg py-3 bg-red-400 text-white"
          >
            Finish
          </button>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </div>
  );
};

export default SuccessPayment;
