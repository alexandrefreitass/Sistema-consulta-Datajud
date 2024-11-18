import fetch from 'node-fetch'; // Import do fetch em ES Modules

export async function handler(event, context) {
  const { numeroProcesso, tribunalAlias } = JSON.parse(event.body); // Ajuste para extrair do `body`

  const apiUrl = `https://api-publica.datajud.cnj.jus.br/${tribunalAlias}/_search`;
  const headers = {
    'Authorization': `ApiKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==`,
    'Content-Type': 'application/json',
  };

  const body = {
    query: {
      match: {
        numeroProcesso: numeroProcesso,
      },
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Erro na função Lambda:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao processar a requisição.' }),
    };
  }
}
