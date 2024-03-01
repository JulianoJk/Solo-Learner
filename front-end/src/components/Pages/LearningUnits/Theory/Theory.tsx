import React, { useState } from 'react';
import SelectionContent from '../TextWithSelection/SelectionContent.component';
import { dragNdropQuestions } from '../constants';
import DragNDrop from '../DragNDrop/DragNDrop.component';
import CustomPagination from '../../../CustomComponents/CustomPagination.component';

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
    <div style={{ width: '80%', margin: 'auto' }}>
      <div style={{ paddingBottom: '100px' }}>
        {' '}
        {/* Ensure space for pagination at the bottom */}
        {renderContent()}
      </div>

      <CustomPagination
        total={3}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Theory;
