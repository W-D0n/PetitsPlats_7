import { defineConfig } from 'vite';

export default defineConfig({
  // base: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'import.meta.env',
  build:{
    target:'esnext'
  }
});