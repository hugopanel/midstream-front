// Catch-all route for dynamic module routes
"use client";

import "../app/globals.css";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DynamicRoutePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const pathSegments = Array.isArray(slug) ? slug : [slug];
      const importPath = pathSegments.join("/");
      console.log("Attempting to import:", `../../modules/${importPath}`);
      const loadComponent = async () => {
        try {
          const path = importPath.endsWith("/page")
            ? importPath
            : `${importPath}/page`;
          const mod = await import(`../modules/${path}`);
          setComponent(() => mod.default);
          setError(null);
        } catch (err) {
          console.error("Failed to load component:", importPath, err);
          setError(`Failed to load component: ../../modules/${importPath}`);
          setComponent(null);
        }
      };
      loadComponent();
    }
  }, [slug]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!Component) {
    return <div>Loading...</div>;
  }

  return <Component />;
};

export default DynamicRoutePage;
