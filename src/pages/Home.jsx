import React, { useState, useContext, useEffect } from 'react';
import { ProductsContext } from '../context/ProductContext'
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { ProductForm } from '../components/ProductForm';
import useExpandableRows from '../components/useExpandableRows';
import usePaginationAndSearch from '../components/UsePaginationAndSearch';

export const Home = () => {
  const { products, removeProduct, loading, openModal, isModalOpen } = useContext(ProductsContext);
  const { expandedRows, toggleExpandRow } = useExpandableRows();

  const itemsPerPage = 5;

  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    currentItems,
    totalPages,
    paginate,
  } = usePaginationAndSearch(products, itemsPerPage, ['name']);


  if (loading) {
    return <p>Cargando...</p>;
  }
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar la presentación?')) {
      removeProduct(id); // Llamar a la función de eliminar del contexto
    }
  };



  return (
    <div className='w-full h-full p-4 rounded-xl border'>
      <p>Gestión productos</p>

      <div className="bg-gray-100 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => openModal()}
            className="p-1 border border-primary  text-secondary-100 hover:bg-primary   transition-colors   w-20 rounded-sm"
            >
            Agregar
          </button>
        </div>
        <input type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          className="py-2 pl-8 pr-4 px-4 w-full mt-2 outline-none rounded-lg border-green-300 border" />
      </div>
      {products.length > 0 ? (
        <div className='rounded-lg bg-clip-border shadow-md border  flex flex-col w-full overflow-x-auto'>
          <table className="min-w-full  text-left table-auto">
            <thead>
              <tr>
                <th className='p-4 border-b border-slate-600 bg-slate-700'>
                  <p className='text-sm font-normal leading-none text-slate-300 '>Item</p>
                </th>
                <th className='p-4 border-b border-slate-600 bg-slate-700'>
                  <p className='text-sm font-normal leading-none text-slate-300'>Nombre</p>
                </th>
                <th className='p-4 border-b border-slate-600 bg-slate-700  '>
                  <p className='text-sm font-normal leading-none text-center text-slate-300'>Precio</p>
                </th>
                <th className='p-4 border-b border-slate-600 bg-slate-700 hidden md:table-cell'>
                  <p className='text-sm font-normal leading-none text-slate-300 '>F expiración</p>
                </th>
                <th className='p-4 border-b border-slate-600 bg-slate-700 hidden md:table-cell'>
                <p className='text-sm font-normal leading-none text-slate-300'>Acciones</p>
                </th>

              </tr>
            </thead>
            <tbody>
              {currentItems.map((product) => (
                <React.Fragment key={product.id}>
                  <tr>
                    <td className='p-2 border-b border-slate-700'>
                    <button
                        className="text-md  bg-blue-500/10   p-1 box-content rounded-xl"
                        onClick={() => toggleExpandRow(product.id)}
                      >
                        {expandedRows.includes(product.id) ? <IoIosRemoveCircleOutline className='text-red-600' /> : <FaPlus className='text-primary' />}
                      </button>
                    </td>
                    <td className='p-1 border-b border-slate-700'>
                      <p className='text-sm text-secondary-100 '>{product.name}</p>
                    </td>
                    <td className='p-1 border-b border-slate-700 '>
                      <p className='text-sm text-white  text-md  bg-primary text-center  box-content rounded-xl '>
                       ${product.price}
                      </p>
                    </td>
                    <td className='p-1 border-b border-slate-700 hidden md:table-cell'>
                      <p className='text-sm text-secondary-100  font-semibold'>{product.expirationDate}</p>
                    </td>
                    <td className='p-1 border-b border-slate-700 hidden md:table-cell'>
                      <div className='flex gap-4 '>
                        <button  onClick={() => handleDelete(product.id)}>
                          <FaTrash className="text-md  bg-pink-500/10 text-red-600  p-2 box-content rounded-xl cursor-pointer" />
                        </button>

                        <button onClick={() => openModal(product)}>
                          <FaEdit className='text-md  bg-green-500/10 text-green-600  p-2 box-content rounded-xl cursor-pointer' />
                        </button>
                      </div>
                    </td>

                  </tr>
                  {expandedRows.includes(product.id) && (
                    <tr className="border-t">
                      <td colSpan="8" className="px-4 py-2 bg-gray-200">
                        <p className='md:hidden'><strong>F expiración:</strong> {product.expirationDate}</p>
                        
                        <p><strong>Descripción:</strong> {product.description}</p>
                        <div className='flex gap-4 md:hidden flex-row-reverse'>
                          <button  onClick={() => handleDelete(product.id)}>
                            <FaTrash className="text-md  bg-pink-500/10 text-red-600  p-2 box-content rounded-xl " />
                          </button>
                          <button onClick={() => openModal(product)} >
                            <FaEdit className='text-md  bg-green-500/10 text-green-600  p-2 box-content rounded-xl' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
      {isModalOpen && <ProductForm />}

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
