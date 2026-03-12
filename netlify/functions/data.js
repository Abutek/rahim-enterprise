exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    // Dynamically import to avoid bundling issues
    const { getStore } = require("@netlify/blobs");
    
    const store = getStore({ name: "rahim-enterprise", consistency: "strong" });

    if (event.httpMethod === "GET") {
      const key = event.queryStringParameters?.key;
      if (!key) return { statusCode: 400, headers, body: JSON.stringify({ error: "key required" }) };
      try {
        const value = await store.get(key);
        return { statusCode: 200, headers, body: JSON.stringify({ value: value || null }) };
      } catch(e) {
        console.log("get error:", e.message);
        return { statusCode: 200, headers, body: JSON.stringify({ value: null }) };
      }
    }

    if (event.httpMethod === "POST") {
      let body;
      try { body = JSON.parse(event.body); } catch {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
      }
      const { key, value } = body;
      if (!key) return { statusCode: 400, headers, body: JSON.stringify({ error: "key required" }) };
      await store.set(key, value ?? "");
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };

  } catch (err) {
    console.error("Function error:", err.message, err.stack);
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ error: err.message, stack: err.stack?.split('\n').slice(0,3).join(' | ') }) 
    };
  }
};
