import ReactDOM from "react-dom/client";
import React, { Suspense } from "react";
import ListenLoad from "./Listen/Load.jsx";
// import {Store} from "./Repo/Redux/Load.jsx";
import {Provider} from "react-redux";
import Loader from "./Components/Loader"; // Loader komponenti import edin

// Loader için stil tanımı
const loaderStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 9999
};

const rootElement = document.getElementById('efixed');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <Suspense fallback={
            <div style={loaderStyle}>
                <Loader />
            </div>
        }>
            {/*<Provider store={Store}>*/}
            <ListenLoad/>
            {/*</Provider>*/}
        </Suspense>
    );
}
