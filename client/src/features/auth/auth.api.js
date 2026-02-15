import api from '../../lib/api.js';

export const registerStudent = (payload) => api.post('/auth/student/register', payload);
export const loginStudent = (payload) => api.post('/auth/student/login', payload);

export const registerFaculty = (payload) => api.post('/auth/faculty/register', payload);
export const loginFaculty = (payload) => api.post('/auth/faculty/login', payload);
export const approveFaculty = (facultyId) => api.patch(`/auth/faculty/approve/${facultyId}`);

export const loginAdmin = (payload) => api.post('/auth/admin/login', payload);

export const forgotPassword = (payload) => api.post('/auth/password/forgot', payload);
export const resetPassword = (payload) => api.post('/auth/password/reset', payload);
