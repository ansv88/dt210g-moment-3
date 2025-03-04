import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react";
import './css/Inventory.css';
import API_URL from "../config";

const Inventory = () => {

  interface Product {
    _id: string;
    productName: string;
    description: string;
    category: string;
    amount: number;
    price: number;
  }

  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("");

  //Formulärfält (återanvänds för både skapa/uppdatera)
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  //Håller koll på om en befintlig produkt redigeras
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  //Hämta token från localStorage
  const token = localStorage.getItem("token");

  //Hämtar alla produkter från API:t
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Fel vid hämtning av produkter:", error);
    }
  };

  //Körs vid sidladdning
  useEffect(() => {
    fetchProducts();
  }, []);

  //Uppdatera produkt genom att fylla i formulär och sätta editingProductId för att visa redigeringsläge
  const handleEditClick = (product: Product) => {
    setEditingProductId(product._id);
    setProductName(product.productName);
    setDescription(product.description);
    setCategory(product.category);
    setAmount(String(product.amount));
    setPrice(String(product.price));
    setMessage("Redigerar produkt: " + product.productName);
  };

  //Avbryt uppdatering genom att nollställa formulär och editingProductId
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setProductName("");
    setDescription("");
    setCategory("");
    setAmount("");
    setPrice("");
    setMessage("");
  };


  //Skicka formuläret
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage("Ingen behörighet, du måste vara inloggad.");
      return;
    }

    //Skapa ett objekt med produktdata
    const productData = {
      productName,
      description,
      category,
      amount: Number(amount), //Konvertera till nummer
      price: Number(price), //Konvertera till nummer
    };

    try {
      if (editingProductId) {
        //Uppdatera befintlig produkt
        const response = await fetch(`${API_URL}/products/${editingProductId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Kunde inte uppdatera produkten.");
        }

        setMessage("Produkten har uppdaterats!");
      } else {
        //Skapa ny produkt
        const response = await fetch(`${API_URL}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Något gick fel vid skapandet av produkten.");
        }

        setMessage("Produkten har skapats!");
      }

      //Nollställ formuläret
      setEditingProductId(null);
      setProductName("");
      setDescription("");
      setCategory("");
      setAmount("");
      setPrice("");

      //Hämta uppdaterad lista av produkter
      fetchProducts();
    } catch (error: any) {
      setMessage(error.message);
    }
  };


  //Ta bort en produkt
  const handleDelete = async (id: string) => {
    if (!token) {
      setMessage("Ingen behörighet, du måste vara inloggad.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Kunde inte ta bort produkten.");
      }

      setMessage("Produkten har tagits bort!");
      fetchProducts(); //Hämta produktlistan igen efter borttagning
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="inventory-container">
      <h1 className="inventory-title">
        Välkommen {user ? user.firstname : ""}!
      </h1>

      {message && <p className="inventory-message">{message}</p>}

      <h2 className="inventory-subtitle">
        {editingProductId ? "Uppdatera produkt" : "Lägg till en ny produkt"}
      </h2>

      <form onSubmit={handleSubmit} className="inventory-form">
        <label>
          Produktnamn:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>

        <label>
          Beskrivning:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Kategori:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>

        <label>
          Antal:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        <label>
          Pris:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <div className="button-group">
          <button type="submit">
            {editingProductId ? "Spara ändringar" : "Lägg till produkt"}
          </button>
          {editingProductId && (
            <button type="button" onClick={handleCancelEdit} id="removeBtn">
              Avbryt uppdatering
            </button>
          )}
        </div>
      </form>

      <hr className="inventory-separator" />

      <h2 className="inventory-subtitle">Alla produkter</h2>
      <ul className="inventory-product-list">
        {products.map((product) => (
          <li key={product._id} className="inventory-product-item">
            <strong>{product.productName}</strong> - {product.category} <br />
            Beskrivning: {product.description} <br />
            Antal: {product.amount}, Pris: {product.price} SEK
            <div className="button-group">
              {!editingProductId && (
                <button onClick={() => handleEditClick(product)}>
                  Uppdatera
                </button>
              )}
              <button onClick={() => handleDelete(product._id)} id="removeBtn">Ta bort</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Inventory