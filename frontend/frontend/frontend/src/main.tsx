import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrandProvider } from './contexts/BrandContext.tsx';
import { CategoryProvider } from './contexts/CategoryContext.tsx';
import { ProductProvider } from './contexts/ProductContext.tsx';
import ThemeProvider from './contexts/ThemeProvider.tsx';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrandProvider>
        <CategoryProvider>
          <ProductProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </ProductProvider>
        </CategoryProvider>
      </BrandProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
