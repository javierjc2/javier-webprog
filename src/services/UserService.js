import API from './api';

export const fetchUsers    = ()          => API.get('/users');
export const createUser    = (user)      => API.post('/users', user);
export const updateUser    = (id, user)  => API.put(`/users/${id}`, user);
export const deleteUser    = (id)        => API.delete(`/users/${id}`);
export const loginUser     = (creds)     => API.post('/users/login', creds);
export const toggleStatus  = (id)        => API.patch(`/users/${id}/toggle`);
