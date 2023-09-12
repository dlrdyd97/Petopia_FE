import React, { useEffect } from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import LoginComponent from "../Components/LoginComponent.js";
import { useNavigate } from "react-router-dom";

const Login = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.name) {
      navigate("/socialloginsuccess");
    }
  }, [user]);

  return (
    <>
      <BgLeft />
      <main>
        <Header />
        <section>
          <LoginComponent user={user} setUser={setUser} />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Login;
