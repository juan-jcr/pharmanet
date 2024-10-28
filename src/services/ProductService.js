import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1/products';

export const getProducts = async () => {
	try {
		const response = await axios.get(`${API_URL}/all`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
export const deleteProducts = async (id) => {


	try {
		const response = await axios.delete(`${API_URL}/delete/${id}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data; // Retorna la respuesta en caso de éxito
	} catch (error) {
		throw error;
	}
};

export const saveProduct = async (productData) => {
	try {
		const response = await axios.post(`${API_URL}/add`, productData, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.data;
	} catch (error) {
		throw  error;
	}
};



export const updateProduct = async (product) => {

	try {
		const response = await axios.put(`${API_URL}/update/${product.id}`, product, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data; // Retorna la respuesta en caso de éxito
	} catch (error) {
		throw error;
	}
};