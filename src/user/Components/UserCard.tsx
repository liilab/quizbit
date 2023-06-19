import React from "react";
import { UserInfo } from "../../shared/Types";
import Logo from "../../assets/images/profile.png";
import "./UserCard.scss";

export default function UserCard(userInfo: UserInfo) {
  const { name, email, occupation, avatar } = userInfo;

  return (
    <>
      <div className="w-full max-w-sm rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 my-5 rounded-full shadow-lg"
            src={Logo}
            alt={name}
          />
          <h5 className="mb-1 text-xl font-medium text-white">{name}</h5>
          <span className="text-sm text-gray-400">{occupation}</span>

          <div className="flex flex-row mt-4 space-x-2">
            <a
              href={"mailto:" + email}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </a>
            <h1 className="inline-flex items-center text-sm font-medium text-center text-white  rounded-lg  focus:ring-4 focus:outline-none">{email}</h1>
          </div>

          <div className="flex mt-4 space-x-3 md:mt-6">
            <p className="primary-button">
              Add friend
            </p>
            <p className="inline-flex items-center px-4 py-2 text-sm font-medium text-center border rounded-lg focus:ring-4 focus:outline-none bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-700 focus:ring-gray-700">
              Knock
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
