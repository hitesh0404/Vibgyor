// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const APIROOT = 'http://127.0.0.1:8000/api/';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// export default APIROOT;
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import api from "./services/api";

const Root = () => {
  const [clientId, setClientId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .post("/google-client-id/")
      .then((res) => {
        setClientId(res.data.GOOGLE_OAUTH_CLIENT_ID);
      })
      .catch((err) => {
        console.error("Failed to fetch Google Client ID:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!clientId) {
    return <div>Failed to load Google Client ID.</div>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
