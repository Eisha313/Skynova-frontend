"use client";

import React, { useState } from "react";
import { PasswordInput, Button, Box, Grid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from "./context/userContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ChangePasswordForm: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: {
      currentPassword: (value) => (value.length < 1 ? "Current password is required" : null),
      newPassword: (value) => {
        const minLength = 6;
        const startsWithLetter = /^[a-zA-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[@$!%*?&#]/.test(value);

        if (value.length < minLength) {
          return `Password must be at least ${minLength} characters long`;
        } else if (!startsWithLetter) {
          return "Password must start with a letter";
        } else if (!hasNumber) {
          return "Password must include at least one number";
        } else if (!hasSpecialChar) {
          return "Password must include at least one special character";
        }
        return null;
      },
      confirmNewPassword: (value, values) => (value !== values.newPassword ? "Passwords do not match" : null),
    },
  });

  const verifyCurrentPassword = async (currentPassword: string, newPassword: string) => {
    // const response = await fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/users/forgetPasswordLoggedIn", {
    try {
      setLoading(true);
      const response = await fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/users/forgetPasswordLoggedIn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!response.ok) {
        form.setErrors({ currentPassword: "Current password is incorrect" });
      } else {
        form.setErrors({ currentPassword: "" });
        toast.success("Password changed successfully");
        router.push("/");
      }
    } catch (error) {
      console.error("Error during password change:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    await verifyCurrentPassword(values.currentPassword, values.newPassword);
    // if (Object.keys(form.errors).length === 0) {
    //   // const response = await fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/passwords/updatePassword", {
    //   const response = await fetch("http://localhost:4000/passwords/updatePassword", {
    //     method: "PATCH",
    //     credentials: "include",
    //     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    //     body: JSON.stringify({ newPassword: values.newPassword }),
    //   });
    //   if (!response.ok) {
    //     form.setErrors({ form: "Failed to update the password" });
    //   }
    // }
  };

  return (
    <Box maw={500} mx="auto" p="md" className="flex justify-center">
      <form onSubmit={form.onSubmit(handleSubmit)} className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <Text ta="center" mb="lg" w={500} size="xl">
          Change Password
        </Text>
        <Grid gutter="md">
          <Grid.Col span={12}>
            <PasswordInput
              label="Current Password"
              classNames={{
                input:
                  "w-full text-white px-4 py-2 rounded-md flex items-center justify-center border-2 border-white/30 bg-transparent hover:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none",
                label: "text-white mb-2 font-medium",
              }}
              placeholder="********"
              visibilityToggleIcon={({ reveal }) => (reveal ? <FaEyeSlash /> : <FaEye />)}
              visible={showCurrentPassword}
              onVisibilityChange={setShowCurrentPassword}
              {...form.getInputProps("currentPassword")}
              required
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <PasswordInput
              label="New Password"
              classNames={{
                input:
                  "w-full text-white px-4 py-2 rounded-md flex items-center justify-center border-2 border-white/30 bg-transparent hover:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none",
                label: "text-white mb-2 font-medium",
              }}
              placeholder="********"
              visibilityToggleIcon={({ reveal }) => (reveal ? <FaEyeSlash /> : <FaEye />)}
              visible={showNewPassword}
              onVisibilityChange={setShowNewPassword}
              {...form.getInputProps("newPassword")}
              required
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <PasswordInput
              label="Confirm New Password"
              classNames={{
                input:
                  "w-full text-white px-4 py-2 rounded-md flex items-center justify-center border-2 border-white/30 bg-transparent hover:border-[#5AA0BC] focus-visible:border-[#5AA0BC] transition-all outline-none",
                label: "text-white mb-2 font-medium",
              }}
              placeholder="********"
              visibilityToggleIcon={({ reveal }) => (reveal ? <FaEyeSlash /> : <FaEye />)}
              visible={showConfirmPassword}
              onVisibilityChange={setShowConfirmPassword}
              {...form.getInputProps("confirmNewPassword")}
              required
            />
          </Grid.Col>
        </Grid>

        <Button type="submit" fullWidth mt="md" loading={loading} disabled={loading}>
          Update Password
        </Button>
      </form>
    </Box>
  );
};

export default ChangePasswordForm;
