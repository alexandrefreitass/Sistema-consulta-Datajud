import fetch from 'node-fetch';

exports.handler = async function (event) {
  const numeroProcesso = event.queryStringParameters.numeroProcesso;
  const tribunalAlias = event.queryStringParameters.tribunalAlias;

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

    if (!response.ok) {
      throw new Error(`Erro na resposta da API: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Erro na função Lambda:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
