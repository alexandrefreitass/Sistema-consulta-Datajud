const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    // Log da requisição recebida
    console.log('Requisição recebida pelo proxy:', event.body);

    // Extrair os parâmetros do corpo da requisição
    const { numeroProcesso, tribunalAlias } = JSON.parse(event.body);

    // Verificar se os parâmetros foram recebidos corretamente
    console.log('Número do processo:', numeroProcesso);
    console.log('Tribunal selecionado:', tribunalAlias);

    // Montar a URL da API
    const apiUrl = `https://api-publica.datajud.cnj.jus.br/${tribunalAlias}/_search`;

    // Cabeçalhos da requisição
    const headers = {
      'Authorization': `ApiKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==`,
      'Content-Type': 'application/json'
    };

    // Corpo da requisição que será enviado para a API
    const body = {
      query: {
        match: {
          numeroProcesso: numeroProcesso
        }
      }
    };

    // Log da requisição enviada à API do DataJud
    console.log('Enviando requisição para a API:', apiUrl);
    console.log('Corpo da requisição para a API:', JSON.stringify(body));

    // Fazer a requisição para a API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    // Verificar se a resposta é válida
    if (!response.ok) {
      console.error('Erro ao fazer a requisição para a API:', response.status, response.statusText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Erro ao acessar a API: ${response.statusText}` })
      };
    }

    // Processar a resposta
    const data = await response.json();

    // Logar a resposta da API
    console.log('Resposta da API recebida:', data);

    // Retornar a resposta da API para o frontend
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
