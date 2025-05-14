import { Slide, ToastContainer } from "react-toastify";

export default function ToastifyContainer() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={2700}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
        />
    );
}