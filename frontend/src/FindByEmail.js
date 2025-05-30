import { useState } from 'react';
import { getUserByEmail, updateUser } from './api';

export default function FindByEmail() {
    const [email, setEmail]       = useState('');
    const [user, setUser]         = useState(null);
    const [form, setForm]         = useState({ username:'', email:'', password_hash: '' });
    const [error, setError]       = useState('');
    const [success, setSuccess]   = useState('');        // ← new

    const handleLookup = async e => {
        e.preventDefault();
        setError(''); setSuccess('');
        try {
            const u = await getUserByEmail(email);
            setUser(u);
            setForm({ username: u.username, email: u.email, password_hash: '' });
        } catch {
            setUser(null);
            setError('User not found');
        }
    };

    const handleSave = async () => {
        setError(''); setSuccess('');
        try {
            const updated = await updateUser(user.id, form);
            setUser(updated);
            setSuccess('Profile updated successfully!');    // ← set success
        } catch (err) {
            setError(err.message);
        }
    };

    if (!user) {
        return (
            <form onSubmit={handleLookup}>
                <h2>Find User by Email</h2>
                <input
                    type="email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                />
                <button type="submit">Find</button>
                {error && <p style={{color:'red'}}>{error}</p>}
            </form>
        );
    }

    return (
        <div>
            <h2>Edit User</h2>

            <label>
                Username:
                <input
                    value={form.username}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                />
            </label>

            <label>
                Email:
                <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
            </label>

            <label>
                New Password:
                <input
                    type="password"
                    value={form.password_hash}
                    onChange={e => setForm(f => ({ ...f, password_hash: e.target.value }))}
                />
            </label>

            <div style={{ marginTop: '1rem' }}>
                <button onClick={handleSave}>Save Changes</button>
            </div>

            {success && <p style={{ color: 'green' }}>{success}</p>}   {/* ← show success */}
            {error   && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
