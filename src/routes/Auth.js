import React, { useState } from "react";
import { authService } from "../fbase";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;

        if(name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } 
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if(newAccount) {
                // create account
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                // login
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    };
    const onSocialClick = async (e) => {
        const {
            target: { name }
        } = e;
        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider();
        } else if(name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    };
    
    return (
        <div onSubmit={onSubmit}>
            <form>
                <input 
                    name="email" 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    required
                    onChange={onChange}
                />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    required
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Contiune with Github</button>
            </div>
        </div>
    );
};

export default Auth;