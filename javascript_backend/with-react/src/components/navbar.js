import {React} from "react";

const Navbar=({props})=>{
    return(
        <div>
            <h1>{props.logoText}</h1>

        </div>
    )
}
export default Navbar;

// we can pass data to components iusing props , like here logoText is passed to navbar component from app.js   