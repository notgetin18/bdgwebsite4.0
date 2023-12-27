import { selectUser } from "@/redux/userDetailsSlice";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import React, { FC, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import BankVerification from "./addedBanksOrUPI";
import { CSSTransition } from 'react-transition-group';
import AddNewBank from "./addNewBank";

interface PayoutOptionTabProps {
  onCompleteKYC: () => void;
}

const PayoutOptionTab: FC<PayoutOptionTabProps> = ({ onCompleteKYC }) => {
  const user = useSelector(selectUser);
  const [toggleBankVerification, setToggleBankVerification] = useState(false);

  const toggleBankVerificationHandler = () => {
    setToggleBankVerification((prevToggle) => !prevToggle);
  }

  return (
    <Fragment>
      {user.data.isKycDone ? (
        <div className={`text-white coins_backgroun m-2 rounded ${toggleBankVerification ? 'open' : ''}`}>
          <div onClick={toggleBankVerificationHandler} className="coins_background m-3 p-2 flex justify-between rounded-md cursor-pointer">
            <div className="text-3xl">ADD BANK</div>
            <div onClick={toggleBankVerificationHandler}>
              {toggleBankVerification ? (
                <ArrowDownIcon
                  className="h-8 w-8"
                  aria-hidden="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBankVerificationHandler();
                  }}
                />
              ) : (
                <ArrowUpIcon
                  className="h-8 w-8"
                  aria-hidden="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBankVerificationHandler();
                  }}
                />
              )}
            </div>
          </div>
          <CSSTransition
            in={toggleBankVerification}
            timeout={500}
            classNames="bank-verification"
            unmountOnExit
          >
            <div>
              <AddNewBank toggleBankVerificationHandler={toggleBankVerificationHandler} />
            </div>
          </CSSTransition>
          <BankVerification toggled={toggleBankVerification} />
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
