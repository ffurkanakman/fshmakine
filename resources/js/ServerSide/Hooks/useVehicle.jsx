import { useDispatch, useSelector } from 'react-redux';
import {
    setError,
    setLoading,
    setVehicles,
    addVehicle,
    updateVehicle as updateVehicleAction,
    setCurrentVehicle
} from '../../Repo/Redux/Modules/vehicleSlice'; // slice'ını buna göre oluşturacağız
import { API_CONFIG } from '../Endpoints';
import { toast } from 'react-toastify';
import { apiService } from '../Load';
import { ROUTES } from '../../Libs/Routes/config';

// 401 error handler
const handle401Error = (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = ROUTES.AUTH.LOGIN;
        return true;
    }
    return false;
};

export const useVehicle = () => {
    const dispatch = useDispatch();
    const { vehicles, currentVehicle, loading, error } = useSelector(state => state.vehicle);

    // Listeleme
    const fetchVehicles = async () => {
        try {
            dispatch(setLoading(true));
            const res = await apiService.get(API_CONFIG.ENDPOINTS.VEHICLE.VEHICLE);
            dispatch(setVehicles(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(setError(error.message));
            if (handle401Error(error)) return;
            toast.error('Araçlar yüklenemedi');
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Ekleme
    const createVehicle = async (formData) => {
        try {
            dispatch(setLoading(true));
            const res = await apiService.post(API_CONFIG.ENDPOINTS.VEHICLE.VEHICLE, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            dispatch(addVehicle(res.data.data));
            toast.success('Araç başarıyla eklendi');
            return res.data.data;
        } catch (error) {
            dispatch(setError(error.message));
            if (handle401Error(error)) return;
            toast.error('Araç eklenemedi');
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Tekil veri
    const getVehicleById = async (id, force = false) => {
        try {
            dispatch(setLoading(true));
            if (!force && vehicles && vehicles.length > 0) {
                const vehicle = vehicles.find(v => v.id === parseInt(id));
                if (vehicle) {
                    dispatch(setCurrentVehicle(vehicle));
                    return vehicle;
                }
            }
            const res = await apiService.get(`${API_CONFIG.ENDPOINTS.VEHICLE.VEHICLE}/${id}`);
            dispatch(setCurrentVehicle(res.data.data));
            return res.data.data;
        } catch (error) {
            dispatch(setError(error.message));
            if (handle401Error(error)) return;
            toast.error('Araç yüklenemedi');
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };


    // Güncelleme
    const updateVehicle = async (id, formData) => {
        try {
            dispatch(setLoading(true));
            const res = await apiService.post(
                `${API_CONFIG.ENDPOINTS.VEHICLE.VEHICLE}/${id}?_method=PUT`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            dispatch(updateVehicleAction(res.data.data));
            toast.success('Araç güncellendi');
            return res.data.data;
        } catch (error) {
            dispatch(setError(error.message));
            if (handle401Error(error)) return;
            toast.error('Araç güncellenemedi');
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Silme
    const deleteVehicle = async (id) => {
        try {
            dispatch(setLoading(true));
            await apiService.delete(`${API_CONFIG.ENDPOINTS.VEHICLE.VEHICLE}/${id}`);
            toast.success('Araç silindi');
            await fetchVehicles();
            return true;
        } catch (error) {
            dispatch(setError(error.message));
            if (handle401Error(error)) return;
            toast.error('Araç silinemedi');
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        vehicles,
        currentVehicle,
        loading,
        error,
        fetchVehicles,
        createVehicle,
        getVehicleById,
        updateVehicle,
        deleteVehicle
    };
};
