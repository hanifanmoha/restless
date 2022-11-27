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
  AccordionGroup,
  TextButton,
  Flex,
  Accordion,
  AccordionToggle,
  IconButton,
  ToggleCheckbox,
  AccordionContent,
} from "@strapi/design-system";
import { Trash, Plus } from "@strapi/icons";
import { METHODS, PARAM_TYPES } from "../../../../common/constants";

export default function HandlerModal({
  handler,
  onCloseModal,
  saveHandler,
  deleteHandler,
}) {
  const [method, setMethod] = useState(handler?.method ?? METHODS.GET);
  const [path, setPath] = useState(handler?.path ?? "");
  const [script, setScript] = useState(handler?.script ?? "");
  const [params, setParams] = useState([]);
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
    for (let param of params) {
      if (param.name.trim() === "") {
        setError(`param name must not empty`);
        return false;
      }
    }
    setError("");
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!validate()) return;

    try {
      await saveHandler({ method, path, script, params });
    } catch (e) {
      console.log("error", e);
      setError(e.toString());
    }
  }

  function onAddParams() {
    setParams((prevParams) => [
      ...prevParams,
      {
        id: -Math.floor(Math.random() * 9999999),
        name: "",
        data_type: PARAM_TYPES.STRING,
        required: false,
      },
    ]);
  }

  function onEditParams(editId, key, value) {
    setParams((prevParams) =>
      prevParams.map((param) => {
        if (param.id !== editId) {
          return param;
        } else {
          return {
            ...param,
            [key]: value,
          };
        }
      })
    );
  }

  function onDeleteParams(deleteId) {
    setParams((prevParams) =>
      prevParams.filter((param) => param.id !== deleteId)
    );
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

        <Box>
          <AccordionGroup
            footer={
              <Flex
                justifyContent="center"
                height="48px"
                background="neutral150"
              >
                <TextButton startIcon={<Plus />} onClick={onAddParams}>
                  Add Params
                </TextButton>
              </Flex>
            }
          >
            {params.map((param) => {
              return (
                <ParamAccordion
                  key={param.id}
                  {...param}
                  onDeleteParams={onDeleteParams}
                  onEditParams={onEditParams}
                />
              );
            })}
          </AccordionGroup>
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

function ParamAccordion({
  id,
  name = "",
  data_type = PARAM_TYPES.STRING,
  required = false,
  onDeleteParams,
  onEditParams,
}) {
  const [expanded, setExpanded] = useState(true);
  const [isRequired, setIsRequired] = useState(required);
  return (
    <Accordion
      expanded={expanded}
      id={`param_${id}`}
      size="S"
      onToggle={() => setExpanded((e) => !e)}
    >
      <AccordionToggle
        action={
          <IconButton
            noBorder
            onClick={() => onDeleteParams(id)}
            label="Delete"
            icon={<Trash />}
          />
        }
        title={`Params : ${name}`}
        togglePosition="left"
      />
      <AccordionContent>
        <Box padding={3}>
          <TextInput
            name={`name_${id}`}
            label="Name"
            value={name}
            onChange={(e) => onEditParams(id, "name", e.target.value)}
          />
        </Box>
        <Box padding={3}>
          <Select
            label="Data Type"
            value={data_type}
            onChange={(v) => onEditParams(id, "data_type", v)}
          >
            <Option value={PARAM_TYPES.STRING}>{PARAM_TYPES.STRING}</Option>
            <Option value={PARAM_TYPES.NUMBER}>{PARAM_TYPES.NUMBER}</Option>
          </Select>
        </Box>
        <Box padding={3}>
          <ToggleCheckbox
            label="Required"
            onLabel="Required"
            offLabel="Optional"
            checked={isRequired}
            onChange={() => {
              setIsRequired((prev) => {
                onEditParams(id, "required", !prev);
                return !prev;
              });
            }}
          >
            The field is required?
          </ToggleCheckbox>
        </Box>
      </AccordionContent>
    </Accordion>
  );
}
