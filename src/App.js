import React, {useEffect} from "react";
import "./App.css";
import {Container} from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";

// Component
import Login from "./Views/Auth/Login";
import TopNav from "./components/Layout/TopNav";
import Home from "./Views/Home";
import NoMatch from "./components/NoMatch";
import CheckIsAuthenticated from "./components/Guards/CheckIsAuthenticated";
import IdeaDetail from "./components/Ideas/IdeaDetail";
import {PostIdeas} from "./components/Ideas/PostIdeas";
import RequiredAuth from "./components/Guards/RequiredAuth";
import Example from "./Views/Example";
import {getUserInfo, getUserRole} from "./app/reducers/authSlice";
import {useDispatch} from "react-redux";
import PostIdeaPDF from "./components/Ideas/FormPostIdea/PostIdeaPDF";
import PostIdeaManual from "./components/Ideas/FormPostIdea/PostIdeaManual";
import Dashboard from "./Views/Admin/Dashboard";
import CreateUser from "./Views/Admin/User/CreateUser";
import CheckIsAdmin from "./components/Guards/CheckIsAdmin";
import ProfileDetail from "./Views/Profiles/Children/ProfileDetail";
import MyAccount from "./Views/Profiles/MyAccount";
import ChangePassword from "./Views/Profiles/Children/ChangePassword";
import Categories from "./Views/QA-Manger/Category/Categories";
import QaHome from "./Views/QA-Manger/Home";
import CategoryDetail from "./Views/QA-Manger/Category/CategoryDetail";
import CheckIsQaManager from "./components/Guards/CheckIsQaManager";
import NewCategory from "./Views/QA-Manger/Category/NewCategory";

// Lazy route
const Ideas = React.lazy(() => import("./Views/Ideas/Ideas"));

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            dispatch(getUserInfo());
            dispatch(getUserRole());
        }
    }, [dispatch]);

    return (<div className="App">
        <>
            <Container maxW="container.xl">
                {/* Navigation bar */}
                <TopNav/>

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    {/* Login route */}
                    <Route
                        path="login"
                        element={<CheckIsAuthenticated>
                            <Login/>
                        </CheckIsAuthenticated>}
                    />

                    {/* Idea routes */}
                    <Route
                        path="ideas"
                        element={<RequiredAuth>
                            <React.Suspense fallback={<>Loading...</>}>
                                <Ideas/>
                            </React.Suspense>
                        </RequiredAuth>}
                    />

                    {/* Detail idea */}
                    <Route
                        path="ideas/:ideaId"
                        element={<RequiredAuth>
                            <IdeaDetail/>
                        </RequiredAuth>}
                    />

                    {/* Post new idea */}
                    <Route
                        path="post-idea"
                        element={<RequiredAuth>
                            <PostIdeas/>
                        </RequiredAuth>}
                    >
                        {/* Manual post idea is index child */}
                        <Route index element={<PostIdeaManual/>}/>
                        <Route path="manual" element={<PostIdeaManual/>}/>
                        <Route path="via-pdf" element={<PostIdeaPDF/>}/>
                    </Route>

                    {/* Profile routes */}
                    <Route path="/my-account" element={<MyAccount/>}>
                        <Route index element={<ProfileDetail/>}/>
                        <Route path="profiles" element={<ProfileDetail/>}/>
                        <Route path="change-password" element={<ChangePassword/>}/>
                    </Route>

                    {/* Qa manager routes*/}
                    <Route
                        path="/qa-managers"
                        element={<CheckIsQaManager>
                            <QaHome/>
                        </CheckIsQaManager>}
                    >
                        <Route index element={<CheckIsQaManager>
                            <Categories/>
                        </CheckIsQaManager>}/>

                        <Route path="categories" element={<CheckIsQaManager>
                            <Categories/>
                        </CheckIsQaManager>}/>

                        {/*New category*/}
                        <Route path="categories/create" element={<CheckIsQaManager>
                            <NewCategory/>
                        </CheckIsQaManager>}/>


                    </Route>
                    {/* Detail category*/}
                    <Route
                        path="/qa-managers/categories/:categoryId"
                        element={<CheckIsQaManager>
                            <CategoryDetail/>
                        </CheckIsQaManager>}
                    />

                    {/* Admin routes */}
                    <Route
                        path="/admins"
                        element={<CheckIsAdmin>
                            <Dashboard/>
                        </CheckIsAdmin>}
                    >
                        <Route index element={<CreateUser/>}/>
                        <Route path="users" element={<CreateUser/>}/>
                    </Route>

                    {/* 404 */}
                    <Route path="*" element={<NoMatch/>}/>
                    <Route path="example" element={<Example/>}/>
                </Routes>
            </Container>
        </>
    </div>);
}

export default App;
