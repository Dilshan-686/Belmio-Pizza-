import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

function OauthSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setToken, setUser } = useContext(StoreContext);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const name = params.get("name");
        const email = params.get("email");
        const image = decodeURIComponent(params.get("profileImage"));
        const isAdmin = params.get("isAdmin") === "true";

        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("profileImage", image);
            localStorage.setItem("isAdmin", isAdmin);

            setToken(token);
            setUser({ name, email, profileImage: image, isAdmin });

            navigate("/");
        }
    }, [location.search, setToken, setUser, navigate]);

    return <div>Logging in...</div>;
}

export default OauthSuccess;
