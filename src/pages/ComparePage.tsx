import { Link } from "react-router-dom";
import { ArrowLeft, Star, Check, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/ui/PageTransition";
import { useCompare } from "@/context/CompareContext";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ComparePage = () => {
  const { compareItems, removeFromCompare } = useCompare();
  const { addItem } = useCart();

  if (compareItems.length < 2) {
    return (
      <Layout>
        <PageTransition>
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="font-serif text-3xl mb-4">Compare Products</h1>
            <p className="text-muted-foreground mb-8">
              Add at least 2 products to compare their features
            </p>
            <Link to="/category/face" className="btn-luxury">
              Browse Products
            </Link>
          </div>
        </PageTransition>
      </Layout>
    );
  }

  const comparisonAttributes = [
    { key: "price", label: "Price", render: (p: typeof compareItems[0]) => formatPrice(p.price) },
    { key: "rating", label: "Rating", render: (p: typeof compareItems[0]) => (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-primary text-primary" />
        <span>{p.rating}</span>
        <span className="text-muted-foreground">({p.reviews})</span>
      </div>
    )},
    { key: "size", label: "Size", render: (p: typeof compareItems[0]) => p.size },
    { key: "category", label: "Category", render: (p: typeof compareItems[0]) => (
      <span className="capitalize">{p.category}</span>
    )},
    { key: "subcategory", label: "Type", render: (p: typeof compareItems[0]) => p.subcategory },
    { key: "concerns", label: "Skin Concerns", render: (p: typeof compareItems[0]) => (
      <div className="flex flex-wrap gap-1">
        {p.concern?.map((c) => (
          <span key={c} className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground">
            {c}
          </span>
        ))}
      </div>
    )},
    { key: "isNew", label: "New Arrival", render: (p: typeof compareItems[0]) => (
      p.isNew ? <Check className="w-4 h-4 text-primary" /> : <X className="w-4 h-4 text-muted-foreground" />
    )},
    { key: "isBestseller", label: "Bestseller", render: (p: typeof compareItems[0]) => (
      p.isBestseller ? <Check className="w-4 h-4 text-primary" /> : <X className="w-4 h-4 text-muted-foreground" />
    )},
  ];

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/category/face"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-center mb-8">
            Compare Products
          </h1>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Product Images & Names */}
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left w-32 md:w-48 text-sm font-medium text-muted-foreground">
                    Product
                  </th>
                  {compareItems.map((product) => (
                    <th key={product.id} className="p-4 text-center min-w-[200px]">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute -top-2 -right-2 p-1 bg-background border border-border hover:border-destructive hover:text-destructive transition-colors z-10"
                          aria-label="Remove"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-32 h-32 object-cover mx-auto mb-3 hover:opacity-80 transition-opacity"
                          />
                          <h3 className="font-serif text-sm line-clamp-2 hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {comparisonAttributes.map((attr) => (
                  <tr key={attr.key} className="border-b border-border">
                    <td className="p-4 text-sm font-medium text-muted-foreground">
                      {attr.label}
                    </td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center text-sm">
                        {attr.render(product)}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Description Row */}
                <tr className="border-b border-border">
                  <td className="p-4 text-sm font-medium text-muted-foreground align-top">
                    Description
                  </td>
                  {compareItems.map((product) => (
                    <td key={product.id} className="p-4 text-sm text-left">
                      <p className="line-clamp-4">{product.description}</p>
                    </td>
                  ))}
                </tr>

                {/* Key Ingredients Row */}
                <tr className="border-b border-border">
                  <td className="p-4 text-sm font-medium text-muted-foreground align-top">
                    Key Ingredients
                  </td>
                  {compareItems.map((product) => (
                    <td key={product.id} className="p-4 text-sm text-left">
                      <p className="line-clamp-3">{product.ingredients}</p>
                    </td>
                  ))}
                </tr>

                {/* Add to Cart Row */}
                <tr>
                  <td className="p-4"></td>
                  {compareItems.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <button
                        onClick={() => addItem(product)}
                        className="btn-luxury text-sm px-6"
                      >
                        Add to Bag
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default ComparePage;
