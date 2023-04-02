import axios from '../axios'

export const checkAuth = async () => {
    try {
        const response = await axios.get(`/refresh`, {
            withCredentials: true,
        });
        localStorage.setItem('token', response.data.accessToken);
        return response.data
    } catch (e: any) {
    }
}
