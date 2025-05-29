import { useDispatch, useSelector } from 'react-redux';
import {
    setError,
    setLoading,
    setClients
} from '../../Repo/Redux/Modules/clientSlice';
import { API_CONFIG } from "../Endpoints";
import { toast } from "react-toastify";
import { apiService } from '../Load';

export const useClient = () => {
    const dispatch = useDispatch();
    const { clients, loading, error } = useSelector(state => state.client);

    const fetchClients = async () => {
        try {
            dispatch(setLoading(true));

            const response = await apiService.get(API_CONFIG.ENDPOINTS.CLIENT.CLIENT);

            // Dispatch only the data part
            dispatch(setClients(response.data));

            return response.data;

        } catch (error) {
            dispatch(setError(error.message));
            toast.error('Müşteriler yüklenemedi...')
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const createClient = async (clientData) => {
        try {
            dispatch(setLoading(true));

            // API endpoint'e veri gönderme işlemi
            const response = await apiService.post(API_CONFIG.ENDPOINTS.CLIENT.CLIENT, clientData);

            // Fetch updated client list after creating a new client
            await fetchClients();

            return response.data.data;

        } catch (error) {
            dispatch(setError(error.message));
            toast.error('Müşteri kaydedilemedi');
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        clients,
        loading,
        error,
        fetchClients,
        createClient
    };
};
