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

  // Get grouped questions
  const groupedQuestions = groupQuestionsByOrder(selectionQuestions);

  // Ensure currentPage is within valid range
  const maxPage = Object.keys(groupedQuestions).length;
  if (currentPage < 1 || currentPage > maxPage) {
    return <div>Invalid page number.</div>;
  }

  // Function to render content based on the current page
  const renderContent = () => {
    const orderedQuestions = Object.values(groupedQuestions).flat();
    const currentQuestion = orderedQuestions.find(
      (question) => question.questionOrder === currentPage,
    );

    if (!currentQuestion) {
      // Handle the case where the current question is not found
      return null;
    }

    const { type } = currentQuestion;

    switch (type) {
      case 'selection':
        return (
          <SelectionContent
            selectionQuestions={groupedQuestions[currentPage] || []}
          />
        );
      case 'dragNdrop':
        // Pass the current question to the DragNDrop component
        return (
          <DragNDrop
            questions={groupedQuestions[currentPage]}
            currentPage={currentPage}
          />
        );
      default:
        // Handle unknown question types
        return null;
    }
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <div style={{ paddingBottom: '100px' }}>
        {/* Ensure space for pagination at the bottom */}
        {renderContent()}
      </div>

      <CustomPagination
        total={maxPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Theory;
