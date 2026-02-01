import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";


export default function LogOutButton() {
    const Dispatch = useDispatch();

    const handleLogout = () => {
        authService.logout().then(() => {
            Dispatch(logout());
        });
    }

    return <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}>Logout</button>;
}