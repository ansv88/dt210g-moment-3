import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/HomePage.css';
import API_URL from "../config";

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
      const response = await fetch(`${API_URL}/products`);
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
      <h1 className="homepage-title">Välkommen till vår produktkatalog!</h1>
      <div className="intro-container">
        <p>
          Här hittar du ett brett utbud av produkter inom flera kategorier. Vi erbjuder 
          <strong> elektronik</strong> såsom datorutrustning, tangentbord och skärmar, samt inom
          skönhet och hälsa med produkter som personvågar och eltandborstar.
        </p>
        <br />
        <p>
          Utforska vårt lager och hitta produkter som passar dina behov – oavsett om det är teknik
          för hemmet, smarta hälsoprodukter eller något annat användbart!
        </p>
      </div>
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