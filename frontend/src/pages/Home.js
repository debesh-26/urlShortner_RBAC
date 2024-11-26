import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Home.css";
import URLShortener from "../components/URLShortener";
import { FaRegThumbsUp } from "react-icons/fa";
import AdminDashboard from "../components/AdminDashboard";

const Home = () => {
  const [isauthenticated, setisAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [urlLimit, seturlLimit] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const limit = localStorage.getItem("urlLimit");
    const userRole = localStorage.getItem("role");

    seturlLimit(limit);
    setRole(userRole);

    if (token) {
      setisAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Header
        setisAuthenticated={setisAuthenticated}
        isauthenticated={isauthenticated}
        urlLimit={urlLimit}
      />
      {isauthenticated ? (
        role === "admin" ? (
          <AdminDashboard />
        ) : (
          <URLShortener />
        )
      ) : (
        <div className="bodyy">
          <h3>Sign Up for Free and Manage Your Links</h3>
          <h1>
            "Shorten Your First <b className="free">5 Free</b> Link Now with
            ClipLink !"
          </h1>
          <div className="mainbody">
            <FaRegThumbsUp className="icon" />
            <div className="mainbody1">
              <h4>Simple and fast URL shortener!</h4>
              <p>
                ClipLink allows to shorten long links from Instagram, Facebook,
                YouTube, Twitter, Linked In, WhatsApp, TikTok, blogs and sites.
                Just paste the long URL and click the Shorten URL button. On the
                next page, copy the shortened URL and share it on sites, chat
                and emails. After shortening the URL, check how many clicks it
                received.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
