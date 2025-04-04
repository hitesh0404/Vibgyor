// import React, { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import axios from 'axios';
// import APIROOT from "..";
// export default function Login() {
//   const [error,setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // Handling form submission
//   const onSubmit = async (data) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(
//         APIROOT+"api-token-auth/",
//         {
//           username: data.username,
//           password: data.password,
//         }
//       );
//       console.log(data);
//       console.log(response);
      
//       // Store the token in localStorage or context
//       window.localStorage.setItem("authToken", response.data.token);
//       // Redirect to dashboard or home page
//       // navigate("/dashboard");
//     } catch (err) {
//       console.log(data);
//       setError(
//         err.response?.data?.non_field_errors?.[0] ||
//           "Invalid username or password"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="overlay d-flex justify-content-center align-items-center vh-100">
//       <div
//         className="main-form p-5 rounded-4 shadow-lg"
//         style={{ backgroundColor: "white", maxWidth: "400px", width: "100%" }}
//       >
//         <h2 className="text-center mb-4" style={{ color: "hsl(36, 88%, 50%)" }}>
//           Log in
//         </h2>
//         {error && <div className="alert alert-danger">{error}</div>}

//         {/* Form with Labels on the Left and Above Inputs */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Username input field */}
//           <div className="mb-3 d-flex flex-column">
//             <label
//               htmlFor="username"
//               className="form-label fw-bold text-start"
//               style={{ color: "#333" }}
//             >
//               Your username
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="username"
//               placeholder="Enter your username"
//               {...register("username", {
//                 required: "Username is required",
//                 minLength: {
//                   value: 3,
//                   message: "Username must be at least 3 characters long",
//                 },
//               })}
//             />
//             {errors.username && (
//               <p style={{ color: "red" }}>{errors.username.message}</p>
//             )}
//           </div>

//           {/* Password input field */}
//           <div className="mb-3 d-flex flex-column">
//             <label
//               htmlFor="password"
//               className="form-label fw-bold text-start"
//               style={{ color: "#333" }}
//             >
//               Your password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               placeholder="Enter your password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 8,
//                   message: "Password must be at least 8 characters long",
//                 },
//               })}
//             />
//             {errors.password && (
//               <p style={{ color: "red" }}>{errors.password.message}</p>
//             )}
//           </div>

//           {/* Remember Me Checkbox */}
//           <div className="d-flex justify-content-between align-items-center">
//             <div className="form-check">
//               <input
//                 type="checkbox"
//                 className="form-check-input"
//                 id="rememberMe"
//                 {...register("rememberMe")}
//               />
//               <label htmlFor="rememberMe" className="form-check-label">
//                 Remember me
//               </label>
//             </div>
//             <Link
//               to="/forgot-password"
//               className="text-decoration-none"
//               style={{ color: "hsl(36, 88%, 50%)" }}
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <div className="mt-4">
//             <button
//               type="submit"
//               className="btn w-100"
//               style={{
//                 backgroundColor: "hsl(36, 88%, 50%)",
//                 color: "white",
//                 fontWeight: "bold",
//               }}
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//             <NavLink style={{ textDecoration: "none", color: "white" }} to="/">
//               <button
//                 type="button"
//                 className="btn w-100"
//                 style={{
//                   backgroundColor: "hsl(36, 88%, 50%)",
//                   color: "white",
//                   fontWeight: "bold",
//                   margin: "2.5px",
//                   textDecoration: "none",
//                 }}
//               >
//                 Back
//               </button>
//             </NavLink>
//           </div>
//         </form>

//         {/* Link to Sign Up Page */}
//         <div className="text-center mt-3">
//           <p className="mb-0">
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className="text-decoration-none"
//               style={{ color: "hsl(36, 88%, 50%)" }}
//             >
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




  // "use client"

  // import { useState } from "react"
  // import { Link, useNavigate } from "react-router-dom"
  // import { useAuth } from "../contexts/AuthContext"
  // import "../css/AuthPages.css"

  // const Login = () => {
  //   const [username, setUsername] = useState("")
  //   const [password, setPassword] = useState("")
  //   const [loading, setLoading] = useState(false)
  //   const [error, setError] = useState("")

  //   const { login } = useAuth()
  //   const navigate = useNavigate()

  //   const handleSubmit = async (e) => {
  //     e.preventDefault()

  //     if (!username || !password) {
  //       setError("Please enter both username and password.")
  //       return
  //     }

  //     try {
  //       setError("")
  //       setLoading(true)
  //       const success = await login(username, password)

  //       if (success) {
  //         navigate("/")
  //       } else {
  //         setError("Failed to log in")
  //       }
  //     } catch (err) {
  //       setError("An error occurred during login. Please try again.")
  //       console.error(err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   return (
  //     <div className="auth-container">
  //       <div className="auth-card">
  //         <div className="auth-header">
  //           <h1>Vibgyor HRMS</h1>
  //           <p>Sign in to your account</p>
  //         </div>

  //         {error && <div className="auth-error">{error}</div>}

  //         <form onSubmit={handleSubmit} className="auth-form">
  //           <div className="form-group">
  //             <label htmlFor="username">Username</label>
  //             <input
  //               type="text"
  //               id="username"
  //               value={username}
  //               onChange={(e) => setUsername(e.target.value)}
  //               disabled={loading}
  //               required
  //             />
  //           </div>

  //           <div className="form-group">
  //             <label htmlFor="password">Password</label>
  //             <input
  //               type="password"
  //               id="password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               disabled={loading}
  //               required
  //             />
  //           </div>

  //           <div className="form-footer">
  //             <button type="submit" className="auth-button" disabled={loading}>
  //               {loading ? "Signing in..." : "Sign In"}
  //             </button>
  //           </div>

  //           <div className="auth-links">
  //             <Link to="/forgot-password">Forgot password?</Link>
  //             <Link to="/register">Don't have an account? Sign up</Link>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   )
  // }

  // export default Login


  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { useAuth } from "../contexts/AuthContext";
  const Login = () => {
      const {login} =  useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const success = await login(username, password);
      if (success) {
        navigate("/");
      } else {
        setError("Failed to log in");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Vibgyor HRMS</h1>
        <p>Sign in to your account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <Link to="/forgot-password">Forgot Password?</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
  

  