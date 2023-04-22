import { useEffect } from "react";
import {Navigate} from "react-router-dom";

import { useSessionStorage } from "usehooks-ts";
import axios from "axios";

function Login() {
  const [RequestToken, setRequestToken] = useSessionStorage('requestToken', "");
  const [AccessToken, setAccessToken] = useSessionStorage('accessToken', "");
  const [Session_id, setSession_id] = useSessionStorage('session_id', "");

  const TMDBv4URL = "https://api.themoviedb.org/4"
  const TMDBv3URL = "https://api.themoviedb.org/3"


  async function getRequestToken() {
    const headers = {
      "Authorization": `Bearer ${import.meta.env.VITE_TMDBv4}`,
      "Content-Type": "application/json;charset=utf-8"
    }
    try {
      const {data: { request_token }} = await axios.post(`${TMDBv4URL}/auth/request_token`, 
      { redirect_to: "http://localhost:5173/login"}, 
      { headers })
      
      setRequestToken(request_token);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAccessToken() {
    const headers = {
      "Authorization": `Bearer ${import.meta.env.VITE_TMDBv4}`,
      "Content-Type": "application/json;charset=utf-8"
    }

    try {
      const {data: { access_token }} = await axios.post(`${ TMDBv4URL }/auth/access_token`, 
        { request_token: RequestToken}, 
        { headers })
        
        setAccessToken(access_token);
    } catch (error) {
      console.error(error);
    }
  }

  async function getSessionId() {
    const {data: {session_id}} = await axios.post(`${TMDBv3URL}/authentication/session/convert/4`, 
    { access_token: AccessToken}, 
    { params: { api_key: import.meta.env.VITE_TMDBv3 }})

    setSession_id(session_id);
  }

  const AcceptRequestToken = () => {
    window.location.href = `https://www.themoviedb.org/auth/access?request_token=${RequestToken}`;
  };

  useEffect(() => {
    getRequestToken();
  }, []);
  useEffect(() => {
    if(!AccessToken) {
      getAccessToken();
    }
  }, [ RequestToken ]);
  useEffect(() => {
    if (!Session_id) {
      getSessionId();
    }
  }, [ AccessToken ]);

  if (Session_id) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <h1>Login Works</h1>
      <button onClick={AcceptRequestToken}>Login</button>
    </div>
  );
}

export default Login;
