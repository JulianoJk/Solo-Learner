/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Divider,
  Card,
  Box,
  Center,
  ScrollArea,
  Checkbox,
  Collapse,
  Text,
  Alert,
} from '@mantine/core';

import { useState } from 'react';
import { useForm } from '@mantine/form';
import { DateInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';

const RegisterNewUser = () => {
  const [isOtherClicked, toogleIsOtherClicked] = useDisclosure(false);
  const [openSectionTwo, toggleSectionTwo] = useDisclosure(false);
  const [openSectionThree, toggleSectionThree] = useDisclosure(false);
  const [isSameAsAboveChecked, toogleIsSameAsAboveChecked] =
    useDisclosure(false);
  const [errorResponse, setErrorResponse] = useState('');
  const [dateError, setDateError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const form = useForm({
    initialValues: {
      // Section 1
      dateReported: '',
      time: '',
      campusLocation: '',
      status: {
        injuryOrIllness: false,
        unsafeCondition: false,
        environmentalSpill: false,
        fire: false,
        laboratorySpillORIncident: false,
        nonVehicularAccident: false,
        other: false,
      },
      otherType: '',
      // Section 2
      sectionTwoType: {
        none: false,
        physicalInjury: false,
        occupationalIllness: false,
        potentialHarmfulExposure: false,
      },
      treatment: {
        none: false,
        firstAid: false,
        emergencyMedicalServices: false,
        personalPhysician: false,
        studentHealthServices: false,
        hospitalOutpatient: false,
        hospitalAdmitted: false,
      },
      // Section 3
      damagedOrLostItems: {
        none: false,
        personalProperty: false,
        UniversityProperty: false,
      },
      descriptionDamagesOrItemsLost: '',
      reportCompletedBy: {
        sameAsAbove: false,
        otherCompletedByname: '',
        otherCompletedByphone: '',
        otherCompletedByemail: '',
        otherCompletedBydateReported: '',
      },
    },
  });

  const onSectionOneStatusChange = (event: any) => {
    form.setFieldValue('status', {
      ...form.values.status,
      // this line is updating the value of the type object in the form values
      [event.target.value]: event.target.checked,
    });
  };
  const onSectionTwoTypeChange = (event: any) => {
    form.setFieldValue('sectionTwoType', {
      ...form.values.sectionTwoType,
      // this line is updating the value of the type object in the form values
      [event.target.value]: event.target.checked,
    });
  };
  const onTreatmentChange = (event: any) => {
    form.setFieldValue('treatment', {
      ...form.values.treatment,
      // this line is updating the value of the type object in the form values
      [event.target.value]: event.target.checked,
    });
  };

  const onDamagedOrLostItemsChange = (event: any) => {
    form.setFieldValue('damagedOrLostItems', {
      ...form.values.damagedOrLostItems,
      // this line is updating the value of the type object in the form values
      [event.target.value]: event.target.checked,
    });
  };
  const onReportCompletedByChange = (event: any) => {
    form.setFieldValue('reportCompletedBy', {
      ...form.values.reportCompletedBy,
      // this line is updating the value of the type object in the form values
      [event.target.value]: event.target.checked,
    });
  };

  const onReportSubmit = async (values: any) => {
    setErrorResponse('');
    setIsSuccess(null);
    // const updatedValues = {
    //   ...values,
    //   userEmail: userInfo.email,
    //   userName: userInfo.username,
    // };
    // const res = await newReportAPI(updatedValues);
    // res.status === 'success' ? setIsSuccess(true) : setErrorResponse(res.data);
    // form.reset();
  };

  return (
    <Center>
      <Card sx={{ width: 1100, border: '1px solid black' }}>
        <ScrollArea h={600}>
          <form onSubmit={form.onSubmit(onReportSubmit)}>
            <Box>
              <Title
                size="md"
                sx={(theme) => ({
                  fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                })}
                weight={900}
                align="center"
              >
                SECTION 1 - INCIDENT INFORMATION
                <Divider my="sm" />
              </Title>
            </Box>

            <SimpleGrid
              cols={2}
              mt="xl"
              breakpoints={[{ maxWidth: 'md', cols: 2 }]}
            >
              <DateInput
                valueFormat="DD/MM/YYYY"
                error={dateError}
                maxDate={new Date()}
                minDate={new Date(1990, 1, 1)}
                label="Date of the Incident (MM/DD/YYYY)"
                placeholder="Pick date"
                variant="filled"
                maw={500}
                mx="auto"
                sx={{ width: '100%' }}
                // onChange={(value) => {
                //   form.setFieldValue('dateReported', value.toString());
                //   setDateError(null);
                // }}
                withAsterisk
              />
              <TimeInput
                label="Time (HH:MM)"
                variant="filled"
                description="Press space for more options"
                withAsterisk
                onChange={(event: any) => {
                  form.setFieldValue('time', event.target.value.toString());
                }}
              />
              <TextInput
                withAsterisk
                label="Campus Location"
                placeholder="Campus Location"
                name="Campus Location"
                variant="filled"
                {...form.getInputProps('campusLocation')}
              />

              <Checkbox.Group label="Status:" withAsterisk>
                <Group mt="md">
                  <Checkbox
                    value="injuryOrIllness"
                    label="Injury/Illness"
                    onClick={(value) => {
                      onSectionOneStatusChange(value);
                      toggleSectionTwo.toggle();
                    }}
                  />
                  <Checkbox
                    value="unsafeCondition"
                    label="Unsafe Condition"
                    onClick={(value) => onSectionOneStatusChange(value)}
                  />
                  <Checkbox
                    value="environmentalSpill"
                    label="Environmental Spill"
                    onClick={(value) => onSectionOneStatusChange(value)}
                  />
                  <Checkbox
                    value="fire"
                    label="Fire"
                    onClick={(value) => onSectionOneStatusChange(value)}
                  />
                  <Checkbox
                    value="laboratorySpillORIncident"
                    label="Laboratory Spill/Incident"
                    onClick={(value) => onSectionOneStatusChange(value)}
                  />
                  <Checkbox
                    value="nonVehicularAccident"
                    label="Non-Vehicular Accident"
                    onClick={(value) => {
                      onSectionOneStatusChange(value);
                      toggleSectionThree.toggle();
                    }}
                  />
                  <Checkbox
                    value="other"
                    label="Other"
                    onClick={(value) => {
                      onSectionOneStatusChange(value);
                      toogleIsOtherClicked.toggle();
                    }}
                  />
                </Group>
              </Checkbox.Group>
            </SimpleGrid>
            <Collapse in={isOtherClicked}>
              <TextInput
                withAsterisk
                label="Please specify"
                placeholder="Please specify the other type"
                name="otherType"
                variant="filled"
                {...form.getInputProps('otherType')}
              />
            </Collapse>
            <Textarea
              mt="md"
              label="Description and cause of the incident"
              description="Indicate conditions such as weather, construction, cleaning, etc. with
                your explanation. Visitors should include their purpose for being on campus."
              placeholder="Your message"
              maxRows={10}
              minRows={5}
              autosize
              name="message"
              variant="filled"
              {...form.getInputProps('message')}
            />
            <Collapse in={openSectionTwo}>
              <Box sx={{ marginTop: '1rem' }}>
                <Title
                  size="md"
                  sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                  })}
                  weight={900}
                  align="center"
                >
                  SECTION 2 - INJURY OR ILLNESS
                  <Divider my="sm" />
                </Title>
              </Box>
              <Checkbox.Group label="Type:" withAsterisk>
                <Group mt="md">
                  <Checkbox
                    value="none"
                    label="None"
                    onClick={(value) => onSectionTwoTypeChange(value)}
                  />
                  <Checkbox
                    value="physicalInjury"
                    label="Physical Injury"
                    onClick={(value) => onSectionTwoTypeChange(value)}
                  />
                  <Checkbox
                    value="occupationalIllness"
                    label="Occupational Illness"
                    onClick={(value) => onSectionTwoTypeChange(value)}
                  />
                  <Checkbox
                    value="potentialHarmfulExposure"
                    label="Potential Harmful Exposure"
                    onClick={(value) => onSectionTwoTypeChange(value)}
                  />
                </Group>
              </Checkbox.Group>
              <Textarea
                mt="md"
                label="Injured Persons and Description of Injuries:"
                placeholder="Your message"
                maxRows={10}
                minRows={5}
                autosize
                name="DescriptionAndCauseOfTheIncident"
                variant="filled"
                {...form.getInputProps('descriptionAndCauseOfTheIncident')}
              />
              <Checkbox.Group label="Type:" withAsterisk>
                <Group mt="md">
                  <Checkbox
                    value="none"
                    label="None"
                    onClick={(value) => onTreatmentChange(value)}
                  />
                  <Checkbox
                    value="firstAid"
                    label="1st Aid"
                    onClick={(value) => onTreatmentChange(value)}
                  />
                  <Checkbox
                    value="emergencyMedicalServices"
                    label="Emergency Medical Services"
                    onClick={(value) => onTreatmentChange(value)}
                  />
                  <Checkbox
                    value="personalPhysician"
                    label="Personal Physician"
                    onClick={(value) => onTreatmentChange(value)}
                  />
                  <Checkbox
                    value="studentHealthServices"
                    label="Student Health Services"
                    onClick={(value) => onTreatmentChange(value)}
                  />
                  <Checkbox
                    value="hospitalOutpatient"
                    label="Hospital (Outpatient)"
                    onClick={(value) => onTreatmentChange(value)}
                  />
                  <Checkbox
                    value="hospitalAdmitted"
                    label="Hospital (Admitted)"
                    onClick={(value) => onTreatmentChange(value)}
                  />
                </Group>
              </Checkbox.Group>
            </Collapse>
            <Collapse in={openSectionThree}>
              <Box sx={{ marginTop: '1rem' }}>
                <Title
                  size="md"
                  sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                  })}
                  weight={900}
                  align="center"
                >
                  SECTION 3 - INJURY OR ILLNESS
                  <Divider my="sm" />
                </Title>
              </Box>
              <Checkbox.Group label="Damaged or Lost Items:" withAsterisk>
                <Group mt="md">
                  <Checkbox
                    value="none"
                    label="None"
                    onClick={(value) => onDamagedOrLostItemsChange(value)}
                  />
                  <Checkbox
                    value="personalProperty"
                    label="Personal Property"
                    onClick={(value) => onDamagedOrLostItemsChange(value)}
                  />
                  <Checkbox
                    value="UniversityProperty"
                    label="University Property"
                    onClick={(value) => onDamagedOrLostItemsChange(value)}
                  />
                </Group>
              </Checkbox.Group>
              <Textarea
                mt="md"
                label="Description of Damages or Items Lost:"
                description="Include approximate value if the items are insured"
                placeholder="Your message"
                maxRows={10}
                minRows={5}
                autosize
                name="descriptionDamagesOrItemsLost"
                variant="filled"
                {...form.getInputProps('descriptionDamagesOrItemsLost')}
              />
              <Checkbox.Group label="Damaged or Lost Items:" withAsterisk>
                <Checkbox
                  value="sameAsAbove"
                  label="Same as Above"
                  onClick={(value) => {
                    onReportCompletedByChange(value);
                    toogleIsSameAsAboveChecked.toggle();
                  }}
                />
                <Text fw={700} sx={{ margin: 10 }}>
                  Or
                </Text>

                <TextInput
                  withAsterisk
                  label="Last Name"
                  placeholder="Last name"
                  name="Last name"
                  variant="filled"
                  disabled={isSameAsAboveChecked}
                  {...form.getInputProps('lastName')}
                />
              </Checkbox.Group>
              <SimpleGrid cols={2} mt="xs">
                <TextInput
                  withAsterisk
                  label="Phone"
                  placeholder="Phone number"
                  name="Phone"
                  variant="filled"
                  disabled={isSameAsAboveChecked}
                  {...form.getInputProps('phone')}
                />
                <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="Your email"
                  name="email"
                  variant="filled"
                  disabled={isSameAsAboveChecked}
                  {...form.getInputProps('email')}
                />
              </SimpleGrid>
              <DateInput
                valueFormat="DD/MM/YYYY"
                error={dateError}
                maxDate={new Date()}
                minDate={new Date(1990, 1, 1)}
                label="Date Reported (MM/DD/YYYY)"
                placeholder="Pick date"
                variant="filled"
                maw={500}
                mx="auto"
                disabled={isSameAsAboveChecked}
                sx={{ width: '100%' }}
                onChange={(value) => {
                  // form.setFieldValue('dateReported', value.toString());
                  setDateError(null);
                }}
                withAsterisk
              />
            </Collapse>

            {isSuccess ? (
              <Alert title="Success!" color="green">
                User registered successfully!
              </Alert>
            ) : null}
            <Group position="center" mt="xl">
              <Button type="submit" size="md">
                Submit Report
              </Button>
            </Group>
          </form>
        </ScrollArea>
      </Card>
    </Center>
  );
};
export default RegisterNewUser;
