import { useState, useEffect } from "react";
import { openDB, DBSchema } from "idb";

interface ImageItem {
  id: string;
  name: string;
  data: string;
  date: string;
  featured?: boolean;
}

interface GalleryDB extends DBSchema {
  images: {
    key: string;
    value: ImageItem;
    indexes: { "by-date": string };
  };
}

const getDB = async () => {
  return openDB<GalleryDB>("gallery-db", 1, {
    upgrade(db) {
      const store = db.createObjectStore("images", { keyPath: "id" });
      store.createIndex("by-date", "date");
    },
  });
};

function Slider({ images }: { images: ImageItem[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images.length) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-200">
        No images
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-96">
      {images.map((img, idx) => (
        <img
          key={img.id}
          src={img.data}
          alt={img.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <button
        onClick={() =>
          setCurrent((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8"
      >
        ‹
      </button>

      <button
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8"
      >
        ›
      </button>
    </div>
  );
}

export function App() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [section, setSection] = useState<"home" | "gallery" | "about">("home");
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      const db = await getDB();
      const all = await db.getAll("images");
      setImages(all);
    })();
  }, []);

  const persistImage = async (img: ImageItem) => {
    const db = await getDB();
    await db.put("images", img);
  };

  const deleteFromDB = async (id: string) => {
    const db = await getDB();
    await db.delete("images", id);
  };

  const addImages = (files: FileList) => {
    const newImages: ImageItem[] = [];

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();

      reader.onload = async (e) => {
        const img: ImageItem = {
          id: crypto.randomUUID(),
          name: file.name,
          data: e.target?.result as string,
          date: new Date().toISOString(),
        };

        newImages.push(img);
        await persistImage(img);
        setImages((prev) => [...prev, img]);
      };

      reader.readAsDataURL(file);
    });
  };

  const deleteImage = async (id: string) => {
    if (!adminLoggedIn) return;

    await deleteFromDB(id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const login = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      setAdminLoggedIn(true);
      setShowLogin(false);
    } else {
      alert("Credencialet e pasakta");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-indigo-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">ART-STONE</h1>

        <div className="space-x-4">
          <button onClick={() => setSection("home")}>Home</button>
          <button onClick={() => setSection("gallery")}>Gallery</button>
          <button onClick={() => setSection("about")}>About</button>

          {adminLoggedIn ? (
            <button
              onClick={() => {
                localStorage.setItem("adminLoggedIn", "false");
                setAdminLoggedIn(false);
              }}
            >
              Logout
            </button>
          ) : (
            <button onClick={() => setShowLogin(true)}>Admin</button>
          )}
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">

        {section === "home" && (
          <Slider images={images.slice(0, 5)} />
        )}

        {section === "gallery" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img.id}>
                <img
                  src={img.data}
                  className="w-full h-48 object-cover rounded"
                />
                {adminLoggedIn && (
                  <button
                    onClick={() => deleteImage(img.id)}
                    className="text-red-500 text-sm"
                  >
                    delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {section === "about" && (
          <p className="text-gray-600">
            Gallery app për ndarjen e fotove.
          </p>
        )}

        {adminLoggedIn && (
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && addImages(e.target.files)}
            className="mt-6"
          />
        )}
      </main>

      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white p-6 rounded w-80">

            <h3 className="text-lg font-bold mb-4">Admin Login</h3>

            <input
              className="border p-2 w-full mb-2"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="border p-2 w-full mb-4"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={login}
              className="bg-indigo-600 text-white w-full p-2 rounded"
            >
              Login
            </button>

            <button
              onClick={() => setShowLogin(false)}
              className="text-gray-500 mt-2"
            >
              Cancel
            </button>

          </div>

        </div>
      )}
    </div>
  );
}
