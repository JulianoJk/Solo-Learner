import React from 'react';
import { Table, Anchor, Text, Group, ScrollArea } from '@mantine/core';
import { classes } from './Studentmanagment.modules.css';

interface TableReviewsProps {
  data: {
    title: string;
    author: string;
    year: number;
    reviews: { positive: number; negative: number };
  }[];
}

export function Studentmanagment({ data }: TableReviewsProps) {
  const rows = data.map((row) => {
    const totalReviews = row.reviews.negative + row.reviews.positive;
    const positiveReviews = (row.reviews.positive / totalReviews) * 100;
    const negativeReviews = (row.reviews.negative / totalReviews) * 100;

    return (
      <tr key={row.title}>
        <td>
          <Anchor component="button" fz="sm">
            {row.title}
          </Anchor>
        </td>
        <td>{row.year}</td>
        <td>
          <Anchor component="button" fz="sm">
            {row.author}
          </Anchor>
        </td>
        <td>{Intl.NumberFormat().format(totalReviews)}</td>
        <td>
          <Group justify="space-between">
            <Text fz="xs" c="teal" fw={700}>
              {positiveReviews.toFixed(0)}%
            </Text>
            <Text fz="xs" c="red" fw={700}>
              {negativeReviews.toFixed(0)}%
            </Text>
          </Group>
          {/* <Progress
            // classNames={{ bar: classes.progressBar }}
            sections={[
              {
                value: positiveReviews,
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.teal[9]
                    : theme.colors.teal[6],
              },
              {
                value: negativeReviews,
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.red[9]
                    : theme.colors.red[6],
              },
            ]}
          /> */}
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table style={{ minWidth: 800 }} verticalSpacing="xs">
        <thead>
          <tr>
            <th className={classes.th}>Book title</th>
            <th>Year</th>
            <th className={classes.th}>Author</th>
            <th className={classes.th}>Reviews</th>
            <th className={classes.th}>Reviews distribution</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
