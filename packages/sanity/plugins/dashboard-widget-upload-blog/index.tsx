import { DashboardWidget } from "@sanity/dashboard";
import { Button, Flex, Spinner, Text, TextInput, useToast, TextInputType } from "@sanity/ui";
import React, { useState } from "react";
import styled from "styled-components";

const StyledText = styled(Text)`
  margin: 1rem;
`;

function UploadBlog() {
  const [selectedFile, setSelectedFile] = useState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleFileSelection = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileSubmission = async () => {
    if (selectedFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        await fetch(process.env.SANITY_STUDIO_DOC_UPLOAD_API, {
          method: "POST",
          body: formData,
        }).then((res) => {
          if (res.ok) {
            return res.json();
          }

          throw res.json();
        });

        toast.push({
          title: "Success",
          description: "Blog uploaded successfully",
          status: "success",
        });
      } catch (error) {
        console.error(error);
        toast.push({
          title: "Error",
          description: "Error uploading file",
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <DashboardWidget
      header="Upload a Blog"
      footer={
        <Flex direction="column" align="stretch">
          <Button onClick={handleFileSubmission} paddingX={2} paddingY={4} mode="bleed" tone="primary" text="Upload" />
        </Flex>
      }
    >
      <StyledText size={4}>Upload a docx file</StyledText>
      <TextInput
        type={"file" as TextInputType}
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileSelection}
      />
      {loading && (
        <Flex justify="center">
          <Spinner muted />
        </Flex>
      )}
    </DashboardWidget>
  );
}

export default {
  name: "dashboard-widget-upload-blog",
  component: UploadBlog,
};
