import React, { useState } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
  Select,
  Option,
  Textarea,
  Box,
  Alert,
} from "@strapi/design-system";
import { METHODS } from "../../../../common/constants";

export default function HandlerModal({ setShowModal, addHanlder }) {
  const [method, setMethod] = useState(METHODS.GET);
  const [path, setPath] = useState("");
  const [script, setScript] = useState("");
  const [error, setError] = useState("");

  function validate() {
    if (path.trim() === "") {
      setError("path must not empty");
      return false;
    }
    if (script.trim() === "") {
      setError("script must not empty");
      return false;
    }
    setError("");
    return true;
  }

  async function handleSubmit(e) {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    if (!validate()) return;

    try {
      await addHanlder({ method, path, script });
      setShowModal(false);
    } catch (e) {
      console.log("error", e);
      setError(e.toString());
    }
  }

  return (
    <ModalLayout
      onClose={() => setShowModal(false)}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add handler
        </Typography>
      </ModalHeader>

      <ModalBody>
        {error !== "" && (
          <Box marginBottom={5}>
            <Alert title="Error" variant="danger">
              {error}
            </Alert>
          </Box>
        )}

        <Box marginBottom={5}>
          <Select label="Method" value={method} onChange={(v) => setMethod(v)}>
            <Option value={METHODS.GET}>{METHODS.GET}</Option>
            <Option value={METHODS.POST}>{METHODS.POST}</Option>
            <Option value={METHODS.PUT}>{METHODS.PUT}</Option>
            <Option value={METHODS.PATCH}>{METHODS.PATCH}</Option>
            <Option value={METHODS.DELETE}>{METHODS.DELETE}</Option>
          </Select>
        </Box>
        <Box marginBottom={5}>
          <TextInput
            label="Path"
            name="path"
            onChange={(e) => setPath(e.target.value)}
            value={path}
          />
        </Box>
        <Box marginBottom={5}>
          <Textarea
            label="Script"
            name="script"
            onChange={(e) => setScript(e.target.value)}
          >
            {script}
          </Textarea>
        </Box>
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Add handler</Button>}
      />
    </ModalLayout>
  );
}
