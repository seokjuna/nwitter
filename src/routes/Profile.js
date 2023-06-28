import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";

const Profile = ({ userObj }) => {
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
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    onChange={onChange}
                    placeholder="Display name"
                    value={newDisplayName || ""}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>
                Log Out
            </button>
        </>
    )
}

export default Profile;