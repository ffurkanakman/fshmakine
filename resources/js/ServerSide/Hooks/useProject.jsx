import {useDispatch, useSelector} from 'react-redux';
import {
    setError,
    setLoading,
    setProjects,
    addProject
}  from '../../Repo/Redux/Modules/projectSlice.jsx';
import { API_CONFIG } from "../EndPoints";
import { toast } from "react-toastify";
import { apiService } from '../Load';


export const useProject = () => {
    const dispatch = useDispatch();
    const { projects, loading, error } = useSelector(state => state.project);

    const setProject = async () => {
        try {
            dispatch(setLoading(true));

            const response = await apiService.get(API_CONFIG.ENDPOINTS.PROJECTS.PROJECTS);

            // Sadece data kısmını dispatch et
            dispatch(setProjects(response.data));

            return response.data;

        } catch (error) {
            dispatch(setError(error.message));
            toast.error('Yüklenemedi...')
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const saveProject = async (projectData) => {
        try {
            dispatch(setLoading(true));

            // API endpoint'e veri gönderme işlemi
            const response = await apiService.post(API_CONFIG.ENDPOINTS.PROJECTS.SAVE_PROJECT, projectData);

            // Redux store'a projeyi ekle
            dispatch(addProject(response.data.data || projectData));

            // Return the saved project data
            return response.data.data || projectData;

        } catch (error) {
            dispatch(setError(error.message));
            toast.error('Proje kaydedilemedi');
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        projects,
        loading,
        error,
        setProjects: setProject,
        saveProject
    };
};
