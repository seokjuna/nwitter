import { addDoc, collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const q = query(collection(dbService, "nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            };
            setNweets((prev) => [nweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getNweets();
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                nweet,
                createdAt: Date.now(),
            });
            console.log("Document written with ID: ", docRef);
        } catch (error) {
            console.log("Error adding document: ", error);
        }
        setNweet("");
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNweet(value);
    };
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    value={nweet}
                    placeholder="What's on your mind?"
                    onChange={onChange}
                    maxLength={120}
                />
                <input 
                    type="submit"
                    value="Nweet"
                />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;