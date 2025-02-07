import {
  Avatar,
  Container,
  Group,
  Radio,
  SimpleGrid,
  Stack,
  TextInput,
  Select,
  useCombobox,
  Combobox,
  ScrollArea,
  useMantineColorScheme,
  CloseButton,
} from '@mantine/core';
import {
  hasLength,
  isEmail,
  isNotEmpty,
  matchesField,
  useForm,
} from '@mantine/form';
import React, { useEffect, useState } from 'react';
import { getCountriesAPI } from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import PhoneSelector from '../../Auth/phoneSelector/PhoneSelector.component';
interface Country {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
}
const RegisterUser = () => {
  const { colorScheme } = useMantineColorScheme();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const { data: countries, isLoading } = useQuery<Country[]>(
    ['getCountries'],
    getCountriesAPI,
  );

  const countryOptions = countries
    ? countries.map((country) => ({
        name: { common: country.name.common },
        flags: { svg: country.flags.svg },
      }))
    : [];

  const filteredOptions = countryOptions.filter((country) =>
    country.name.common
      .toLowerCase()
      .includes(selectedCountry?.name.common.toLowerCase().trim() || ''),
  );
  useEffect(() => {
    // we need to wait for options to render before we can select first one
    combobox.selectFirstOption();
  }, [filteredOptions]);
  const options = filteredOptions.map((country) => (
    <Combobox.Option
      value={country.name.common}
      key={country.name.common}
      sx={{
        ':hover': {
          backgroundColor: colorScheme === 'dark' ? '#3f3d3d ' : 'whitesmoke',
        },
      }}
    >
      <Group>
        <Avatar src={country.flags.svg} size={20} />
        {country.name.common}
      </Group>
    </Combobox.Option>
  ));

  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      gender: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: isEmail('Invalid email'),
      firstName: isNotEmpty('First name is required'),
      lastName: isNotEmpty('Last name is required'),
      username: (value) => {
        if (value.length < 3 || value.length > 20) {
          return 'Username must be between 3 and 20 characters long';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return 'Username can only contain letters, numbers, and underscores';
        }
        return null;
      },
      gender: isNotEmpty('Gender is required'),
      password: hasLength(
        { min: 6 },
        'Password must be 6 or more characters long',
      ),
      confirmPassword: (value, values) =>
        matchesField('password', 'Passwords do not match')(value, values),
    },
    validateInputOnChange: true,
  });

  return (
    <Container sx={{ maxWidth: '80em' }} mt="lg">
      <SimpleGrid cols={2} spacing="xs" verticalSpacing="md">
        <Avatar
          variant="filled"
          size={120}
          src={''}
          radius={120}
          color="red"
          mx="auto"
          mt="sm"
        />

        <Stack>
          <Group grow>
            <TextInput
              withAsterisk
              label="First Name"
              placeholder="Your first name"
              value={form.values.firstName}
              onChange={(event) =>
                form.setFieldValue('firstName', event.currentTarget.value)
              }
              error={form.errors.firstName && 'First name is required'}
              radius="md"
            />
            <TextInput
              label="Middle Name"
              placeholder="Your middle name"
              value={form.values.lastName}
              onChange={(event) =>
                form.setFieldValue('lastName', event.currentTarget.value)
              }
              error={form.errors.lastName && 'Last name is required'}
              radius="md"
            />
            <TextInput
              withAsterisk
              label="Last Name"
              placeholder="Your last name"
              value={form.values.lastName}
              onChange={(event) =>
                form.setFieldValue('lastName', event.currentTarget.value)
              }
              error={form.errors.lastName && 'Last name is required'}
              radius="md"
            />
          </Group>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="name@example.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <TextInput
            label="Username (optional)"
            description="You can change it later"
            descriptionProps={{ color: 'dimmed', size: 'xs' }}
            placeholder="Username"
            {...form.getInputProps('username')}
          />

          <Group grow>
            <Combobox
              onOptionSubmit={(optionValue) => {
                const selected = countryOptions.find(
                  (c) => c.name.common === optionValue,
                );

                if (selected)
                  setSelectedCountry({
                    name: selected.name,
                    flags: selected.flags,
                    idd: { root: '', suffixes: [] },
                  });
                combobox.closeDropdown();
              }}
              store={combobox}
            >
              <Combobox.Target>
                <TextInput
                  label="Select Country"
                  placeholder="Type to search"
                  value={selectedCountry ? selectedCountry.name.common : ''}
                  onChange={(event) => {
                    setSelectedCountry({
                      name: { common: event.currentTarget.value },
                      flags: { svg: '' },
                      idd: { root: '', suffixes: [] },
                    });
                    combobox.openDropdown();
                    combobox.updateSelectedOptionIndex();
                  }}
                  onClick={() => combobox.openDropdown()}
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  disabled={isLoading}
                  rightSection={
                    selectedCountry && selectedCountry.name.common !== '' && (
                      <CloseButton
                        size="sm"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() =>
                          setSelectedCountry({
                            name: { common: '' },
                            flags: { svg: '' },
                            idd: { root: '', suffixes: [] },
                          })
                        }
                        aria-label="Clear value"
                      />
                    )
                  }
                  leftSection={
                    selectedCountry ? (
                      <Avatar src={selectedCountry.flags.svg} size={20} />
                    ) : null
                  }
                />
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>
                  <ScrollArea.Autosize mah={200} type="auto">
                    {options.length === 0 ? (
                      <Combobox.Empty>No country found</Combobox.Empty>
                    ) : (
                      options
                    )}
                  </ScrollArea.Autosize>
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
            <Select
              label="Select a role"
              placeholder="Pick a role"
              data={['Student', 'Teacher', 'Admin']}
              clearable
            />
            <div
              style={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
              <PhoneSelector />
            </div>
          </Group>
          <Radio.Group
            name="gender"
            label="Select Gender"
            withAsterisk
            {...form.getInputProps('gender')}
          >
            <Group mt="xs">
              <Radio value="male" label="Male" />
              <Radio value="female" label="Female" />
              <Radio value="other" label="Other" />
            </Group>
          </Radio.Group>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default RegisterUser;
