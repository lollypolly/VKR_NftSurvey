import React from "react";
import {useNavigate} from "react-router";
import Button500 from "./buttons/Button500";

function NoPage() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/')
    }
    return(
        <div style={{backgroundColor: "red", height: "100vh", fontSize:"70px", textAlign: "center"}}>
            Page Not Found
            <Button500 defaultClass="button-500" buttonInner="Return" func={goBack}/>
        </div>
    )
}

export default NoPage;
