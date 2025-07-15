import React, { useEffect, Suspense, lazy } from "react";
import { TranslationProvider } from "./contexts/TranslationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import { Layout, Home } from "./pages"; // فقط العناصر الأساسية تُحمّل مباشرة
import { LoadingPage } from "./pages/LoadingPage"; // نفس الكمبوننت المستخدم في main

// Lazy Load للصفحات الباقية
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const FAQSPage = lazy(() => import("./pages/FAQSPage"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const SupplierPage = lazy(() => import("./pages/SupplierPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const DetailsOfProduct = lazy(() => import("./pages/DetailsOfProduct"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: "faqs",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <FAQSPage />
          </Suspense>
        ),
      },
      {
        path: "contact-us",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "privacy",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <PrivacyPage />
          </Suspense>
        ),
      },
      {
        path: "supplier",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <SupplierPage />
          </Suspense>
        ),
      },
      {
        path: "products/:id",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <DetailsOfProduct />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <TranslationProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={route} />
      </QueryClientProvider>
    </TranslationProvider>
  );
};

export default App;
