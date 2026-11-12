import {b}from './module.js';       //named export
console.log(b);

import obj from './module.js';       // default export   // can be named anything instead of obj
console.log(obj);
const x=require('./module.js');      // common js export
console.log(x);