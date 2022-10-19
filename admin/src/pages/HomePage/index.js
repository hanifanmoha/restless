import React, { memo, useState } from "react";
import { nanoid } from "nanoid";
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  Button,
} from "@strapi/design-system";
import { Illo } from "../../components/Illo";
import { Plus } from "@strapi/icons";

import HandlerModal from "../../components/HandlerModal";
import HandlerTable from "../../components/HandlerTable";

const initialHanlders = [
  {
    id: nanoid(),
    method: "GET",
    path: "posts",
    script: "SELECT * FROM POSTS",
  },
];

const HomePage = () => {
  const [handlers, setHandlers] = useState(initialHanlders);
  const [showModal, setShowModal] = useState(false);

  async function addHanlder(data) {
    setHandlers((current) => [...current, { ...data, id: nanoid() }]);
  }

  async function deleteHandler(id) {
    setHandlers((current) => current.filter((handler) => handler.id != id));
  }

  async function editHandler(id, data) {
    alert("edit handler");
  }

  return (
    <>
      <BaseHeaderLayout
        title="Bloon"
        subtitle="No body said it was ez"
        as="h2"
      />

      <ContentLayout>
        {handlers.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any handler yet..."
            action={
              <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                startIcon={<Plus />}
              >
                Add your first handler
              </Button>
            }
          />
        ) : (
          <>
            <HandlerTable
              handlers={handlers}
              setShowModal={setShowModal}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          </>
        )}
      </ContentLayout>

      {showModal && (
        <HandlerModal setShowModal={setShowModal} addHanlder={addHanlder} />
      )}
    </>
  );
};

export default memo(HomePage);
