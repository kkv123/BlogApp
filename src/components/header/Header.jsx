import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import Container from "../../container/Container";
import LogOutButton from "./LogoutBtn";

export default function Header() {

    const authStatus = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const navItems = [
        { name: "Home", path: "/", isActive: true },
        // { name: "About", path: "/about", isActive: authStatus },
        { name: "Login", path: "/login", isActive: !authStatus },
        { name: "SignUp", path: "/signup", isActive: !authStatus },
        { name: "All Post", path: "/all-post", isActive: authStatus },
        { name: "Add Post", path: "/add-post", isActive: authStatus }

    ];
    console.log("Auth status in Header component:", authStatus);
    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) =>
                            item.isActive ? <li key={item.name}>
                                <button
                                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                    onClick={() => navigate(item.path)}>
                                    {item.name}
                                </button>
                            </li> : null
                        )}
                    </ul>
                    {authStatus && (
                        <li>
                            <LogOutButton />
                        </li>
                    )}
                </nav>
            </Container>
        </header>
    )
}