export const getCurrentSession = async () => {
  try {
    const res = await fetch('/api/auth/me');
    const data = await res.json();
    if (data.user) {
      return { user: { id: data.user.id, email: data.user.email, user_metadata: { username: data.user.username, full_name: data.user.fullName } } };
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const onAuthChange = (callback) => {
  return { unsubscribe: () => {} };
};

export const getProfiles = async () => {
  try {
    const res = await fetch('/api/auth/me');
    const data = await res.json();
    if (data.user) {
      return [{ id: data.user.id, email: data.user.email, full_name: data.user.fullName, username: data.user.username, role: data.user.role, avatar_url: data.user.avatarUrl, level: data.user.level }];
    }
    return [];
  } catch (err) {
    return [];
  }
};

export const logoutUser = async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
  window.location.reload();
};

export const loginUser = async (email, password) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }
  return { user: { id: data.user.id, email: data.user.email, role: data.user.role, full_name: data.user.fullName } };
};

export const registerUser = async (email, password, username, full_name) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username, fullName: full_name }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Registration failed');
  }
  return { user: { id: data.user.id, email: data.user.email, role: data.user.role, full_name: data.user.fullName, username: data.user.username } };
};
