"use client"; //tells next to render on the client, not the server

import config from '@/sanity.config';
import { NextStudio } from 'next-sanity/studio';

export default function ContentAdminPage() {
    return <NextStudio config={config} />
};