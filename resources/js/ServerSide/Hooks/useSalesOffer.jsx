import { apiService } from "../Load";
import { toast } from "react-toastify";
import { API_CONFIG } from "../Endpoints";
import { ROUTES } from "../../Libs/Routes/config";

// 401 error handler
const handle401Error = (error) => {
    if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = ROUTES.AUTH.LOGIN;
        return true;
    }
    return false;
};

export const useSalesOffer = () => {
    const fetchSalesOffers = async () => {
        try {
            const res = await apiService.get(API_CONFIG.ENDPOINTS.SALES_OFFER.SALES_OFFER);
            return res.data.data;
        } catch (error) {
            console.error("fetchSalesOffers hatası:", error);
            if (handle401Error(error)) return;
            toast.error("Satış teklifleri yüklenemedi");
            throw error;
        }
    };

    const getSalesOfferById = async (id) => {
        try {
            const res = await apiService.get(`${API_CONFIG.ENDPOINTS.SALES_OFFER.SALES_OFFER}/${id}`);
            return res.data.data;
        } catch (error) {
            console.error("getSalesOfferById hatası:", error);
            if (handle401Error(error)) return;
            toast.error("Satış teklifi yüklenemedi");
            throw error;
        }
    };

    const createSalesOffer = async (data) => {
        console.log("createSalesOffer ÇALIŞTI. Data:", data);
        console.log("Kullanılan endpoint:", API_CONFIG.ENDPOINTS.SALES_OFFER.SALES_OFFER);
        try {
            const res = await apiService.post(API_CONFIG.ENDPOINTS.SALES_OFFER.SALES_OFFER, data);
            console.log("API response:", res);
            toast.success("Satış teklifi oluşturuldu");
            return res.data.data;
        } catch (error) {
            console.error("createSalesOffer hatası:", error);
            if (handle401Error(error)) return;
            toast.error("Satış teklifi oluşturulamadı");
            throw error;
        }
    };

    const updateSalesOffer = async (id, data) => {
        try {
            const res = await apiService.put(
                `${API_CONFIG.ENDPOINTS.SALES_OFFER.SALES_OFFER}/${id}`,
                data
            );
            toast.success("Satış teklifi güncellendi");
            return res.data.data;
        } catch (error) {
            console.error("updateSalesOffer hatası:", error);
            if (handle401Error(error)) return;
            toast.error("Satış teklifi güncellenemedi");
            throw error;
        }
    };

    const deleteSalesOffer = async (id) => {
        try {
            await apiService.delete(`${API_CONFIG.ENDPOINTS.SALES_OFFER.SALES_OFFER}/${id}`);
            toast.success("Satış teklifi silindi");
            return true;
        } catch (error) {
            console.error("deleteSalesOffer hatası:", error);
            if (handle401Error(error)) return;
            toast.error("Satış teklifi silinemedi");
            throw error;
        }
    };

    return {
        fetchSalesOffers,
        getSalesOfferById,
        createSalesOffer,
        updateSalesOffer,
        deleteSalesOffer
    };
};

export default useSalesOffer;
