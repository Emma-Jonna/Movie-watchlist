import React, {useState, useEffect} from "react";
import {json, Navigate} from "react-router-dom";

function Login() {
  const [requestToken, setrequestToken] = useState("");

  useEffect(() => {
    getRequestToken();
  }, []);

  const getRequestToken = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDBv4}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: '{\r\n  "redirect_to": "http://localhost:5173/login"\r\n}',
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.themoviedb.org/4/auth/request_token",
        requestOptions
      );

      const requestToken = await response.json();

      setrequestToken(requestToken.request_token);
    } catch (e) {
      console.error(e);
    }
  };

  const AcceptRequestToken = () => {
    window.sessionStorage.setItem("requestToken", requestToken);
    window.location.href = `https://www.themoviedb.org/auth/access?request_token=${requestToken}`;
  };

  const getAccessToken = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDBv4}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: `{"request_token": "${window.sessionStorage.getItem(
        "requestToken"
      )}"}`,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.themoviedb.org/4/auth/access_token",
        requestOptions
      );

      const accessToken = await response.json();

      window.sessionStorage.setItem("accessToken", accessToken.access_token);
    } catch (e) {
      console.error(e);
    }
  };

  const getSessionId = async () => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        access_token: `${window.sessionStorage.getItem("accessToken")}`,
      }),
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/session/convert/4?api_key=${
          import.meta.env.VITE_TMDBv3
        }`,
        requestOptions
      );

      const sessionId = await response.json();
      window.sessionStorage.setItem("session_id", sessionId.session_id);
    } catch (e) {
      console.error(e);
    }
  };

  if (window.sessionStorage.getItem("session_id")) {
    return <Navigate to="/" />;
  } else if (
    window.sessionStorage.getItem("requestToken") &&
    !window.sessionStorage.getItem("accessToken") &&
    !window.sessionStorage.getItem("session_id")
  ) {
    getAccessToken();
  } else if (
    window.sessionStorage.getItem("accessToken") &&
    !window.sessionStorage.getItem("session_id")
  ) {
    getSessionId();
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Login Works</h1>
      <button onClick={AcceptRequestToken}>Login</button>
    </div>
  );
}

export default Login;
