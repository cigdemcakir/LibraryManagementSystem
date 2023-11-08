import {Container, Menu, Image, Icon, Button} from "semantic-ui-react";
import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {BooksContext, AppUserContext} from "../context/StateContext.tsx";


const NavBar = () => {

    const { appUser, setAppUser } = useContext(AppUserContext);

    const navigate = useNavigate();


    const handleLogout = () => {

        localStorage.removeItem("library_user");

        setAppUser(undefined);

        navigate("/login");

    }

    return (
        <Menu fixed='top' inverted style={{height:'50px'}}>
            <Container >
                <Menu.Item as='a' header>
                    Library Management System
                </Menu.Item>
                <Menu.Item as={NavLink} to="/">Home</Menu.Item>
                <Menu.Item as={NavLink} to="/about">About</Menu.Item>
                {!appUser && <Menu.Item as={NavLink} to="/login" position="right"><Icon name="sign-in" /> Login</Menu.Item>}
                {appUser && <Menu.Item as={Button} onClick={handleLogout} position="right"><Icon name="sign-out"/> Logout</Menu.Item>}
            </Container>
        </Menu>
    );
}

export default  NavBar;