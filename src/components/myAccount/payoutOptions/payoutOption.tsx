import { selectUser } from "@/redux/userDetailsSlice";
import React, { FC, Fragment } from "react";
import { useSelector } from "react-redux";
interface PayoutOptionTabProps {
  onCompleteKYC: () => void;
}

const PayoutOptionTab: FC<PayoutOptionTabProps> = ({ onCompleteKYC }) => {
  const user = useSelector(selectUser);

  return (
    <Fragment>
      {user.data.isKycDone ? (
        <div>
          {/* Content when KYC is done */}
        </div>
      ) : (
        <div className="w-full h-auto coins_background rounded flex flex-col items-center justify-center">
          <p className="text-white text-center text-xl">Please Complete Your KYC First</p>

          <button
            onClick={onCompleteKYC}
            className="border-2 border-yellow-400 rounded px-2 py-2 mt-4 mb-4">
            <div className="text-yellow-400">
              Complete KYC
            </div>
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default PayoutOptionTab;
