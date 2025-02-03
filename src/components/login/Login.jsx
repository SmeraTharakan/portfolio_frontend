import { useState } from "react";
import { login } from "../../api/Api.jsx";
import "./Login.css"; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        console.log("Submitting login with", username, password); 
        const result = await login(username, password);
        if (result.success) {
            window.location.href = "/admin"; 
        } else {
            setError(result.message);
        }
    };
    

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Admin Login</h2>
                {error && <p className="error-message">{error}</p>}
                <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <button onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
};

export default Login;
