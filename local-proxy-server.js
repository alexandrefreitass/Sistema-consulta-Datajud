require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Polyfill fetch para Node.js < 18
if (!global.fetch) {
  const { default: fetch } = require('node-fetch');
  global.fetch = fetch;
}

const app = express();
const port = 3000; // Porta para o nosso servidor local

app.use(cors()); // Habilita o CORS para todas as requisições
app.use(express.json()); // Habilita o parsing de JSON no corpo da requisição

// Endpoint que a sua aplicação Angular irá chamar
app.post('/api/consulta', async (req, res) => {
  const requestId = Math.random().toString(36).substr(2, 9);
  const { numeroProcesso, tribunalAlias, timestamp } = req.body;
  const apiKey = process.env.DATAJUD_API_KEY;

  console.log(`\n🆔 [${requestId}] Nova requisição recebida:`, {
    numeroProcesso,
    tribunalAlias,
    timestamp,
    time: new Date().toISOString()
  });

  if (!apiKey) {
    console.error(`❌ [${requestId}] DATAJUD_API_KEY não encontrada`);
    return res.status(500).json({ 
      error: 'DATAJUD_API_KEY não encontrada no arquivo .env',
      requestId 
    });
  }

  const apiUrl = `https://api-publica.datajud.cnj.jus.br/${tribunalAlias}/_search`;
  const headers = {
    'Authorization': `ApiKey ${apiKey}`,
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'User-Agent': `DatajudConsulta/1.0 RequestId/${requestId}`
  };

  const requestBody = {
    query: {
      term: {
        numeroProcesso: numeroProcesso,
      },
    },
  };

  try {
    console.log(`🔍 [${requestId}] Fazendo requisição para:`, apiUrl);
    console.log(`📋 [${requestId}] Dados enviados:`, JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });
    
    console.log(`📥 [${requestId}] Status da resposta:`, response.status);
    
    const data = await response.json();
    console.log(`📦 [${requestId}] Dados recebidos - Total hits:`, data.hits?.total?.value || 0);
    
    // Adiciona headers para evitar cache no navegador
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Request-Id': requestId
    });
    
    console.log(`✅ [${requestId}] Resposta enviada com sucesso\n`);
    res.status(response.status).json(data);
  } catch (error) {
    console.error(`❌ [${requestId}] Erro detalhado:`, error.message);
    console.error(`❌ [${requestId}] Stack trace:`, error.stack);
    
    res.status(500).json({ 
      error: 'Erro ao buscar o processo no servidor local.',
      details: error.message,
      timestamp: new Date().toISOString(),
      requestId
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor proxy local rodando em http://localhost:${port}`);
});