import { useState } from 'react';
import { apiService } from '../Load';
import { API_CONFIG } from '../Endpoints';
import { toast } from 'react-toastify';

export const useBrand = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBrands = async () => {
        try {
            setLoading(true);
            const res = await apiService.get(API_CONFIG.ENDPOINTS.BRAND.BRAND);
            setBrands(res.data.data);
            return res.data.data;
        } catch (err) {
            setError(err.message);
            toast.error('Markalar yüklenemedi');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createBrand = async (formData) => {
        try {
            setLoading(true);
            const res = await apiService.post(API_CONFIG.ENDPOINTS.BRAND.BRAND, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Marka başarıyla eklendi');
            await fetchBrands();
            return res.data.data;
        } catch (err) {
            setError(err.message);
            toast.error('Marka eklenemedi');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteBrand = async (id) => {
        try {
            setLoading(true);
            await apiService.delete(`${API_CONFIG.ENDPOINTS.BRAND.BRAND}/${id}`);
            toast.success("Marka başarıyla silindi");
            await fetchBrands();
        } catch (err) {
            setError(err.message);
            toast.error("Marka silinemedi");
        } finally {
            setLoading(false);
        }
    };

    const updateBrand = async (id, formData) => {
        try {
            setLoading(true);
            const res = await apiService.post(
                `${API_CONFIG.ENDPOINTS.BRAND.BRAND}/${id}?_method=PUT`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            toast.success("Marka başarıyla güncellendi");
            await fetchBrands();
            return res.data.data;
        } catch (err) {
            setError(err.message);
            toast.error("Marka güncellenemedi");
            throw err;
        } finally {
            setLoading(false);
        }
    };




    return {
        brands,
        loading,
        error,
        fetchBrands,
        createBrand,
        deleteBrand,
        updateBrand,
    };
};

export default useBrand;
