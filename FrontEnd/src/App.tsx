import './styles/App.css'
import NavBar from './components/NavBar.tsx';
import {ToastContainer} from 'react-toastify';
import {Container} from "semantic-ui-react";
import {Route, Routes} from "react-router-dom";
import BooksPage from "./pages/BooksPage.tsx";
import BookPage from "./pages/BookPage.tsx";
import {useEffect, useState} from "react";
import {BookGetAllDto} from "./types/BookTypes.ts";
import {LocalJwt, LocalUser} from "./types/AuthTypes.ts";
import LoginPage from "./pages/LoginPage.tsx";
import {getClaimsFromJwt} from "./utils/jwtHelper.ts";
import {useNavigate} from "react-router-dom";
import {AppUserContext, BooksContext} from "./context/StateContext.tsx";
import {dummyAccounts} from "./utils/dummyData.ts";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import SocialLogin from "./pages/SocialLogin.tsx";
import BooksAddPage from "./pages/BooksAddPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";

function App() {

    const navigate = useNavigate();

    const [books, setBooks] = useState<BookGetAllDto[]>(dummyAccounts);

    const [appUser, setAppUser] = useState<LocalUser | undefined>(undefined);


    useEffect(() => {

        const jwtJson = localStorage.getItem("library_user");

        if (!jwtJson) {
            navigate("/login");
            return;
        }

        const localJwt: LocalJwt = JSON.parse(jwtJson);

        const {uid, email, given_name, family_name} = getClaimsFromJwt(localJwt.accessToken);

        const expires: string = localJwt.expires;

        setAppUser({
            id: uid,
            email,
            firstName: given_name,
            lastName: family_name,
            expires,
            accessToken: localJwt.accessToken
        });


    }, []);

    return (
        <>
            <AppUserContext.Provider value={{appUser, setAppUser}}>
                <BooksContext.Provider value={{books, setBooks}}>
                    <ToastContainer/>
                    <NavBar />
                    <Container className="App">
                        <Routes>
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <BooksPage/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/about" element={
                                <ProtectedRoute>
                                    <AboutPage />
                                </ProtectedRoute>}/>
                            <Route path="/books/add" element={
                                <ProtectedRoute>
                                    <BooksAddPage />
                                </ProtectedRoute>
                            }/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/social-login" element={<SocialLogin/>}/>
                        </Routes>
                    </Container>
                </BooksContext.Provider>
            </AppUserContext.Provider>
        </>
    )

}


export default App