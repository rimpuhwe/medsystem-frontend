const API_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
  ? '' 
  : process.env.NEXT_PUBLIC_API_URL || 'https://medsystemapplication.onrender.com';

export const api = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (error: any) {
      if (error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please check your connection.');
      }
      throw error;
    }
  },

  auth: {
    login: (email: string, password: string) =>
      api.fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    register: (data: any) => {
      const endpoint = data.role === 'pharmacist' 
        ? '/api/auth/register/pharmacy'
        : '/api/auth/register/patient';
      return api.fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    verifyOtp: (email: string, otp: string) =>
      api.fetch('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
      }),

    resendOtp: (email: string) =>
      api.fetch('/api/auth/resend-otp', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),

    resetPassword: (email: string, otp: string, newPassword: string) =>
      api.fetch('/api/auth/reset', {
        method: 'POST',
        body: JSON.stringify({ email, otp, newPassword }),
      }),

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },

  patient: {
    getProfile: () => api.fetch('/api/patient'),
    updateProfile: (data: any) => api.fetch('/api/patient/update-profile', { method: 'PUT', body: JSON.stringify(data) }),
    getMedicalHistory: () => api.fetch('/api/patient/medical-history'),
    joinQueue: (data: any) => api.fetch('/api/patient/queue/join', { method: 'POST', body: JSON.stringify(data) }),
    getQueueSummary: () => api.fetch('/api/patient/queue/'),
  },

  doctor: {
    getProfile: () => api.fetch('/api/doctors/me'),
    getAll: () => api.fetch('/api/doctors/all-doctors'),
    search: (name: string) => api.fetch(`/api/doctors/search?name=${name}`),
    getQueue: () => api.fetch('/api/doctors/queue/doctor'),
    callNext: () => api.fetch('/api/doctors/queue/call', { method: 'POST' }),
    addConsultation: (data: any) => api.fetch('/api/doctors/consultation', { method: 'POST', body: JSON.stringify(data) }),
    create: (data: any) => api.fetch('/api/doctors', { method: 'POST', body: JSON.stringify(data) }),
  },

  pharmacy: {
    getProfile: () => api.fetch('/api/pharmacy/profile'),
    updateProfile: (data: any) => api.fetch('/api/pharmacy/profile', { method: 'PUT', body: JSON.stringify(data) }),
  },

  clinic: {
    getAll: () => api.fetch('/api/clinic/all'),
    search: (name: string) => api.fetch(`/api/clinic/search?name=${name}`),
    create: (data: any) => api.fetch('/api/clinic', { method: 'POST', body: JSON.stringify(data) }),
  },
};
