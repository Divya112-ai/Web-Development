import React from "react";  
import { useContext } from "react";
const Component1 = () => {
  const count = useContext(counterContext);
  return (
   
        <>
            {count};
            </>
    )}

export default Component1;

