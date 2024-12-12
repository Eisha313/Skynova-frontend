"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { Button, TextInput, Select, Group, Grid, Box, Text, Modal, Notification } from "@mantine/core";
import Link from "next/link";
import { useUser } from "@/app/components/context/userContext";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import { IconMoodSad, IconUpload, IconFile } from "@tabler/icons-react";

const AVIATION_STANDARDS = {
  height: { cm: [150, 200], in: [59, 79] },
  weight: [50, 100],
  eyesight: { min: "20/30", max: "20/20" },
};

interface MedicalFitnessFormProps {
  goToNextStep: () => void;
  formData:
    | {
        height: string;
        heightUnit: string;
        weight: string;
        weightUnit: string;
        eyesight: string;
        medicalReport?: string;
      }
    | undefined;
  formCompleted: boolean;
  setFormCompleted: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<any>>;
}
const MedicalFitnessForm: React.FC<MedicalFitnessFormProps> = ({
  goToNextStep,
  formData,
  formCompleted,
  setFormCompleted,
  setFormData,
}) => {
  const [isEligible, setIsEligible] = useState(true);
  const [modalType, setModalType] = useState<"ineligible" | "missingReport" | null>(null);
  const [medicalReport, setMedicalReport] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFile, setShowFile] = useState<string | null>(null);
  const router = useRouter();
  const { token } = useUser();

  const form = useForm({
    initialValues: {
      height: "",
      heightUnit: "cm",
      weight: "",
      weightUnit: "kg",
      eyesight: "",
      medicalReport: "",
    },
    validate: {
      height: (value, values) => {
        const heightVal = parseFloat(value);
        const unit = values.heightUnit as "cm" | "in";

        if (value === "") return "Height is required";
        if (isNaN(heightVal)) return "Height must be a number";

        const minHeight = unit === "cm" ? 50 : 20;
        const maxHeight = unit === "cm" ? 250 : 100; // cm: max 250, in: max 100
        if (heightVal < minHeight || heightVal > maxHeight) {
          return `Height should be between ${minHeight} and ${maxHeight} ${unit}`;
        }

        return null;
      },
      weight: (value) => {
        const weightVal = parseFloat(value);
        if (value === "") return "Weight is required";
        if (isNaN(weightVal)) return "Weight must be a number";

        if (weightVal < 20 || weightVal > 200) {
          return "Weight should be between 20 and 200 kg";
        }

        return null;
      },
      eyesight: (value) => {
        const eyesightPattern = /^[0-9]+\/[0-9]+$/;
        if (value === "") return "Eyesight is required";
        if (!eyesightPattern.test(value)) return "Please enter a valid eyesight (e.g., 20/20)";
        return null;
      },
    },
  });

  useEffect(() => {
    if (formData && formCompleted) {
      form.setValues(formData);
    }
  }, [formData]);

  useEffect(() => {
    form.validateField("height");
    form.validateField("weight");
  }, [form.values.heightUnit, form.values.weightUnit]);

  const checkEligibility = (values: typeof form.values) => {
    const heightVal = parseFloat(values.height);
    const weightVal = parseFloat(values.weight);
    const heightRange = AVIATION_STANDARDS.height[values.heightUnit as "cm" | "in"];

    const eyesightComparison = values.eyesight === AVIATION_STANDARDS.eyesight.max;

    const meetsStandards =
      heightVal >= heightRange[0] &&
      heightVal <= heightRange[1] &&
      weightVal >= AVIATION_STANDARDS.weight[0] &&
      weightVal <= AVIATION_STANDARDS.weight[1] &&
      eyesightComparison;

    if (!meetsStandards) {
      setIsEligible(false);
      setModalType("ineligible");
      return false;
    }

    return true;
  };

  const handleSubmit = async (values: typeof form.values) => {
    if (!checkEligibility(values)) {
      return;
    }

    if (!medicalReport) {
      setModalType("missingReport");

      return;
    }

    submitForm(values);
  };

  const submitForm = async (values: typeof form.values) => {
    try {
      const formData = new FormData();
      formData.append("height", values.height);
      formData.append("heightUnit", values.heightUnit);
      formData.append("weight", values.weight);
      formData.append("weightUnit", values.weightUnit);
      formData.append("eyesight", values.eyesight);

      if (medicalReport) {
        formData.append("medicalReport", medicalReport);
      }
      const entries = Array.from(formData.entries());

      for (const [key, value] of entries) {
        console.log(key, value);
      }
      const response = await fetch("https://sky-nova-8ccaddc754ce.herokuapp.com/medicalDetails/createMedicalDetails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,

        credentials: "include",
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to save medical report");
      } else {
        console.log("Success");
        const data = await response.json();
        console.log(data);
        setFormData(data.medicalDetails);
        setFormCompleted(true);
      }

      // router.push('/userRender/verbal');
      console.log("Going to next step");
      goToNextStep();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  const handleFileDrop = (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    setMedicalReport(file);
    setShowFile(file.name);
  };

  const closeModal = () => setModalType(null);

  return (
  
    <Box
      mx="auto"
      p="md"
      style={{ maxWidth: 600, backgroundColor: "#212C44", color: "white", borderRadius: "12px", marginTop: "10px" }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="Height"
              placeholder="Enter height"
              {...form.getInputProps("height")}
              error={form.errors.height}
              required
              styles={{
                input: {
                  backgroundColor: "#212C44",
                  borderColor: "#B5B5B540",
                  borderRadius: "12px",
                  marginTop: "12px",
                  color: "white",
                  "::placeholder": { color: "#B5B5B540" },
                },
              }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Height Unit"
              data={[
                { value: "cm", label: "cm" },
                { value: "in", label: "inches" },
              ]}
              {...form.getInputProps("heightUnit")}
              styles={{
                input: {
                  backgroundColor: "#212C44",
                  borderColor: "#B5B5B540",
                  borderRadius: "12px",
                  marginTop: "12px",
                  color: "white",
                  "::placeholder": { color: "#B5B5B540" },
                },
              }}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label="Weight"
              placeholder="Enter weight"
              {...form.getInputProps("weight")}
              error={form.errors.weight}
              required
              styles={{
                input: {
                  backgroundColor: "#212C44",
                  borderColor: "#B5B5B540",
                  borderRadius: "12px",
                  color: "white",
                  "::placeholder": { color: "#B5B5B540" },
                },
              }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Weight Unit"
              data={[
                { value: "kg", label: "kg" },
                { value: "lbs", label: "lbs" },
              ]}
              {...form.getInputProps("weightUnit")}
              styles={{
                input: {
                  backgroundColor: "#212C44",
                  borderColor: "#B5B5B540",
                  borderRadius: "12px",
                  color: "white",
                  "::placeholder": { color: "#B5B5B540" },
                },
              }}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <TextInput
              label="Eyesight"
              placeholder="e.g. 20/20"
              {...form.getInputProps("eyesight")}
              error={form.errors.eyesight}
              required
              styles={{
                input: {
                  backgroundColor: "#212C44",
                  borderColor: "#B5B5B540",
                  borderRadius: "12px",
                  color: "white",
                  "::placeholder": { color: "#B5B5B540", borderRadius: "50px" },
                },
              }}
            />
          </Grid.Col>
        </Grid>

        {form.values.medicalReport && form.values.medicalReport?.length ? (
          // Show as a PDF
          <div>
            <iframe src={form.values.medicalReport} style={{ width: "100%", height: "500px", border: "none" }}></iframe>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  form.setFieldValue("medicalReport", "");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Remove and Re-upload
              </button>
            </div>
          </div>
        ) : (
          <Box
            mt="md"
            p="md"
            style={{
              border: "2px dashed #B5B5B5",
              borderRadius: "8px",
              backgroundColor: "#212C44",
              borderColor: "#B5B5B540",
            }}
          >
            <Dropzone onDrop={handleFileDrop} accept={["application/pdf"]} style={{ backgroundColor: "#212C44" }}>
              <Group
                justify="center"
                flex="column"
                style={{ textAlign: "center", minHeight: 100, backgroundColor: "#B5B5B5", borderColor: "#B5B5B540" }}
              >
                {showFile ? (
                  <>
                    <IconFile size={24} />
                    <Text>{showFile}</Text>
                  </>
                ) : (
                  <>
                    <IconUpload size={24} />
                    <Text>Upload Medical Report (Optional)</Text>
                  </>
                )}
              </Group>
            </Dropzone>
          </Box>
        )}

        {error && <Notification color="red">{error}</Notification>}

        <Button type="submit" mt="md" fullWidth style={{ backgroundColor: "#1F60B2", marginBottom: "30px" }}>
          Submit
        </Button>
      </form>

      <Modal opened={modalType === "missingReport"} onClose={closeModal} title="Reminder">
        <Text>
          You did not upload a medical report. You can submit it later, but please remember to do so within 7 days.
        </Text>
        <Group align="right" mt="md">
          <Button
            onClick={() => {
              setModalType(null);
              submitForm(form.values);
            }}
          >
            Continue Submission
          </Button>
        </Group>
      </Modal>

      <Modal opened={modalType === "ineligible"} onClose={closeModal} title="Ineligible">
        <Group justify="center" flex="column">
          <IconMoodSad size={48} color="red" />
          <Text>You are not eligible to be an aviator based on the provided details.</Text>
          <Button color="red" onClick={() => router.push("/")}>
            Return to Home
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};
export default MedicalFitnessForm;

