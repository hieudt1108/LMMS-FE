import React from "react";

export default function ErrorHandler({ error, number }) {
  return (
    <span
      className={` ms-${number} text-danger `}
    >
      ({error})
    </span>
  );
}
