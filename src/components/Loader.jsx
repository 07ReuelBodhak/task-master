import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
