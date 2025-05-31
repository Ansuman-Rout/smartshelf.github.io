// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../services/firebase";
// import { useNavigate } from "react-router-dom";
// import "../styles/Auth.css";
// import Lottie from "lottie-react";
// import loginAnimation from "../animation/signupanimation.json"; // ✅ adjust path if needed

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert("Login successful!");
//       navigate("/");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="row justify-content-center align-items-center vh-100">
//         <div className="col-md-6 text-center">
//           <Lottie animationData={loginAnimation} loop={true} className="w-75 mx-auto" />
//         </div>
//         <div className="col-md-4">
//           <h2 className="mb-4">Login</h2>
//           <input
//             type="email"
//             className="form-control mb-3"
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//           />
//           <input
//             type="password"
//             className="form-control mb-3"
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//           />
//           <button className="btn btn-primary w-100" onClick={handleLogin}>
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
