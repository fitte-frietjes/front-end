import axios from "axios"
import { useState, useEffect } from "react"

const ProfileWelcomeMsg = () => {

    const [profile, setProfile] = useState([]);

    const getProfile = () => {
        axios.get(process.env.REACT_APP_API_URL + "/profile/1")
            .then(res => {
                setProfile(res.data);
            })
            .catch(error => {
                console.warn(error);
            });
    }

    useEffect(() => {
        getProfile()
    }, []);

    return (
        <h1>
            Welcome "{profile.account? profile.account.name:'nope'}"
        </h1>
    );
}

export default ProfileWelcomeMsg