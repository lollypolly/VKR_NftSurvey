import React, {useState} from "react";
import {useSelector} from "react-redux";
import PollsWithTokenContainer from "./PollsWithTokenContainer";


function PollsWithToken() {
    const [isClickedPolls,setIsClickedPolls] = useState(true)

    const store:any = useSelector((state: any) => state.PollsData.polls);

    return (
        <div style={{overflow:"auto",height:"auto"}}>
           <PollsWithTokenContainer />
        </div>
    )
}

export default PollsWithToken
