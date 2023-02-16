import {Card, Center, SimpleGrid, Text} from '@mantine/core'
import React from 'react'
import TheoryIcon from '../../../images/TheoryIcon'
import GrammarIcon from '../../../images/GrammarIcon'
import {useStyles} from './LearningUnits.styles'

const LearningUnits = () => {
  const {classes} = useStyles()
  return (
    <Center>
      <SimpleGrid
        cols={2}
        spacing="xl"
        verticalSpacing="xl"
        className={classes.sectionContainer}
      >
        <Card
          shadow="sm"
          p="xl"
          component="a"
          href="/learning-units/Theory"
          className={classes.root}
        >
          <Card.Section>
            <span>
              <Text weight={500} size="lg" mt="md">
                Theory
              </Text>
              <TheoryIcon />
            </span>
          </Card.Section>
        </Card>

        <Card
          shadow="sm"
          p="xl"
          component="a"
          href="#"
          className={classes.root}
        >
          <Card.Section>
            <span>
              <GrammarIcon />
            </span>
          </Card.Section>

          <Text weight={500} size="lg" mt="md">
            Grammar
          </Text>
        </Card>
      </SimpleGrid>
    </Center>
  )
}
export default LearningUnits
