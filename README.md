<h1 align="center">
☁️ Climaricá
</h1>

<p align="center">
Um aplicativo simples e elegante de previsão do tempo desenvolvido com React Native e Expo.
</p>

<p align="center">
<a href="#-tecnologias">Tecnologias</a> |
<a href="#-projeto">Projeto</a> |
<a href="#-layout">Layout</a> |
<a href="#-como-executar">Como executar</a>
</p>

# 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:
* React Native
* Expo
* Open-Meteo API (API gratuita e sem chave)
* Ionicons (Ícones)

# 💻 Projeto

O Climaricá é um aplicativo móvel e web que permite aos usuários verificar a previsão do tempo atual para qualquer cidade ou região do mundo.

Funcionalidades:
* 📍 Busca por Cidade: O usuário digita o nome e o app encontra a localização.
* 🌡️ Temperatura Atual: Exibição clara da temperatura.
* 🎨 Fundo Dinâmico: A cor de fundo muda de acordo com o clima (Azul para sol, Cinza para nublado, Escuro para tempestade).
* 📱 Design Responsivo: Adaptado para diferentes tamanhos de tela.

# 🎨 Layout

O layout foi inspirado em interfaces modernas web, utilizando cores sólidas vibrantes e cartões com transparência simulada para destacar as informações.

<div style="display: flex; gap: 10px; position: center;">
  <img 
    src="https://github.com/user-attachments/assets/d51539ce-eca0-4df6-90a8-a6b6f02e97a4" 
    width="475" 
    height="827" 
  />
  <img 
    src="https://github.com/user-attachments/assets/7f442958-f49c-4dcc-b529-613a1a8b352e" 
    width="474" 
    height="830" 
  />
</div>

# 📦 Como executar

Para clonar e rodar esta aplicação, você precisará de Git, Node.js instalados em seu computador.

Passos:
* Clone este repositório
$ git clone [https://github.com/roclari/climarica2.git](https://github.com/roclari/climarica2.git)

* Acesse a pasta do projeto no terminal/cmd
$ cd climarica2

* Instale as dependências
$ npm install

* Execute a aplicação
$ npx expo start

Após rodar o comando acima, um QR Code aparecerá no terminal.
Baixe o app Expo Go na sua loja de aplicativos (Play Store ou App Store).
Escaneie o QR Code com o Expo Go (Android) ou com a Câmera (iOS).

# 🛠️ Desafios e Aprendizados

Durante o desenvolvimento, foram abordados conceitos importantes:
* Consumo de APIs REST (Fetch API).
* Gerenciamento de Estado com Hooks (useState).
* Manipulação de Teclado no Mobile (Keyboard.dismiss).
* Estilização condicional no React Native.

Feito com 💙 por Larissa Rocha
