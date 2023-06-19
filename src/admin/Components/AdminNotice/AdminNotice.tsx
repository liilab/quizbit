import React from "react";
import "./AdminNotice.scss";

export default function AdminNotice() {
  return (
    <>
      <a
        href="#"
        className="block-style"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Quizbit
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </a>
    </>
  );
}
