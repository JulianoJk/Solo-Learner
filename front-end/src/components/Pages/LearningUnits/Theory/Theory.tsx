import React, { useState } from 'react';
import SelectionContent from '../TextWithSelection/SelectionContent.component';
import { Pagination } from '@mantine/core';
import { dragNdropQuestions } from '../constants';
import DragNDrop from '../DragNDrop/DragNDrop.component';

const Theory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Function to render content based on the current page
  const renderContent = () => {
    switch (currentPage) {
      case 1:
        return <SelectionContent />;
      case 2:
        return <DragNDrop questions={dragNdropQuestions} />;
      case 3:
        return <p>World</p>;
      default:
        return null;
    }
  };

  return (
    <>
      {renderContent()}

      <Pagination
        total={3} // Total number of pages
        value={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default Theory;
