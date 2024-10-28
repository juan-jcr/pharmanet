import React, { createContext, useState, useEffect } from 'react';
import { getProducts, deleteProducts, saveProduct, updateProduct} from '../services/ProductService';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // Función para abrir el modal
  const openModal = (product = null) => {
    setProductToEdit(product); 
    setIsModalOpen(true);
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setProductToEdit(null);
    setIsModalOpen(false);
  }
  //Cargar los productos
  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  const addProduct = async (newProduct) => {
    try {
      const savedProduct = await saveProduct(newProduct);
      // Añadir un nuevo producto a la lista
      setProducts((prevProducts) => [...prevProducts, savedProduct]); 
      closeModal();
    } catch (err) {
      alert(err.message)
    }
  };

 

  const editProduct = async (updatedProduct) => {
    try {
      const updated = await updateProduct(updatedProduct);
      setProducts((prevProducts) => prevProducts.map((product) => (product.id === updatedProduct.id ? updated : product)));
      closeModal();
    } catch (err) {
      alert(err.message)
    }
  };
  const removeProduct = async (id) => {
    try {
      await deleteProducts(id);
      // Remover el producto del estado
      setProducts((prevProducts) => prevProducts.filter(product => product.id !== id)); 
    } catch (err) {
      setError(err.message);
    }
  };

  
  useEffect(() => {
    loadProducts();
  }, []);
  
  return (
    <ProductsContext.Provider
      value={{ 
        products,
        loading,
        error,
        addProduct,
        editProduct,
        removeProduct,
        openModal,
        closeModal,
        isModalOpen,
        productToEdit,
        setError  }}>
      {children}
    </ProductsContext.Provider>
  );

}