import React from "react";
import "./App.css";
import { Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
// Component
import Login from "./Views/Auth/Login";
import TopNav from "./components/Layout/TopNav";
import Home from "./Views/Home";
import NoMatch from "./components/NoMatch";
import CheckIsAuthenticated from "./components/Guards/CheckIsAuthenticated";
const Ideas = React.lazy(() => import("./Views/Ideas/Ideas"));

function App() {
  return (
    <div className="App">
      <>
        <Container maxW="container.xl">
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
              path="/ideas"
              element={
                <React.Suspense fallback={<>Loading...</>}>
                  <Ideas />
                </React.Suspense>
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Container>
      </>
    </div>
  );
}

export default App;
