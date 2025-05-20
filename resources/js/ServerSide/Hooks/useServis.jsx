import {useDispatch, useSelector} from 'react-redux';
import {
    setError,
    setLoading,
    setservisler,
}  from '../../Repo/Redux/Modules/servisSlice';
import { API_CONFIG } from "../EndPoints";
import { toast } from "react-toastify";
import { apiService } from '../Load';


export const useServis = () => {
    const dispatch = useDispatch();

    const setServis = async () => {
        try {
            dispatch(setLoading(true));

            const response = await apiService.get(API_CONFIG.ENDPOINTS.SERVIS.SERVIS);

            // Sadece data kısmını dispatch et
            dispatch(setservisler(response.data));

            return response.data;

        } catch (error) {
            dispatch(setError(error.message));
            toast.error(t('Yüklenemedi...'))
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        setServisler: setServis
    };
};
