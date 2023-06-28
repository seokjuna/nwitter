import React from "react";
import { HashRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
    
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ? (
                <>
                <Route exact path="/" element={<Home userObj={userObj} />} />
                <Route exact path="/profile" element={<Profile userObj={userObj} />} />
                </> 
                ) : ( 
                <Route exact path="/" element={<Auth />} /> 
                )}
            </Routes>
        </Router>
    );
}

export default AppRouter;