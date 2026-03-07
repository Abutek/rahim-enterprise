const { getStore } = require("@netlify/blobs");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

exports.handler = async (event) => {
  // OPTIONS (preflight) request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const store = getStore({
      name: "rahim-enterprise",
      consistency: "strong",
    });

    // ── GET: ডেটা লোড ──
    if (event.httpMethod === "GET") {
      const key = event.queryStringParameters?.key;
      if (!key) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "key is required" }),
        };
      }
      try {
        const value = await store.get(key);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ value: value || null }),
        };
      } catch {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ value: null }),
        };
      }
    }

    // ── POST: ডেটা সেভ ──
    if (event.httpMethod === "POST") {
      let body;
      try {
        body = JSON.parse(event.body || "{}");
      } catch {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Invalid JSON body" }),
        };
      }

      const { key, value } = body;
      if (!key) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "key is required" }),
        };
      }

      await store.set(key, value ?? "");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (err) {
    console.error("Blob function error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
