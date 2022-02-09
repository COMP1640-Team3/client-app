import React, { useEffect } from "react";
import "./App.css";
import { Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
// Component
import Login from "./Views/Auth/Login";
import TopNav from "./components/Layout/TopNav";
import Home from "./Views/Home";
import NoMatch from "./components/NoMatch";
import CheckIsAuthenticated from "./components/Guards/CheckIsAuthenticated";
import IdeaDetail from "./components/Ideas/IdeaDetail";
import { PostIdeas } from "./components/Ideas/PostIdeas";
import RequiredAuth from "./components/Guards/RequiredAuth";
import Example from "./Views/Example";
import { getUserInfo } from "./app/reducers/authSlice";
import { useDispatch } from "react-redux";
import PostIdeaPDF from "./components/Ideas/FormPostIdea/PostIdeaPDF";
import PostIdeaManual from "./components/Ideas/FormPostIdea/PostIdeaManual";
// Lazy route
const Ideas = React.lazy(() => import("./Views/Ideas/Ideas"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getUserInfo());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <>
        <Container maxW="container.xl">
          {/* Navigave */}
          <TopNav />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="login"
              element={
                <CheckIsAuthenticated>
                  <Login />
                </CheckIsAuthenticated>
              }
            />
            <Route
              path="ideas"
              element={
                <React.Suspense fallback={<>Loading...</>}>
                  <Ideas />
                </React.Suspense>
              }
            />

            {/* Detail idea */}
            <Route path="ideas/:ideaId" element={<IdeaDetail />} />

            {/* Post new idea */}
            <Route
              path="post-idea"
              element={
                <RequiredAuth>
                  <PostIdeas />
                </RequiredAuth>
              }
            >
              {/* Manual post idea is index child */}
              <Route index element={<PostIdeaManual />} />{" "}
              <Route path="manual" element={<PostIdeaManual />} />
              <Route path="via-pdf" element={<PostIdeaPDF />} />
            </Route>

            <Route path="*" element={<NoMatch />} />
            <Route path="example" element={<Example />} />
          </Routes>
        </Container>
      </>
    </div>
  );
}

export default App;
