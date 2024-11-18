let fetch;

exports.handler = async function(event, context) {
  if (!fetch) {
    fetch = (await import('node-fetch')).default;
  }

  // Extrair parâmetros do corpo da requisição
  const body = JSON.parse(event.body);
  const numeroProcesso = body.numeroProcesso;
  const tribunalAlias = body.tribunalAlias;

  const apiUrl = `https://api-publica.datajud.cnj.jus.br/${tribunalAlias}/_search`;

  // Acessar a chave de API de uma variável de ambiente
  const apiKey = process.env.DATAJUD_API_KEY; 
  const headers = {
    'Authorization': `ApiKey ${apiKey}`,
    'Content-Type': 'application/json'
  };

  const requestBody = {
    query: {
      term: {
        numeroProcesso: numeroProcesso,
      },
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
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