import { defineConfig } from 'sanity';
import { deskTool } from "sanity/desk";
import schemas from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

const config = defineConfig({
    projectId:  projectId,
    dataset: "production",
    title: "Wall Coverings By Don",
    apiVersion: "2023-07-15",
    basePath: "/admin",
    plugins: [deskTool()],
    schema: { types: schemas }
});

export default config;