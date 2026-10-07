import { useEffect, useState } from "react";
import { api, API_URL } from "@/api/api";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  async function loadProducts() {
    const data = await api.get("/api/products?limit=100");
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function uploadImage() {
    if (!selected || !file) {
      setMessage("Select a product and an image first.");
      return;
    }

    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/api/uploads`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      setMessage("Upload failed.");
      return;
    }

    const upload = await response.json();

    await api.put(`/api/products/${selected}/image`, {
      image: upload.url,
    });

    setMessage("Image uploaded successfully.");
    setFile(null);
    await loadProducts();
  }

  return (
    <div className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-heading text-5xl text-coffee">
          G_GLAMS NATURALS
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Product Image Management
        </p>

        <div className="mt-10 bg-white p-6 shadow-sm">
          <label className="block text-xs uppercase tracking-widest text-coffee">
            Product
          </label>

          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="mt-2 w-full border border-sandstone bg-cream p-3"
          >
            <option value="">Select a product</option>

            {products.map((product) => (
              <option key={product.id} value={product.slug}>
                {product.name}
              </option>
            ))}
          </select>

          <label className="mt-6 block text-xs uppercase tracking-widest text-coffee">
            Product Image
          </label>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-2 block w-full"
          />

          <button
            onClick={uploadImage}
            className="mt-6 bg-coffee px-7 py-3 text-xs uppercase tracking-widest text-cream hover:bg-ochre transition-colors"
          >
            Upload Image
          </button>

          {message && (
            <p className="mt-4 text-sm text-muted-foreground">
              {message}
            </p>
          )}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4">
              {product.image ? (
                <img
                  src={`${API_URL}${product.image}`}
                  alt={product.name}
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center bg-sandstone text-center text-xs uppercase tracking-widest text-ochre">
                  No image
                </div>
              )}

              <p className="mt-3 font-heading text-xl text-coffee">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
