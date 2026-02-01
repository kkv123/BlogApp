import { useEffect ,useState} from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
    const [loader, setLoader] = useState(true);
    const navigation = useNavigate();
    const authStatus = useSelector((state) => state.auth.isAuthenticated)
    useEffect(() => {
        if (authentication && authStatus != authentication) {
            navigation('/login')
        } else if (!authentication && authStatus != authentication) {
            navigation('/')
        }
        setLoader(false);
    }, []);
    return (
        loader ? <h1>Loading...</h1> : <>{children}</>
    )
}