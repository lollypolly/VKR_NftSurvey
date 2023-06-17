import React from "react";
import {publicRoutes} from "./allRoutes";
import {Route, Routes} from "react-router-dom";

const IndexRoute = () => {
    return (
        <>
            <Routes>
                {publicRoutes.map((route,idx)=>(
                    <Route
                        path={route.path}
                        element={<route.component/>}
                        key={idx}
                    />
                ))}
            </Routes>
        </>
    )
}

export default IndexRoute
