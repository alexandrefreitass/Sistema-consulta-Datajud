let fetch;

export async function handler (event, context) {
  if (!fetch) {
    fetch = (await import('node-fetch')).default;
  }

  const { numeroProcesso, tribunalAlias } = JSON.parse(event.body);

  const apiUrl = `https://api-publica.datajud.cnj.jus.br/${tribunalAlias}/_search`;

  const headers = {
    'Authorization': `ApiKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==`,
    'Content-Type': 'application/json'
  };

  const body = {
    query: {
      match: {
        numeroProcesso: numeroProcesso
      }
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Erro na função Lambda:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao buscar o processo.', details: error.message })
    };
  }
}
