import { useState } from 'react';

const usePaginationAndSearch = (data, itemsPerPage, searchFields) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filtrar datos según la búsqueda en múltiples campos
  const filteredData = data.filter((item) =>
    searchFields.some((field) =>
      item[field] && item[field].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calcular los datos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular número total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    currentItems,
    totalPages,
    paginate,
  };
};

export default usePaginationAndSearch;
