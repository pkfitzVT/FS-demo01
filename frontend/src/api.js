// src/api.js
const BASE = ''; // proxy in package.json will forward to port 4000

export async function createUser(data) {
    const res = await fetch(`${BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export async function getUserByEmail(email) {
    const res = await fetch(`${BASE}/users/email/${encodeURIComponent(email)}`);
    if (!res.ok) throw new Error('User not found');
    return res.json();
}

export async function updateUser(id, data) {
    const res = await fetch(`/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to update user');
    }
    return res.json();
}

