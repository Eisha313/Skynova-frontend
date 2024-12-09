"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChangePasswordModal from "./changepassword";
import { Modal, TextInput, Button, Grid, Box, Image, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useUser } from "./context/userContext";

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage?: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { firstName, lastName, email, role, profileImage, _id, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImg, setProfileImage] = useState<string | null>(profileImage || null);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      role: role || "",
      profileImage: profileImage || "",
    },
    validate: {
      firstName: (value) =>
        value.length < 4
          ? "First name must be at least 4 characters long"
          : /^[a-zA-Z]+$/.test(value)
          ? null
          : "First name must contain only letters",
      lastName: (value) =>
        value.length < 4
          ? "Last name must be at least 4 characters long"
          : /^[a-zA-Z]+$/.test(value)
          ? null
          : "Last name must contain only letters",
      email: (value) =>
        /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : "Invalid email format",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.setValues({
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        role: role || "",
        profileImage: profileImage || "",
      });
      setProfileImage(profileImage || null);
    }
  }, [isOpen, firstName, lastName, email, role, profileImage, _id, setUser]);

  const handleDrop = (files: File[]) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        form.setFieldValue("profileImage", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: User) => {
    try {
      const url = `https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/updateAviator/${_id}`;

      const requestBody = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: values.role,
        profileImage: profileImg || values.profileImage,
      };

      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update user");
      } else {
        const updatedUser = await response.json();
        setUser(updatedUser);
      }

      setIsEditing(false);
      onClose();
    } catch (error) {
      form.setErrors({ form: "An error occurred while saving the user" });
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        const url = `https://sky-nova-8ccaddc754ce.herokuapp.com/aviators/deleteAviator/${_id}`;
        const response = await fetch(url, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to delete profile");
        }
        // logout()
      } catch (error) {
        alert("Failed to delete profile: " + error);
      }
    }
  };

  const handlePasswordChange = () => {
    router.push("/userRender/changePassword");
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  if (!isOpen) return null;

  return (
    <Modal opened={isOpen} onClose={onClose} size="lg">
      <h2 className="text-center text-2xl font-bold mb-4">{isEditing ? "Edit Profile" : "Profile Details"}</h2>
      <Box p="md">
        {!isEditing ? (
          <div className="flex flex-col items-center">
            <img
              src={profileImg || "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-6 object-cover"
            />
            <div className="text-left space-y-4">
              <div className="flex items-center space-x-2">
                <span className="font-bold">First Name:</span>
                <span>{firstName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">Last Name:</span>
                <span>{lastName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">Email:</span>
                <span>{email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">Role:</span>
                <span>{role}</span>
              </div>
            </div>
            <div className="flex justify-between mt-6 w-full space-x-4">
              <Button fullWidth onClick={toggleEditMode}>
                Edit Profile
              </Button>
              <Button fullWidth variant="outline" onClick={handlePasswordChange}>
                Change Password
              </Button>
              <Button fullWidth color="red" variant="outline" onClick={handleDeleteProfile}>
                Delete Profile
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter="lg">
              <Grid.Col span={6}>
                <TextInput label="First Name" {...form.getInputProps("firstName")} required />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput label="Last Name" {...form.getInputProps("lastName")} required />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput label="Email" {...form.getInputProps("email")} required disabled />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput label="Role" {...form.getInputProps("role")} required />
              </Grid.Col>
              <Grid.Col
                span={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "24px",
                }}
              >
                <Text>Profile Picture</Text>
                <Dropzone
                  onDrop={handleDrop}
                  accept={IMAGE_MIME_TYPE}
                  maxSize={3 * 1024 ** 2}
                  style={{
                    width: "250px",
                    height: "250px",
                    borderRadius: "8px",
                    border: "2px dashed #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {profileImg ? (
                    <Image
                      src={profileImg}
                      alt="Profile"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Text>Upload Image</Text>
                  )}
                </Dropzone>
              </Grid.Col>
            </Grid>
            <Button type="submit" fullWidth mt="lg">
              Save Changes
            </Button>
            <Button fullWidth mt="md" onClick={toggleEditMode}>
              Cancel
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default ProfileModal;
