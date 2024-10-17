const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Extrair os dados do corpo da requisição
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao buscar o processo.' })
    };
  }
};