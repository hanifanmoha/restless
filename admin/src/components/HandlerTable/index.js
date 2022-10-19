import React from "react";
import {
  Table,
  Thead,
  TFooter,
  Tbody,
  Tr,
  Td,
  Th,
  Box,
  Flex,
  Typography,
  IconButton,
  VisuallyHidden,
} from "@strapi/design-system";
import { Pencil, Trash, Plus } from "@strapi/icons";

export default function TodoTable({
  handlers,
  deleteHandler,
  editHandler,
  setShowModal,
}) {
  return (
    <Box
      background="neutral0"
      hasRadius={true}
      shadow="filterShadow"
      padding={8}
      style={{ marginTop: "10px" }}
    >
      <Table
        colCount={4}
        rowCount={10}
        footer={
          <TFooter onClick={() => setShowModal(true)} icon={<Plus />}>
            Add new handler
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">Path</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Method</Typography>
            </Th>

            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {handlers.map((handler) => {
            return (
              <Tr key={handler.id}>
                <Td>
                  <Typography textColor="neutral800">
                    {handler.method}
                  </Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">{handler.path}</Typography>
                </Td>

                <Td>
                  <Flex style={{ justifyContent: "end" }}>
                    <IconButton
                      onClick={() => alert("edit")}
                      label="Edit"
                      noBorder
                      icon={<Pencil />}
                    />

                    <Box paddingLeft={1}>
                      <IconButton
                        onClick={() => deleteHandler(handler.id)}
                        label="Delete"
                        noBorder
                        icon={<Trash />}
                      />
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
