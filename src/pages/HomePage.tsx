import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/HomePage.css';

const HomePage = () => {

  interface Product {
    _id: string;
    productName: string;
    description: string;
    category: string;
    amount: number;
    price: number;
  }

  const [products, setProducts] = useState<Product[]>([]);

  // Funktion för att hämta alla produkter från API:t
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Fel vid hämtning av produkter:", error);
    }
  };

  // Körs vid sidladdning
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Välkommen</h1>

      <h2 className="homepage-subtitle">Alla produkter</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className="product-item">
          <Link to={`/product/${product._id}`} className="product-link">
            <strong>{product.productName}</strong>
          </Link>
          <div className="product-info">
            <span>Kategori: {product.category}</span>
            <span>Beskrivning: {product.description}</span>
            <span>
              Lagersaldo:{" "}
              {product.amount > 10 ? "Fler än 10 i lager" : "Färre än 10 i lager"}
            </span>
            <span>Pris: {product.price} SEK</span>
          </div>
        </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage