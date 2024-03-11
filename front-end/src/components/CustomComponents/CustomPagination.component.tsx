import React from 'react';
import { Center, Container, Pagination } from '@mantine/core';

interface CustomPaginationProps {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  total,
  currentPage,
  onPageChange,
}) => {
  return (
    <Container
      size="sm"
      style={{
        margin: 'auto',
        maxWidth: '80%',
        textAlign: 'center',
      }}
    >
      <Center>
        <Pagination total={total} value={currentPage} onChange={onPageChange} />
      </Center>
    </Container>
  );
};

export default CustomPagination;
