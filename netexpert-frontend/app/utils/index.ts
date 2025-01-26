export const authFetch = (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    console.log(options);

    return fetch(url, {
        ...options,
        headers,
    });
};