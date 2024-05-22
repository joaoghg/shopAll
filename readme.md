Para rodar o projeto, o primeiro passo é instalar as dependências do frontend e do backend.
Para isso, rode o comando npm install no terminal, uma vez na raiz do projeto, para o frontend, e outra vez dentro da pasta api, para as dependências do backend.

Após isso, dentro da pasta api, modifique o arquivo knexfile.js, para configurar sua conexão com o banco de dados. O banco utilizado no projeto foi o postgresql. A senha para o usuário do banco de dados deve estar armazenada em um arquivo .env, de acordo com o arquivo .env.example. Para a conexão com o banco funcionar, você já deve ter um banco com o nome especificado no arquivo knexfile.js criado anteriormente.

Para configurar o envio de email, crie um arquivo .env seguindo o .env.example e coloque seu email do gmail que será responsável por enviar o email.
Nas configurações do gmail, habilite a autenticação de 2 fatores e na parte de segurança procure por senhas de apps ou app passwords. Crie uma nova senha para o app NodeMailer (deve ser escrito dessa forma) e depois coloque a senha gerada no arquivo .env também

Após fazer essas configurações, inicie a api rodando o comando npm start dentro do diretório api. Caso as configurações estejam corretas, isso já irá criar as tabelas do banco de dados e inserir os dados padrão do projeto.

Agora é só iniciar o frontend, você precisará ter um emulador configurado no computador, ou então o aplicativo expo go baixado no seu celular. Com isso pronto, é só rodar o comando npx expo start na raiz do projeto, e então você terá a opção de abrir no emulador, ou ler o qrcode pelo aplicativo expo go no celular pra abrir direto nele.
