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
  const [handler, setHandler] = useState(null);
  const [showFormModal, setShowFormModal] = useState(true);

  function onCloseModal() {
    setHandler(null);
    setShowFormModal(false);
  }

  function onCreateHandler() {
    setHandler(null);
    setShowFormModal(true);
  }

  function onEditHandler(id) {
    setHandler(handlers.find((h) => h.id === id));
    setShowFormModal(true);
  }

  async function saveHandler(data) {
    if (handler?.id) {
      const editedHandler = { ...data, id: handler.id };
      setHandlers((current) =>
        current.map((c) => {
          if (c.id === handler.id) return editedHandler;
          return c;
        })
      );
    } else {
      setHandlers((current) => [...current, { ...data, id: nanoid() }]);
    }
    setShowFormModal(false);
  }

  async function deleteHandler() {
    setHandlers((current) => current.filter((h) => h.id !== handler?.id));
    setShowFormModal(false);
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
                onClick={() => onCreateHandler()}
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
              onCreateHandler={onCreateHandler}
              onEditHandler={onEditHandler}
            />
          </>
        )}
      </ContentLayout>

      {showFormModal && (
        <HandlerModal
          key={handler?.id ?? "create"}
          handler={handler}
          onCloseModal={onCloseModal}
          saveHandler={saveHandler}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
};

export default memo(HomePage);
