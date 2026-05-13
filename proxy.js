exports.handler = async (event) => {
  const endpoint = event.queryStringParameters?.endpoint;
  if (!endpoint) return { statusCode: 400, body: 'endpoint obrigatório' };

  const url = `https://api.tiny.com.br/api2/${endpoint}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: event.body
    });
    const text = await res.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: text
    };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
