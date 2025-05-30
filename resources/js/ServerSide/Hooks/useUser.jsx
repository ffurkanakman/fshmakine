import {useDispatch, useSelector} from 'react-redux';
import {
    setError,
    setLoading,
    setUsers,

}  from '../../Repo/Redux/Modules/userSlice.jsx';
import { API_CONFIG } from "../EndPoints";
import { toast } from "react-toastify";
import { t } from "i18next";
import { apiService } from '../Load';


export const useUser = () => {
    const dispatch = useDispatch();

    const setUser = async () => {
        try {
            dispatch(setLoading(true));

            const response = await apiService.get(API_CONFIG.ENDPOINTS.USER.USER);

            // Sadece data kısmını dispatch et
            dispatch(setUsers(response.data));

            return response.data;

        } catch (error) {
            dispatch(setError(error.message));
            toast.error(t('Yüklenemedi...'))
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

        const updateUser = async (user,id) => {
            try {
                dispatch(setLoading(true));

                const response = await apiService.put(`${API_CONFIG.ENDPOINTS.USER.USER_UPDATE}/${id}`, user);

                return response.data;

            }catch (error) {
                dispatch(setError(error.message));
                toast.error('Müşteri Düzenlenemedi.');
                throw error;
            }finally {
                dispatch(setLoading(false));
            }
        }


        return {
        setUser: setUser,
        updateUser: updateUser
        };
    };
