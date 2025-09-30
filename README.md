☀️ Sunshine - Plataforma de Atendimento Psicológico Online

Sistema web moderno para atendimentos psicológicos via internet, desenvolvido com HTML, Tailwind CSS e Lucide React, priorizando boas práticas de usabilidade e design.




### Visão Geral
A ideia principal do site é ajudar as pessoas que tem dificuldade com ajuda clínica, e precisam de uma forma pra facilitar o contato, o sol do sunshine simboliza a esperança e um novo amanhecer na vida dessas pessoas, um recomeço.

### Objetivos

Facilitar a conexão entre psicólogos e pacientes.

Oferecer um ambiente moderno, responsivo e acessível.

Garantir boa usabilidade com interfaces claras e intuitivas.

Apoiar psicólogos na gestão de sessões e pacientes.

### Funcionalidades
 Para Psicólogos

Dashboard com visão geral de consultas.

Gestão de pacientes e histórico de sessões.

Relatórios e analytics com gráficos interativos.

 Para Pacientes

Agendamento online de sessões.

Acompanhamento de histórico de consultas.

Interface simples e acessível.

### Sistema de Autenticação

Login e registro de novos usuários.

Diferenciação entre perfis de psicólogo e paciente.

Proteção de rotas para cada tipo de usuário.

 ### Tecnologias

HTML5 → Estrutura semântica.

Tailwind CSS → Estilização responsiva e moderna.

HuggingFace → Chat com IA especializado em psicologia, servindo para auxílio para os psicólogos

Lucide React → Ícones minimalistas e modernos.

Boas Práticas → Código limpo, acessibilidade e design responsivo.

### Instalação
Pré-requisitos

Node.js 18+

npm ou yarn

Passos
# Clone o repositório
git clone https://github.com/GustavoVidal/sunshine.git
cd sunshine

# Instale as dependências
npm install
# ou
yarn install

# Execute o projeto
npm run dev

# Acesse no navegador
http://localhost:5173

###  Uso

Faça login como psicólogo ou paciente.

Explore o dashboard com dados e agendamentos.

Pacientes podem agendar sessões com psicólogos disponíveis.

Psicólogos podem gerenciar atendimentos e acessar relatórios.

###  Estrutura do Projeto
sunshine/
public/             # Arquivos públicos
src/
 components/     # Componentes reutilizáveis (Card, Button, Input, etc.)
 pages/          # Páginas principais (Login, Dashboard, Relatórios, etc.)
 context/        # Contextos globais (ex: autenticação)
 services/       # Mock API e serviços auxiliares
 App.jsx         # Componente raiz
 index.css       # Estilos globais (Tailwind)
 main.jsx        # Entry point
package.json

###  Design System
-Paleta de Cores
:root {
 --color-dark: #0097b2;       /* Turquesa bem escuro */
  --color-medium: #5ca3ff;     /* Azul médio */
  --color-light: #b8f2e3;      /* Turquesa claro */
  --color-accent: #49b0b6;     /* Ciano */
  --color-background:  #5ca3ff; /* Gradiente entre azul e branco*/
}

### Tipografia

Primária: Nunito (títulos e interface)

Secundária: Nunito-sans (textos corridos)

Componentes Base

Button → Variantes (primary, secondary, danger).

Card → Containers com efeito sutil e responsivo.

Input → Campos com validação e toggle de senha.

LoadingSpinner → Indicador de carregamento.



###  Equipe

Desenvolvedor Principal: [Gustavo Andrade Vidal]



🔄 Versão Atual

v1.0.0 - Primeira versão do Sunshine, com funcionalidades principais implementadas.