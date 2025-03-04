import { useState, useEffect } from "react";
import './css/LoginPage.css';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './css/LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login, user } = useAuth();
    const navigate = useNavigate();

    //Kontrollera användare
    useEffect(() => {
        if (user) {
            navigate("/inventory");
        }
    }, [user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            await login({ email, password });
            navigate("/inventory");
        } catch (error) {
            setError("Inloggningen misslyckades. kontrollera att du angett rätt epost och lösenord.")
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Logga in på ditt konto</h2>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">E-postadress</label>
                        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Lösenord</label>
                        <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit">Logga in</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage