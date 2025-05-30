// frontend/src/FindByEmail.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail, updateUser } from './api';

export default function FindByEmail() {
    const navigate = useNavigate();

    const [email,    setEmail]    = useState('');
    const [user,     setUser]     = useState(null);
    const [form,     setForm]     = useState({ username:'', email:'', password_hash:'' });
    const [error,    setError]    = useState('');
    const [success,  setSuccess]  = useState('');

    // 1) Lookup user
    const handleLookup = async e => {
        e.preventDefault();
        setError(''); setSuccess('');
        try {
            const u = await getUserByEmail(email);
            setUser(u);
            setForm({ username: u.username, email: u.email, password_hash: '' });
        } catch {
            setError('User not found');
        }
    };

    // 2) Save edits
    const handleSave = async () => {
        setError(''); setSuccess('');
        try {
            const updated = await updateUser(user.id, form);
            setUser(updated);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.message);
        }
    };

    // 3) Delete account
    const handleDelete = async () => {
        setError(''); setSuccess('');
        try {
            await fetch(`/users/${user.id}`, { method: 'DELETE' });
            setSuccess('Account deleted.');
            // Option A: redirect back to signup
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setError('Failed to delete account');
        }
    };

    // --- render ---
    if (!user) {
        return (
            <form onSubmit={handleLookup}>
                <h2>Find User by Email</h2>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Find</button>
                {error &&   <p style={{ color: 'red' }}>{error}</p>}
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
                <button
                    onClick={handleDelete}
                    style={{ marginLeft: '1rem', backgroundColor: '#f66', color: 'white' }}
                >
                    Delete Account
                </button>
            </div>

            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error   && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
