import React, { useState, useContext, useEffect } from 'react';
import { ProductsContext } from '../context/ProductContext';
import { IoMdClose } from "react-icons/io";

export const ProductForm = () => {
  const { addProduct, editProduct, closeModal, productToEdit, setError } = useContext(ProductsContext);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    expirationDate: '',
    description: ''
  });

  // Cargar datos cuando se edita un producto
  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  // Manejar cambios en los inputs normales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productToEdit) {
        await editProduct(product);
      } else {
        await addProduct(product);
      }
      closeModal();  // Cerrar el modal después de guardar
    } catch (err) {
      setError("Error al guardar el producto.");
    }
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-baseline gap-5 justify-center  z-50">
      <div className="bg-white p-2 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto absolute top-10">
        <div className='flex justify-between p-3'>
          <h2 className="text-xl font-bold mb-4">{productToEdit ? "Editar Producto" : "Nuevo producto"}</h2>
          <IoMdClose onClick={closeModal}
            className="text-secondary-100 text-xl  cursor-pointer hover:text-lg" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="block w-full border-2  px-3.5 py-2  outline-none rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Precio
              </label>
              <div className="mt-2.5">
                <input
                  type="number"
                  name='price'
                  value={product.price}
                  onChange={handleChange}
                  required
                  className="block w-full border-2  px-3.5 py-2  outline-none rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Fecha expiración
              </label>
              <div className="mt-2.5">
                <input
                  type="Date"
                  name='expirationDate'
                  value={product.expirationDate}
                  onChange={handleChange}
                  required
                  className="block w-full border-2  px-3.5 py-2  outline-none rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descripción
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name='description'
                  value={product.description}
                  onChange={handleChange}
            
                  className="block w-full border-2  px-3.5 py-2  outline-none rounded-lg"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="p-1 bg-primary  text-white  transition-colors   w-32 rounded-sm mt-6"
          >
            {productToEdit ? "Actualizar" : "Guardar"}
          </button>
          <button
            onClick={closeModal}
            type="button"
            className="p-1 bg-white border-2  text-black  transition-colors   w-32 rounded-sm mt-6 ml-3">
            Cerrar
          </button>
        </form>
      </div>
    </div>
  )
}

