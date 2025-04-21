import { Stack, TextInput, Group, Button } from '@mantine/core';
import React, { useState } from 'react';

const EditUserForm = ({
  user,
  onClose,
}: {
  user: any;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState(user);

  return (
    <Stack>
      <TextInput
        label="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <TextInput
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <Group mt="md" justify="flex-end">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => {}}>Save Changes</Button>
      </Group>
    </Stack>
  );
};
export default EditUserForm;
