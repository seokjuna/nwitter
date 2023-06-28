import React from "react";
import { HashRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            {isLoggedIn ? (
                <div style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Routes>
                        <>
                            <Route exact path="/" element={<Home userObj={userObj} />} />
                            <Route exact path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />   
                        </>
                    </Routes>
                </div>
            ) : (
                <Routes>
                    <Route exact path="/" element={<Auth />} /> 
                </Routes>
            )}
        </Router>
    );
}

export default AppRouter;