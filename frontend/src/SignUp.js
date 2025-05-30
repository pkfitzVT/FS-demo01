import { useState } from 'react';
import { createUser } from './api';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email,    setEmail   ] = useState('');
    const [error,    setError   ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const user = await createUser({ username, password_hash: password, email });
            // store newly created ID, then navigate to lookup page
            localStorage.setItem('lastUserId', user.id);
            navigate('/find');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {error && <p style={{color:'red'}}>{error}</p>}
            <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
}
