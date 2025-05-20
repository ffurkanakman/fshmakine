import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useServis } from '../../../ServerSide/Hooks/useServis'; // kendi yazdığın hook

const ServisList = () => {
    const { setServisler } = useServis();
    const servisler = useSelector(state => state.servis.servisler);
    const loading = useSelector(state => state.servis.loading);
    const error = useSelector(state => state.servis.error);

    useEffect(() => {
        setServisler();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Servis Listesi</h1>

            {loading && <p className="text-blue-500">Yükleniyor...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <ul className="space-y-2">
                {servisler?.map((servis) => (
                    <li key={servis.id} className="p-3 border rounded bg-white shadow">
                        <strong>{servis.code}</strong> — {servis.company_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServisList;
