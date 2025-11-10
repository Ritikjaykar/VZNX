const BASE_URL = "https://vznx-fu2q.onrender.com/api";

export async function http(path, options = {}) {
  // Remove any leading slashes from path
  const cleanPath = path.replace(/^\/+/, '');
  
  // Build URL with single slash
  const url = `${BASE_URL}/${cleanPath}`;
  
  console.log("📡 Fetching:", url);

  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, config);

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Error:", res.status, text);
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}