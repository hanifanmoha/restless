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

export default function HandlerModal({
  handler,
  onCloseModal,
  saveHandler,
  deleteHandler,
}) {
  const [method, setMethod] = useState(handler?.method ?? METHODS.GET);
  const [path, setPath] = useState(handler?.path ?? "");
  const [script, setScript] = useState(handler?.script ?? "");
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
    e.preventDefault();
    e.stopPropagation();

    if (!validate()) return;

    try {
      await saveHandler({ method, path, script });
    } catch (e) {
      console.log("error", e);
      setError(e.toString());
    }
  }

  return (
    <ModalLayout
      onClose={() => onCloseModal()}
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
            <Alert
              title="Error"
              variant="danger"
              onClose={() => setError("")}
              closeLabel="Close"
            >
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
          handler?.id && (
            <Button variant="danger" onClick={deleteHandler}>
              Delete
            </Button>
          )
        }
        endActions={<Button type="submit">Submit</Button>}
      />
    </ModalLayout>
  );
}
