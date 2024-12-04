import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Típus a bevásárló lista elemeihez
interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
}

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [idCounter, setIdCounter] = useState<number>(1);

  // Elem hozzáadása
  const handleAddItem = () => {
    const trimmedName = name.trim();
    const trimmedQuantity = quantity.trim();
    const trimmedUnit = unit.trim();

    // Validációk
    if (!trimmedName || !trimmedQuantity || !trimmedUnit) {
      setError("Minden mezőt ki kell tölteni!");
      return;
    }

    if (isNaN(Number(trimmedQuantity)) || Number(trimmedQuantity) <= 0) {
      setError("A mennyiségnek pozitív számnak kell lennie!");
      return;
    }

    if (/\s{2,}/.test(`${trimmedQuantity} ${trimmedUnit}`)) {
      setError("A mennyiség és az egység között csak egy szóköz lehet!");
      return;
    }

    if (items.some((item) => item.name.toLowerCase() === trimmedName.toLowerCase())) {
      setError("Ez a termék már szerepel a listában!");
      return;
    }

    // Új elem létrehozása
    const newItem: ShoppingItem = {
      id: idCounter,
      name: trimmedName,
      quantity: Number(trimmedQuantity),
      unit: trimmedUnit,
      purchased: false,
    };

    setItems([...items, newItem]);
    setIdCounter(idCounter + 1);
    setName("");
    setQuantity("");
    setUnit("");
    setError("");
  };

  // Elem törlése
  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Állapot váltása (megvásárolva/nem megvásárolva)
  const handleTogglePurchased = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Bevásárló Lista</h1>
      <div className="mb-3">
        <label className="form-label">Terméknév:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Mennyiség:</label>
        <input
          type="text"
          className="form-control"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Mennyiségi egység:</label>
        <input
          type="text"
          className="form-control"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-success mb-3" onClick={handleAddItem}>
        Hozzáadás
      </button>
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              item.purchased ? "list-group-item-success" : ""
            }`}
          >
            <span
              style={{
                textDecoration: item.purchased ? "line-through" : "none",
                opacity: item.purchased ? 0.6 : 1,
              }}
            >
              {item.name} {item.quantity} {item.unit}
            </span>
            <div>
              <button
                className="btn btn-sm btn-outline-success me-2"
                onClick={() => handleTogglePurchased(item.id)}
              >
                {item.purchased ? "Visszaállítás" : "Megvásárolva"}
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteItem(item.id)}
              >
                Törlés
              </button>
            </div>
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <p className="text-center mt-3">
          {items.every((item) => item.purchased)
            ? "Minden tétel megvásárolva!"
            : `${items.filter((item) => !item.purchased).length} tétel van hátra.`}
        </p>
      )}
    </div>
  );
};

export default ShoppingList;
