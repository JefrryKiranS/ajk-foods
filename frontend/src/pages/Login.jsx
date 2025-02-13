import { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import ScrollingText from "../components/ScrollingText"; // Import component

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form reload

        try {
            const response = await axios.post("http://localhost:5001/api/auth/login", { 
                email, 
                password 
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token); // Save token
                alert("Login successful!");
                window.location.href = "/dashboard"; // Redirect after login
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials!");
        }
    };

    return (
        <div className="login-container">
            <ScrollingText /> {/* Display scrolling text at the top */}
            <form className="login-box" onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
