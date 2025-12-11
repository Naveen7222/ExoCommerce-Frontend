import axios from "axios";

const API_URL = "/products";

export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
// api.js
export const addProduct = async (formData) => {
    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};
// export const addProduct = async (formData) => {
//     try {
//         const response = await axios.post(API_URL, formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error adding product:", error);
//         throw error;
//     }
// };
