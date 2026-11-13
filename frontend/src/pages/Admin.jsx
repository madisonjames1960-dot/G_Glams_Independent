import { useEffect, useState } from "react";
import { API_URL } from "@/api/api";

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("gg_admin_token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("");
  const [file, setFile] = useState(null);
  const [aboutFile, setAboutFile] = useState(null);
  const [heroFile, setHeroFile] = useState(null);
  const [heroImage, setHeroImage] = useState("");
  const [aboutImage, setAboutImage] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadProducts() {
    const response = await fetch(`${API_URL}/api/products?limit=100`);
    if (!response.ok) throw new Error("Could not load products.");
    setProducts(await response.json());
  }

  async function loadAboutImage() {
    const response = await fetch(`${API_URL}/api/site-content/about-image`);
    if (!response.ok) throw new Error("Could not load the Our Story image.");
    const data = await response.json();
    setAboutImage(data.image_url || "");
  }

  async function loadHeroImage() {
    const response = await fetch(`${API_URL}/api/site-content/hero-image`);
    if (!response.ok) throw new Error("Could not load the Hero image.");
    const data = await response.json();
    setHeroImage(data.image_url || "");
  }

  async function loadSocialFeed() {
    const response = await fetch(`${API_URL}/api/site-content/social-feed`);
    if (!response.ok) throw new Error("Could not load social links.");
    const data = await response.json();
    setInstagramUrl(data.instagram_url || "");
    setTiktokUrl(data.tiktok_url || "");
  }

  useEffect(() => {
    if (!token) return;

    loadProducts().catch((error) => setMessage(error.message));
    loadAboutImage().catch((error) => setMessage(error.message));
    loadHeroImage().catch((error) => setMessage(error.message));
    loadSocialFeed().catch((error) => setMessage(error.message));
  }, [token]);

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("Signing in...");

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Administrator login failed.");

      sessionStorage.setItem("gg_admin_token", data.access_token);
      setToken(data.access_token);
      setPassword("");
      setMessage("Administrator login successful.");
    } catch (error) {
      setMessage(error.message || "Could not sign in.");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    sessionStorage.removeItem("gg_admin_token");
    setToken("");
    setProducts([]);
    setSelected("");
    setFile(null);
    setAboutFile(null);
    setAboutImage("");
    setHeroFile(null);
    setHeroImage("");
    setMessage("");
  }

  async function uploadImage() {
    if (!selected || !file) {
      setMessage("Select a product and an image first.");
      return;
    }

    setLoading(true);
    setMessage("Uploading product image...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch(`${API_URL}/api/uploads`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const upload = await uploadResponse.json();

      if (!uploadResponse.ok) {
        if (uploadResponse.status === 401 || uploadResponse.status === 403) {
          logout();
          throw new Error("Your administrator session expired. Please sign in again.");
        }
        throw new Error(upload.detail || "Image upload failed.");
      }

      const updateResponse = await fetch(
        `${API_URL}/api/products/${encodeURIComponent(selected)}/image`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ image: upload.url }),
        }
      );

      const updated = await updateResponse.json();

      if (!updateResponse.ok) {
        if (updateResponse.status === 401 || updateResponse.status === 403) {
          logout();
          throw new Error("Your administrator session expired. Please sign in again.");
        }
        throw new Error(updated.detail || "Could not save the product image.");
      }

      setFile(null);
      setMessage("Product image uploaded and saved successfully.");
      await loadProducts();
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function uploadHeroImage() {
    if (!heroFile) {
      setMessage("Choose a Hero image first.");
      return;
    }

    setLoading(true);
    setMessage("Uploading Hero image...");

    try {
      const formData = new FormData();
      formData.append("file", heroFile);

      const uploadResponse = await fetch(`${API_URL}/api/uploads`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const upload = await uploadResponse.json();

      if (!uploadResponse.ok) {
        if (uploadResponse.status === 401 || uploadResponse.status === 403) {
          logout();
          throw new Error("Your administrator session expired. Please sign in again.");
        }
        throw new Error(upload.detail || "Image upload failed.");
      }

      const saveResponse = await fetch(`${API_URL}/api/site-content/hero-image`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image_url: upload.url }),
      });

      const saved = await saveResponse.json();

      if (!saveResponse.ok) {
        if (saveResponse.status === 401 || saveResponse.status === 403) {
          logout();
          throw new Error("Your administrator session expired. Please sign in again.");
        }
        throw new Error(saved.detail || "Could not save the Hero image.");
      }

      setHeroImage(saved.image_url);
      setHeroFile(null);
      setMessage("Hero image uploaded and saved successfully.");
    } catch (error) {
      setMessage(error.message || "Could not upload the Hero image.");
    } finally {
      setLoading(false);
    }
  }

  async function uploadAboutImage() {
    if (!aboutFile) {
      setMessage("Choose an Our Story image first.");
      return;
    }

    setLoading(true);
    setMessage("Uploading Our Story image...");

    try {
      const formData = new FormData();
      formData.append("file", aboutFile);

      const uploadResponse = await fetch(`${API_URL}/api/uploads`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const upload = await uploadResponse.json();

      if (!uploadResponse.ok) {
        if (uploadResponse.status === 401 || uploadResponse.status === 403) {
          logout();
          throw new Error("Your administrator session expired. Please sign in again.");
        }
        throw new Error(upload.detail || "Image upload failed.");
      }

      const saveResponse = await fetch(`${API_URL}/api/site-content/about-image`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image_url: upload.url }),
      });

      const saved = await saveResponse.json();

      if (!saveResponse.ok) {
        if (saveResponse.status === 401 || saveResponse.status === 403) {
          logout();
          throw new Error("Your administrator session expired. Please sign in again.");
        }
        throw new Error(saved.detail || "Could not save the Our Story image.");
      }

      setAboutImage(saved.image_url);
      setAboutFile(null);
      setMessage("Our Story image uploaded and saved successfully.");
    } catch (error) {
      setMessage(error.message || "Could not upload the Our Story image.");
    } finally {
      setLoading(false);
    }
  }

  async function saveSocialFeed() {
    setLoading(true);
    setMessage("Saving social media links...");

    try {
      const response = await fetch(`${API_URL}/api/site-content/social-feed`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          instagram_url: instagramUrl,
          tiktok_url: tiktokUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          logout();
          throw new Error("Your administrator session expired. Please sign in again.");
        }
        throw new Error(data.detail || "Could not save social media links.");
      }

      setInstagramUrl(data.instagram_url || "");
      setTiktokUrl(data.tiktok_url || "");
      setMessage("Instagram and TikTok links saved successfully.");
    } catch (error) {
      setMessage(error.message || "Could not save social media links.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-cream px-6 py-12">
        <div className="mx-auto max-w-md bg-white p-8 shadow-sm">
          <h1 className="font-heading text-4xl text-coffee">G_GLAMS NATURALS</h1>
          <p className="mt-2 text-sm text-muted-foreground">Store Administrator Login</p>

          <form onSubmit={login} className="mt-8">
            <label className="block text-xs uppercase tracking-widest text-coffee">Username</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
              className="mt-2 w-full border border-sandstone bg-cream p-3"
            />

            <label className="mt-5 block text-xs uppercase tracking-widest text-coffee">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="mt-2 w-full border border-sandstone bg-cream p-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-coffee px-7 py-3 text-xs uppercase tracking-widest text-cream hover:bg-ochre transition-colors disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Administrator Sign In"}
            </button>
          </form>

          {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-5xl text-coffee">G_GLAMS NATURALS</h1>
            <p className="mt-2 text-sm text-muted-foreground">Website Image Management</p>
          </div>

          <button
            onClick={logout}
            className="border border-coffee px-5 py-3 text-xs uppercase tracking-widest text-coffee"
          >
            Sign Out
          </button>
        </div>

        <div className="mt-10 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-coffee">Hero Image Management</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload or replace the main homepage image. A product composition or lifestyle photo works best.
          </p>

          {heroImage && (
            <img
              src={heroImage}
              alt="Current homepage Hero image"
              className="mt-5 aspect-[4/5] max-h-80 w-auto object-cover"
            />
          )}

          <label className="mt-6 block text-xs uppercase tracking-widest text-coffee">
            Choose Hero Image
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => setHeroFile(event.target.files?.[0] || null)}
            className="mt-2 block w-full"
          />

          <button
            onClick={uploadHeroImage}
            disabled={loading || !heroFile}
            className="mt-6 bg-coffee px-7 py-3 text-xs uppercase tracking-widest text-cream hover:bg-ochre transition-colors disabled:opacity-50"
          >
            {loading ? "Please Wait..." : "Upload Hero Image"}
          </button>
        </div>
        <div className="mt-10 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-coffee">Our Story / Brand Image</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload or replace the image displayed in the Our Story section.
          </p>

          {aboutImage && (
            <img
              src={aboutImage}
              alt="Current Our Story image"
              className="mt-5 aspect-[4/5] max-h-80 w-auto object-cover"
            />
          )}

          <label className="mt-6 block text-xs uppercase tracking-widest text-coffee">
            Choose Brand or Founder Image
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => setAboutFile(event.target.files?.[0] || null)}
            className="mt-2 block w-full"
          />

          <button
            onClick={uploadAboutImage}
            disabled={loading || !aboutFile}
            className="mt-6 bg-coffee px-7 py-3 text-xs uppercase tracking-widest text-cream hover:bg-ochre transition-colors disabled:opacity-50"
          >
            {loading ? "Please Wait..." : "Upload Our Story Image"}
          </button>
        </div>

        <div className="mt-8 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-coffee">Instagram & TikTok Feed</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Paste the links to the individual public posts or videos you want displayed on your homepage.
          </p>

          <label className="mt-6 block text-xs uppercase tracking-widest text-coffee">
            Instagram Post Link
          </label>
          <input
            type="url"
            value={instagramUrl}
            onChange={(event) => setInstagramUrl(event.target.value)}
            placeholder="https://www.instagram.com/p/..."
            className="mt-2 w-full border border-sandstone bg-cream p-3"
          />

          <label className="mt-6 block text-xs uppercase tracking-widest text-coffee">
            TikTok Video Link
          </label>
          <input
            type="url"
            value={tiktokUrl}
            onChange={(event) => setTiktokUrl(event.target.value)}
            placeholder="https://www.tiktok.com/@.../video/..."
            className="mt-2 w-full border border-sandstone bg-cream p-3"
          />

          <button
            onClick={saveSocialFeed}
            disabled={loading}
            className="mt-6 bg-coffee px-7 py-3 text-xs uppercase tracking-widest text-cream hover:bg-ochre transition-colors disabled:opacity-50"
          >
            {loading ? "Please Wait..." : "Save Social Links"}
          </button>
        </div>
        <div className="mt-8 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl text-coffee">Product Image Management</h2>

          <label className="mt-6 block text-xs uppercase tracking-widest text-coffee">Product</label>
          <select
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
            className="mt-2 w-full border border-sandstone bg-cream p-3"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.slug}>{product.name}</option>
            ))}
          </select>

          <label className="mt-6 block text-xs uppercase tracking-widest text-coffee">Product Image</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
            className="mt-2 block w-full"
          />

          <button
            onClick={uploadImage}
            disabled={loading}
            className="mt-6 bg-coffee px-7 py-3 text-xs uppercase tracking-widest text-cream hover:bg-ochre transition-colors disabled:opacity-50"
          >
            {loading ? "Please Wait..." : "Upload Product Image"}
          </button>

          {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const imageSrc = product.image
              ? product.image.startsWith("http")
                ? product.image
                : `${API_URL}${product.image}`
              : null;

            return (
              <div key={product.id} className="bg-white p-4">
                {imageSrc ? (
                  <img src={imageSrc} alt={product.name} className="aspect-[4/5] w-full object-cover" />
                ) : (
                  <div className="flex aspect-[4/5] items-center justify-center bg-sandstone text-center text-xs uppercase tracking-widest text-ochre">
                    No image
                  </div>
                )}
                <p className="mt-3 font-heading text-xl text-coffee">{product.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


