import React, { useEffect, useState } from "react";
import "./index.css";

export default function ProductViewer() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen w-full grid grid-cols-3 gap-4 p-4 bg-gray-100">
      <div className="col-span-1 bg-white rounded-2xl shadow p-4 flex flex-col">
        <input
          type="text"
          placeholder="Zoek op titel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-xl mb-4"
        />
        <div className="overflow-y-auto space-y-2">
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelected(p)}
              className={`p-3 rounded-xl cursor-pointer border shadow-sm transition hover:bg-gray-100 ${
                selected?.id === p.id ? "bg-blue-100 border-blue-400" : "bg-white"
              }`}
            >
              <div className="font-semibold text-sm">{p.title}</div>
              <div className="text-gray-600 text-xs">€ {p.price}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-2 bg-white rounded-2xl shadow p-6">
        {!selected ? (
          <div className="text-gray-500 text-lg">
            Selecteer een product uit de lijst
          </div>
        ) : (
          <div className="flex gap-6">
            <img
              src={selected.image}
              alt={selected.title}
              className="w-48 h-48 object-contain border rounded-xl"
            />
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold">{selected.title}</h2>
              <p className="text-gray-700 max-w-xl">{selected.description}</p>
              <div className="text-xl font-semibold">€ {selected.price}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
