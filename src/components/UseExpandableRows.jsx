import { useState } from 'react';

const useExpandableRows = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleExpandRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  return {
    expandedRows,
    toggleExpandRow,
  };
};

export default useExpandableRows;