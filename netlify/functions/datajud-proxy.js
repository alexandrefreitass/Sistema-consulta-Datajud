const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    console.log('Requisição recebida:', event.body);

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

    console.log('Enviando requisição para a API:', apiUrl);
    console.log('Corpo da requisição:', body);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.error('Erro ao acessar a API:', response.status, response.statusText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Erro ao acessar a API: ${response.statusText}` })
      };
    }

    const data = await response.json();
    console.log('Resposta recebida da API:', data);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Erro no proxy Lambda:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro no proxy Lambda', details: error.message })
    };
  }
};
