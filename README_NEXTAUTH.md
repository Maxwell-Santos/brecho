login com google 
https://console.developers.google.com/apis/credentials

## Como fazer as credenciais de dentro do google
 - criar credenciais 
 - clicar em Id do cliente 0Auth

 - adicionar a url local na sessão (Origens JavaScript autorizadas)
 - na segunda parte (URIs de redirecionamento autorizados) colocar http://localhost:3000/api/auth/callback/google

### comando para gera o token jwt, executar esse comando no terminal 
 - openssl rand -base64 32 ou acessar o link https://generate-secret.vercel.app/32