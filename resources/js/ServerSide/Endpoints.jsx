export const API_CONFIG = {
    BASE_URL: 'http://127.0.0.1:8000',
    HEADERS: {
        Accept: 'application/json',
    },
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/api/Kullanici/Giris',
            REGISTER: '/api/v1/KayitOl', // Try a different API endpoint structure
        },
        SERVIS: {
            SERVIS: '/api/servis',
        },
        PROJECTS: {
            PROJECTS: '/api/projects',
            SAVE_PROJECT: '/api/projects'
        },
        CLIENT: {
            CLIENTS: '/api/clients',
            CLIENT: '/api/clients'
        }
    }
};
