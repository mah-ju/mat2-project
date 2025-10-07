# MAT2-Web Dockerizado

Este projeto combina o backend [mat2-web](https://0xacab.org/jvoisin/mat2-web) e o frontend [mat2-quasar-frontend](https://0xacab.org/jfriedli/mat2-quasar-frontend) em uma solução dockerizada unificada.

## Estrutura do Projeto

```
projetos/
├── mat2-web/                    # Backend (API Flask)
├── mat2-quasar-frontend/        # Frontend (Vue.js/Quasar)
├── docker-compose.yml           # Configuração unificada
└── README.md                    # Este arquivo
```

## Como Executar

### Pré-requisitos
- Docker
- Docker Compose

### Comandos

1. **Iniciar os serviços:**
   ```bash
   docker-compose up
   ```

2. **Iniciar em background:**
   ```bash
   docker-compose up -d
   ```

3. **Parar os serviços:**
   ```bash
   docker-compose down
   ```

4. **Rebuild após mudanças:**
   ```bash
   docker-compose up --build
   ```

## Acesso aos Serviços

- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:5000
- **API Docs:** http://localhost:5000/apidocs/

## Configurações

### Variáveis de Ambiente

#### Backend (mat2-backend)
- `FLASK_ENV=development` - Modo de desenvolvimento
- `MAT2_ALLOW_ORIGIN_WHITELIST=*` - CORS permitido para todos
- `MAT2_MAX_FILES_BULK_DOWNLOAD=10` - Máximo de arquivos para download em lote
- `MAT2_MAX_FILE_AGE_FOR_REMOVAL=60` - Tempo de vida dos arquivos (segundos)

#### Frontend (mat2-frontend)
- `MAT2_API_URL_DEV=http://mat2-backend:5000/` - URL da API backend

### Portas
- **Frontend:** 8080
- **Backend:** 5000

## Desenvolvimento

### Hot Reload
Ambos os serviços suportam hot reload:
- Backend: Reinicia automaticamente quando arquivos Python são modificados
- Frontend: Atualiza automaticamente no navegador quando arquivos Vue.js são modificados

### Logs
```bash
# Ver logs de todos os serviços
docker-compose logs

# Ver logs de um serviço específico
docker-compose logs mat2-backend
docker-compose logs mat2-frontend

# Seguir logs em tempo real
docker-compose logs -f
```

## Solução de Problemas

### Conflito de Portas
Se as portas 5000 ou 8080 estiverem em uso, modifique o arquivo `docker-compose.yml`:

```yaml
ports:
  - "5001:5000"  # Backend na porta 5001
  - "8081:8080"  # Frontend na porta 8081
```

### Rebuild Necessário
Após adicionar/remover dependências:
```bash
docker-compose down
docker-compose up --build
```

## Arquitetura

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │
│   (Vue.js)      │◄──►│   (Flask)       │
│   Port: 8080    │    │   Port: 5000    │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┘
              Docker Network
              (mat2-network)
```

## Licença

- mat2-web: MIT License
- mat2-quasar-frontend: GNU AGPLv3
