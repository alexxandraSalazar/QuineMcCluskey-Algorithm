import React from "react";

const Button = ({ className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-slate-950 hover:bg-gray-300 text-white rounded-full transition ${className}`}
      {...props}
    />
  );
};

export { Button };