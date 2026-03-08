import { getStore } from "@netlify/blobs";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

export default async (request, context) => {
  if (request.method === "OPTIONS") {
    return new Response("", { status: 200, headers });
  }

  try {
    const store = getStore({
      name: "rahim-enterprise",
      consistency: "strong",
    });

    // GET
    if (request.method === "GET") {
      const url = new URL(request.url);
      const key = url.searchParams.get("key");
      if (!key) {
        return new Response(JSON.stringify({ error: "key required" }), { status: 400, headers });
      }
      try {
        const value = await store.get(key);
        return new Response(JSON.stringify({ value: value || null }), { status: 200, headers });
      } catch {
        return new Response(JSON.stringify({ value: null }), { status: 200, headers });
      }
    }

    // POST
    if (request.method === "POST") {
      let body;
      try {
        body = await request.json();
      } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers });
      }
      const { key, value } = body;
      if (!key) {
        return new Response(JSON.stringify({ error: "key required" }), { status: 400, headers });
      }
      await store.set(key, value ?? "");
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });

  } catch (err) {
    console.error("Blob error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
};

export const config = { path: "/api/data" };
