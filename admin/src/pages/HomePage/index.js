/*
 *
 * HomePage
 *
 */

import React from "react";
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";

const HomePage = () => {
  return (
    <Layout>
      <BaseHeaderLayout
        title="Bloon Plugin"
        subtitle="Generate API easier"
        as="h2"
      ></BaseHeaderLayout>

      <ContentLayout>
        <p>Happy and easy</p>
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
