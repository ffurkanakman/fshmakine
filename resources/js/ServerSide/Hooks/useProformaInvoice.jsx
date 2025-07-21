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

export const useProformaInvoice = () => {
    const fetchProformas = async () => {
        try {
            const res = await apiService.get(API_CONFIG.ENDPOINTS.PROFORMA_INVOICE.PROFORMA_INVOICE);
            return res.data.data;
        } catch (error) {
            console.error("fetchProformas hatası:", error);
            if (handle401Error(error)) return;
            toast.error("Proformalar yüklenemedi");
            throw error;
        }
    };

    const getProformaById = async (id) => {
        try {
            const res = await apiService.get(`${API_CONFIG.ENDPOINTS.PROFORMA_INVOICE.PROFORMA_INVOICE}/${id}`);
            return res.data.data;
        } catch (error) {
            console.error("getProformaById hatası:", error);
            if (handle401Error(error)) return;
            toast.error("Proforma faturası yüklenemedi");
            throw error;
        }
    };

    const createProforma = async (data) => {
        try {
            const res = await apiService.post(API_CONFIG.ENDPOINTS.PROFORMA_INVOICE.PROFORMA_INVOICE, data);
            toast.success("Proforma faturası oluşturuldu");
            return res.data.data;
        } catch (error) {
            console.error("createProforma hatası:", error);
            if (handle401Error(error)) return;
            toast.error("Proforma faturası oluşturulamadı");
            throw error;
        }
    };

    const updateProforma = async (id, data) => {
        try {
            const res = await apiService.put(`${API_CONFIG.ENDPOINTS.PROFORMA_INVOICE.PROFORMA_INVOICE}/${id}`, data);
            toast.success("Proforma faturası güncellendi");
            return res.data.data;
        } catch (error) {
            console.error("updateProforma hatası:", error);
            if (handle401Error(error)) return;
            toast.error("Proforma faturası güncellenemedi");
            throw error;
        }
    };

    const deleteProforma = async (id) => {
        try {
            await apiService.delete(`${API_CONFIG.ENDPOINTS.PROFORMA_INVOICE.PROFORMA_INVOICE}/${id}`);
            toast.success("Proforma faturası silindi");
            return true;
        } catch (error) {
            console.error("deleteProforma hatası:", error);
            if (handle401Error(error)) return;
            toast.error("Proforma faturası silinemedi");
            throw error;
        }
    };

    return {
        fetchProformas,
        getProformaById,
        createProforma,
        updateProforma,
        deleteProforma,
    };
};

export default useProformaInvoice;
