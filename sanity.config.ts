import { defineConfig } from 'sanity';
import { deskTool } from "sanity/desk";
import schemas from './sanity/schemas';

const config = defineConfig({
    projectId: "ffc33v6b",
    dataset: "production",
    title: "Wall Coverings By Don",
    apiVersion: "2023-07-15",
    basePath: "/admin",
    plugins: [deskTool()],
    schema: { types: schemas }
});

export default config;