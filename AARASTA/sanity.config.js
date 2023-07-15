import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

import {schemaTypes} from './sanity_backend/schemas'

const config = defineConfig({
  projectId: 'a3lmxvs9',
  dataset: 'production',
  title: "AARASTA",
  apiVersion: "2023-03-09",
  basePath: "/studio",
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});

export default config;
