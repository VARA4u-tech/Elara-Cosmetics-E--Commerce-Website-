import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { categories, getProductsByCategory, concerns } from "@/data/products";
import { useState } from "react";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [sortBy, setSortBy] = useState("bestselling");
  
  const category = categories.find((c) => c.id === categoryId);
  const products = getProductsByCategory(categoryId || "");

  if (!category) {
    return <Layout><div className="container mx-auto px-4 py-20 text-center">Category not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl mb-3">{category.name}</h1>
          <p className="text-muted-foreground">Discover our {category.name.toLowerCase()} care collection</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-muted-foreground">{products.length} products</p>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-border px-4 py-2 text-sm bg-background"
          >
            <option value="bestselling">Bestselling</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
