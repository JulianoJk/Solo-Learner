import React, { useState } from 'react';
import SelectionContent from '../TextWithSelection/SelectionContent.component';
import DragNDrop from '../DragNDrop/DragNDrop.component';
import CustomPagination from '../../../CustomComponents/CustomPagination.component';
import { selectionQuestions } from '../constants';

const Theory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Function to group questions by questionOrder
  const groupQuestionsByOrder = (questions: any[]) => {
    const groupedQuestions: { [order: number]: any[] } = {};

    questions.forEach((question) => {
      const { questionOrder } = question;
      if (!groupedQuestions[questionOrder]) {
        groupedQuestions[questionOrder] = [];
      }
      groupedQuestions[questionOrder].push(question);
    });

    return groupedQuestions;
  };

  // Function to render content based on the current page
  const renderContent = () => {
    const groupedQuestions = groupQuestionsByOrder(selectionQuestions);

    switch (currentPage) {
      case 1:
        return (
          <SelectionContent
            selectionQuestions={groupedQuestions[currentPage] || []}
          />
        );
      default:
        // Pass the current question to the DragNDrop component
        return (
          <DragNDrop
            question={
              groupedQuestions[currentPage]
                ? groupedQuestions[currentPage][0]
                : null
            }
          />
        );
    }
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <div style={{ paddingBottom: '100px' }}>
        {/* Ensure space for pagination at the bottom */}
        {renderContent()}
      </div>

      <CustomPagination
        total={Object.keys(groupQuestionsByOrder(selectionQuestions)).length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Theory;
