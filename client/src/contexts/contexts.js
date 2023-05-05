let contexts={};

contexts.logged = false;
contexts.neto=0;
contexts.ingresos=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
contexts.egresos=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
contexts.reset=false;

console.log(contexts)

import { createContext, useState } from 'react';

export const context = createContext();


const contexts = () => {
  return (

 <App/>
  )
}
export default contexts