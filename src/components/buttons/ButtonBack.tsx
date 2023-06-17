import React from "react";

function ButtonBack ({buttonInner,func,defaultClass}:any) {
    return (
        <button
            className={defaultClass}
            onClick={func}
        >
            <span>{buttonInner}</span>
        </button>
    )
}

export default ButtonBack;
