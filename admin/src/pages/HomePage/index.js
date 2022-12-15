/*
 *
 * HomePage
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
import { BaseHeaderLayout, ContentLayout, Layout } from "@strapi/design-system/Layout";
import pluginId from "../../pluginId";

const HomePage = () => {
  return (
    <Layout>
      <BaseHeaderLayout
        title={`${pluginId}'s HomePage`}
        subtitle="All your todos in one place...."
        as="h2"
      />

      <ContentLayout>
        <p>Hello from our {pluginId} Plugin</p>
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
