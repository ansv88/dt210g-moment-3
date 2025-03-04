import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './css/ProductPage.css';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); //För att navigera tillbaka

  const [product, setProduct] = useState<{
    productName: string;
    description: string;
    category: string;
    amount: number;
    price: number;
  } | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Fel vid hämtning av produkt:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Laddar produkt...</p>;

  //Kontrollera lagersaldo
  const lagerStatus = product.amount > 10 ? "Fler än 10 i lager" : "Färre än 10 i lager";

  return (
    <div className="product-page-container">
      <h1 className="product-title">{product.productName}</h1>
      <div className="product-details">
        <p>
          <strong>Kategori:</strong> {product.category}
        </p>
        <p>
          <strong>Beskrivning:</strong> {product.description}
        </p>
        <p>
          <strong>Lagersaldo:</strong> {lagerStatus}
        </p>
        <p>
          <strong>Pris:</strong> {product.price} SEK
        </p>
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>
        Tillbaka
      </button>
    </div>
  );
};


export default ProductPage;
