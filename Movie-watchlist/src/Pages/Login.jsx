import React, {useState, useEffect} from "react";
import {json, Navigate} from "react-router-dom";

function Login() {
  const [requestToken, setrequestToken] = useState("");

  if (window.sessionStorage.getItem("requestToken")) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json;charset=utf-8");
    myHeaders.append("Authorization", `Bearer ${import.meta.env.VITE_TMDBv4}`);

    var raw = `{"request_token": "${window.sessionStorage.getItem(
      "requestToken"
    )}"}`;

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.themoviedb.org/4/auth/access_token", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        window.sessionStorage.setItem("accessToken", result.access_token);
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json;charset=utf-8");
    myHeaders.append("Authorization", `Bearer ${import.meta.env.VITE_TMDBv4}`);

    var raw = '{\r\n  "redirect_to": "http://127.0.0.1:5173/login"\r\n}';

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.themoviedb.org/4/auth/request_token", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setrequestToken(result.request_token);
      })
      .catch((error) => console.log("error", error));
  }, []);

  let generateAccessToken = () => {
    window.sessionStorage.setItem("requestToken", requestToken);
    window.location.href = `https://www.themoviedb.org/auth/access?request_token=${requestToken}`;
  };

  if (window.sessionStorage.getItem("accessToken")) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      access_token: `${window.sessionStorage.getItem("accessToken")}`,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://api.themoviedb.org/3/authentication/session/convert/4?api_key=${
        import.meta.env.VITE_TMDBv3
      }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        window.sessionStorage.setItem("session_id", result.session_id);
      })
      .catch((error) => console.log("error", error));

    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Login Works</h1>
      <button onClick={generateAccessToken}>Login</button>
    </div>
  );
}

export default Login;
