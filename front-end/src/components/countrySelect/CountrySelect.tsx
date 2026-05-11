import {
  Avatar,
  Combobox,
  ScrollArea,
  Group,
  Text,
  useCombobox,
  Select,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useMantineColorScheme } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { getCountriesAPI } from '../api/api';

interface Props {
  value: { name: string; flag: string };
  onChange: (value: { name: string; flag: string }) => void;
  error?: string | boolean;
  disabled?: boolean;
}

interface Country {
  name: { common: string };
  flags: { svg: string };
}

const CountrySelector = ({ value, onChange, error, disabled }: Props) => {
  const { colorScheme } = useMantineColorScheme();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [input, setInput] = useState(value.name);
  const { data: countries, isLoading } = useQuery<Country[]>(
    ['getCountries'],
    getCountriesAPI,
  );

  const filtered = (countries ?? []).filter((c) =>
    c.name.common.toLowerCase().includes(input.toLowerCase().trim()),
  );

  useEffect(() => {
    combobox.selectFirstOption();
  }, [filtered]);

  const options = filtered.map((country) => (
    <Combobox.Option
      value={country.name.common}
      key={country.name.common}
      sx={{
        ':hover': {
          backgroundColor: colorScheme === 'dark' ? '#3f3d3d' : 'whitesmoke',
        },
      }}
    >
      <Group gap="sm" align="center">
        <Avatar src={country.flags.svg} size={20} />
        <Text>{country.name.common}</Text>
      </Group>
    </Combobox.Option>
  ));

  const handleSelect = (selected: string) => {
    const selectedCountry = countries?.find((c) => c.name.common === selected);
    if (selectedCountry) {
      onChange({
        name: selectedCountry.name.common,
        flag: selectedCountry.flags.svg,
      });
      setInput(selectedCountry.name.common);
    }
    combobox.closeDropdown();
  };

  return (
    <Combobox onOptionSubmit={handleSelect} store={combobox}>
      <Combobox.Target>
        <Select
          searchable
          withAsterisk
          required
          label="Select Country"
          placeholder="Type to search"
          data={(countries ?? []).map((country) => ({
            value: country.name.common,
            label: country.name.common,
            flag: country.flags.svg,
          }))}
          value={value?.name || null}
          onChange={(selected) => {
            const selectedCountry = countries?.find(
              (c) => c.name.common === selected,
            );

            if (selectedCountry) {
              onChange({
                name: selectedCountry.name.common,
                flag: selectedCountry.flags.svg,
              });
            } else {
              onChange({ name: '', flag: '' });
            }
          }}
          disabled={isLoading || disabled}
          error={error}
          nothingFoundMessage="No country found"
          clearable
          leftSection={
            value?.flag ? <Avatar src={value.flag} size={20} /> : null
          }
          renderOption={({ option }) => (
            <Group gap="sm">
              <Avatar src={(option as any).flag} size={20} />
              <Text size="sm">{option.label}</Text>
            </Group>
          )}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="auto">
            {options.length ? (
              options
            ) : (
              <Combobox.Empty>No country found</Combobox.Empty>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default CountrySelector;
