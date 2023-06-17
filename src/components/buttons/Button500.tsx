import React from "react";

function Button500 ({buttonInner,func,defaultClass}:any) {
    return (
        <button
            className={defaultClass}
            onClick={func}
        >
            <span>{buttonInner}</span>
        </button>
    )
}

export default Button500;
