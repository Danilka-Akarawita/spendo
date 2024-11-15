"use client";
import React, { useEffect } from "react";

interface Params {
  params: {
    id: number;
  };
}
function Expenses({ params }: Params)  {
  const { id } = params; 
  
  return (
    <div>
      <h1>Expense ID: {id}</h1>
    </div>
  );
}

export default Expenses;
