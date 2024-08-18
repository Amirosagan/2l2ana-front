import React from "react";

const ErrorMessageComponent = ({ errorMessage }) => {
  return errorMessage ? <div className="text-red-500">{errorMessage}</div> : null;
};

export default ErrorMessageComponent;
