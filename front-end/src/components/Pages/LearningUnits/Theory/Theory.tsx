import React, { useState, useEffect } from 'react';
import Selection, { Option } from '../Selection/Selection.component';
import { Pagination, Button } from '@mantine/core';
import { checkIfPageIsReload } from '../../../../utils/utils';

const Theory: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedOptionsByPage, setSelectedOptionsByPage] = useState<{
    [key: number]: string[];
  }>({});

  // Check if the page has been reloaded
  useEffect(() => {
    if (checkIfPageIsReload()) {
      // If the page has been reloaded, you can retrieve the selected options and current page from the localStorage
      const selectedOptionsFromStorage = JSON.parse(
        localStorage.getItem('selectedOptions') || '{}',
      );
      const currentPageFromStorage = JSON.parse(
        localStorage.getItem('currentPage') || '0',
      );
      setSelectedOptionsByPage(selectedOptionsFromStorage);
      setCurrentPageIndex(currentPageFromStorage);
    }
  }, []);

  // Load selected options and current page from local storage on component mount
  useEffect(() => {
    const storedSelectedOptions = localStorage.getItem('selectedOptions');
    const storedCurrentPage = localStorage.getItem('currentPage');
    if (storedSelectedOptions) {
      setSelectedOptionsByPage(JSON.parse(storedSelectedOptions));
    }
    if (storedCurrentPage) {
      setCurrentPageIndex(JSON.parse(storedCurrentPage));
    }
  }, []);

  // Update local storage whenever selectedOptionsByPage or currentPage changes
  useEffect(() => {
    localStorage.setItem(
      'selectedOptions',
      JSON.stringify(selectedOptionsByPage),
    );
    localStorage.setItem('currentPage', JSON.stringify(currentPageIndex));
  }, [selectedOptionsByPage, currentPageIndex]);

  const questions: { id: string; text: string; options: Option[][] }[] = [
    {
      id: 'question1',
      text: '1hello ___ world ___',
      options: [
        [
          { id: '1', label: 'English', isCorrect: false },
          { id: '2', label: 'German', isCorrect: false },
          { id: '3', label: 'Italian', isCorrect: false },
        ],
        [
          { id: '4', label: 'English', isCorrect: false },
          { id: '5', label: 'German', isCorrect: false },
          { id: '6', label: 'Italian', isCorrect: false },
        ],
      ],
    },
    {
      id: 'question2',
      text: '2hello ___ world ___',
      options: [
        [
          { id: '7', label: 'English', isCorrect: false },
          { id: '8', label: 'German', isCorrect: false },
          { id: '9', label: 'Italian', isCorrect: false },
        ],
        [
          { id: '10', label: 'English', isCorrect: false },
          { id: '11', label: 'German', isCorrect: false },
          { id: '12', label: 'Italian', isCorrect: false },
        ],
      ],
    },
    {
      id: 'question3',
      text: '3hello ___ world ___',
      options: [
        [
          { id: '13', label: 'English', isCorrect: false },
          { id: '14', label: 'German', isCorrect: false },
          { id: '15', label: 'Italian', isCorrect: false },
        ],
        [
          { id: '16', label: 'English', isCorrect: false },
          { id: '17', label: 'German', isCorrect: false },
          { id: '18', label: 'Italian', isCorrect: false },
        ],
      ],
    },
    {
      id: 'question4',
      text: '4hello ___ world ___',
      options: [
        [
          { id: '19', label: 'English', isCorrect: false },
          { id: '20', label: 'German', isCorrect: false },
          { id: '21', label: 'Italian', isCorrect: false },
        ],
        [
          { id: '22', label: 'English', isCorrect: false },
          { id: '23', label: 'German', isCorrect: false },
          { id: '24', label: 'Italian', isCorrect: false },
        ],
      ],
    },
    {
      id: 'question5',
      text: '5hello ___ world ___',
      options: [
        [
          { id: '25', label: 'English', isCorrect: false },
          { id: '26', label: 'German', isCorrect: false },
          { id: '27', label: 'Italian', isCorrect: false },
        ],
        [
          { id: '28', label: 'English', isCorrect: false },
          { id: '29', label: 'German', isCorrect: false },
          { id: '30', label: 'Italian', isCorrect: false },
        ],
      ],
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPageIndex(page - 1);
  };

  const handleSelect = (selectedOptionId: string) => {
    setSelectedOptionsByPage((prev) => ({
      ...prev,
      [currentPageIndex]: [...(prev[currentPageIndex] || []), selectedOptionId],
    }));
  };

  const handleSubmit = () => {
    console.log(selectedOptionsByPage);
    // Your submission logic here
  };

  return (
    <div>
      <Selection
        text={questions[currentPageIndex].text}
        optionsSets={questions[currentPageIndex].options}
        placeholder="Select Option"
        onSelect={handleSelect}
        page={currentPageIndex}
        selectedOptions={selectedOptionsByPage[currentPageIndex] || []}
      />
      <Pagination
        total={questions.length}
        value={currentPageIndex + 1}
        onChange={handlePageChange}
      />
      {currentPageIndex === questions.length - 1 && (
        <Button onClick={handleSubmit} style={{ marginTop: '10px' }}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default Theory;
