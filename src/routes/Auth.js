import React, { useState } from "react";
import { authService } from "../fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
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
            if (newAccount) {
                // create account
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                // login
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
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
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Contiune with Github</button>
            </div>
        </div>
    );
};

export default Auth;