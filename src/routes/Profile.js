import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";

const Profile = ( props ) => {
    const { refreshUser, userObj } = props;
    const [newDisplayName, setDisplayName] = useState(userObj.newDisplayName);
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const getMyNweets = async () => {
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            console.log(document.id, "=>", document.data());
        });
    };
    useEffect(() => {
        getMyNweets();
    }, []);
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setDisplayName(value);
    };
    const onSubmit = async (e) => {
        const auth = getAuth();
        e.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(auth.currentUser, { displayName: newDisplayName });
        };
        refreshUser();
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    type="text"
                    onChange={onChange}
                    placeholder="Display name"
                    value={newDisplayName || ""}
                    className="formInput"
                />
                <input 
                    type="submit" 
                    value="Update Profile"
                    className="formBtn" 
                    style={{
                        marginTop: 10
                    }}    
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
}

export default Profile;