import React, { memo, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  Button,
} from "@strapi/design-system";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Illo } from "../../components/Illo";
import { Plus } from "@strapi/icons";

import HandlerModal from "../../components/HandlerModal";
import HandlerTable from "../../components/HandlerTable";

import handlerRequests from "../../api/handler";

const HomePage = () => {
  const [handlers, setHandlers] = useState([]);
  const [handler, setHandler] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  async function fetchData() {
    if (isLoading == false) setIsLoading(true);
    const data = await handlerRequests.getAllHandlers();
    setHandlers(data);
    setIsLoading(false);
  }

  useEffect(async () => {
    await fetchData();
  }, []);

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
    setIsLoading(true);
    if (handler?.id) {
      await handlerRequests.editHandler(handler.id, data);
    } else {
      await handlerRequests.addHandler(data);
    }
    await fetchData();
    setIsLoading(false);
    setShowFormModal(false);
  }

  async function deleteHandler() {
    setIsLoading(true);
    await handlerRequests.deleteHandler(handler?.id);
    await fetchData();
    setIsLoading(false);
    setShowFormModal(false);
  }

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <>
      <BaseHeaderLayout title="Restrapi" subtitle="" as="h2" />

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
