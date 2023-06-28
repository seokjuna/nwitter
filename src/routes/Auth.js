import React from "react";
import { authService } from "../fbase";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google
                    <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                    Contiune with Github
                    <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
};

export default Auth;