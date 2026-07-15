"use client";

import React from "react";
import Container from "@/components/common/Container";
import Title from "./ui/title";
import { ProductGrid } from "@/components/product";
import useProducts from "@/hooks/use-products";

const sectionTitle = {
  title: "Featured",
  spanText: "Products",
};

const FeaturedSection = () => {
  const { products, isLoading } = useProducts();

  return (
    <Container as="section">
      <div className="py-12 md:py-16">
        <Title title={sectionTitle.title} spanText={sectionTitle.spanText} />

        <ProductGrid
          products={products ?? []}
          loading={isLoading}
          columns={4}
        />
      </div>
    </Container>
  );
};

export default FeaturedSection;