import React from "react";

function ButtonCreatePoll ({buttonInner,func}:any) {
    return (
        <button
            className="button-create-poll"
            onClick={func}
        >
            <span>{buttonInner}</span>
        </button>
    )
}

export default ButtonCreatePoll;
