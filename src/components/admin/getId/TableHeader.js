"use client";

import React from "react";

const TableHeader = ({ headers }) => {
  return (
    <thead>
      <tr className="font-bold">
        {headers.map((header, index) => (
          <td key={index} className="p-3">{header}</td>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
