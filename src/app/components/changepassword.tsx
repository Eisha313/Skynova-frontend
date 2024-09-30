'use client';

import React, { useState } from 'react';
import { PasswordInput, Button, Box, Grid, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ChangePasswordForm: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validate: {
      currentPassword: (value) => (value.length < 1 ? 'Current password is required' : null),
      newPassword: (value) => {
        const minLength = 6;
        const startsWithLetter = /^[a-zA-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[@$!%*?&#]/.test(value);

        if (value.length < minLength) {
          return `Password must be at least ${minLength} characters long`;
        } else if (!startsWithLetter) {
          return 'Password must start with a letter';
        } else if (!hasNumber) {
          return 'Password must include at least one number';
        } else if (!hasSpecialChar) {
          return 'Password must include at least one special character';
        }
        return null;
      },
      confirmNewPassword: (value, values) =>
        value !== values.newPassword ? 'Passwords do not match' : null,
    },
  });

  const verifyCurrentPassword = async (currentPassword: string) => {
   
    const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/passwords/checkCurrentPassword', {
      method: 'POST',
      body: JSON.stringify({ currentPassword }),
    });
    if (!response.ok) {
      form.setErrors({ currentPassword: 'Current password is incorrect' });
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    await verifyCurrentPassword(values.currentPassword);
    if (Object.keys(form.errors).length === 0) {
      
      const response = await fetch('https://sky-nova-8ccaddc754ce.herokuapp.com/passwords/updatePassword', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: values.newPassword }),
      });
      if (!response.ok) {
        form.setErrors({ form: 'Failed to update the password' });
      }
    }
  };
 
  return (
    <Box maw={500} mx="auto" p="md">
      <form onSubmit={form.onSubmit(handleSubmit)} className="bg-white text-black p-6 rounded-lg shadow-lg">
        <Text ta="center" mb="lg" w={500} size="xl">Change Password</Text>
        <Grid gutter="md">
          <Grid.Col span={12}>
            <PasswordInput
              label="Current Password"
              placeholder="********"
              visibilityToggleIcon={({ reveal }) => reveal ? <FaEyeSlash /> : <FaEye />}
              visible={showCurrentPassword}
              onVisibilityChange={setShowCurrentPassword}
              {...form.getInputProps('currentPassword')}
              required
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <PasswordInput
              label="New Password"
              placeholder="********"
              visibilityToggleIcon={({ reveal }) => reveal ? <FaEyeSlash /> : <FaEye />}
              visible={showNewPassword}
              onVisibilityChange={setShowNewPassword}
              {...form.getInputProps('newPassword')}
              required
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <PasswordInput
              label="Confirm New Password"
              placeholder="********"
              visibilityToggleIcon={({ reveal }) => reveal ? <FaEyeSlash /> : <FaEye />}
              visible={showConfirmPassword}
              onVisibilityChange={setShowConfirmPassword}
              {...form.getInputProps('confirmNewPassword')}
              required
            />
          </Grid.Col>
        </Grid>

        <Button type="submit" fullWidth mt="md">Update Password</Button>
      </form>
    </Box>
  );
};

export default ChangePasswordForm;
