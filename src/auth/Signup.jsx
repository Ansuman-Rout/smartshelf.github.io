// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../services/firebase";
// import { useNavigate, Link } from "react-router-dom";
// import "../styles/Auth.css";

// import Lottie from "lottie-react";
// import signupAnimation from "../animation/signupanimation.json"; // ✅ Adjust path if needed

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("Signup successful!");
//       navigate("/login");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="auth-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
//       <div className="row w-75 shadow-lg rounded bg-white p-4">
//         <div className="col-md-6 d-flex align-items-center">
//           <Lottie animationData={signupAnimation} loop={true} style={{ height: 300 }} />
//         </div>
//         <div className="col-md-6">
//           <h2 className="mb-3">Signup</h2>
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
//           <button onClick={handleSignup} className="btn btn-primary w-100 mb-2">
//             Sign Up
//           </button>
//           <p className="text-center">
//             Already have an account?{" "}
//             <Link to="/login" className="text-primary fw-bold">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;
