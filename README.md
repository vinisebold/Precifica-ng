# Lista de Preços - Angular

Uma aplicação Angular moderna para gerenciar listas de preços de produtos, com funcionalidades de relatórios e compartilhamento.

## ✨ Funcionalidades

- 📝 **Formulário de Preços**: Interface intuitiva para inserir preços de produtos
- 📊 **Relatórios Visuais**: Geração de relatórios com design moderno e gradientes
- 📱 **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- 💾 **Armazenamento Local**: Salva automaticamente os dados inseridos
- 🔄 **Auto-save**: Salvamento automático com debounce
- 📤 **Compartilhamento**: Compartilhe relatórios como imagem via Web Share API
- 📈 **Estatísticas**: Visualize estatísticas dos preços (total, média, maior/menor preço)
- 🎨 **Tailwind CSS**: Interface moderna com animações suaves

## 🏗️ Arquitetura

### Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── formulario-precos/          # Componente do formulário
│   │   ├── visualizador-relatorio/     # Componente do relatório
│   │   └── loading/                    # Componente de loading
│   ├── services/
│   │   ├── constantes.service.ts       # Constantes da aplicação
│   │   ├── armazenamento.service.ts    # Gerenciamento localStorage
│   │   ├── relatorio.service.ts        # Lógica de relatórios
│   │   └── compartilhamento.service.ts # Compartilhamento via Web Share API
│   ├── models/
│   │   └── produto.model.ts            # Interfaces TypeScript
│   └── app.component.ts                # Componente principal
├── styles.scss                        # Estilos globais
├── main.ts                            # Bootstrap da aplicação
└── index.html                         # HTML principal
```

### Padrões Utilizados

- **Standalone Components**: Componentes independentes sem módulos
- **Services com Injeção de Dependência**: Lógica de negócio separada
- **TypeScript Strict Mode**: Tipagem rígida para maior segurança
- **Reactive Forms**: Gerenciamento avançado de formulários
- **RxJS**: Programação reativa com debounce para auto-save
- **Nomenclatura em Português**: Classes, métodos e variáveis em português

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18+)
- npm ou yarn
- Angular CLI (versão 17+)

### Instalação

1. **Clone ou crie o projeto**:
```bash
ng new lista-precos-angular --routing=false --style=scss --standalone
cd lista-precos-angular
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure o Tailwind CSS**:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. **Copie os arquivos de configuração e código**:
   - Substitua o conteúdo dos arquivos pelos fornecidos nos artefatos
   - Crie a estrutura de pastas conforme descrito

5. **Execute a aplicação**:
```bash
ng serve
```

6. **Acesse**: `http://localhost:4200`

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm start                 # Inicia servidor de desenvolvimento
ng serve --open          # Inicia e abre no navegador

# Build
npm run build            # Build para produção
ng build --prod          # Build otimizado

# Testes
npm test                 # Executa testes unitários
ng test                  # Executa testes com watch

# Linting
ng lint                  # Verifica código com ESLint
```

## 📦 Dependências Principais

### Produção
- `@angular/core` - Framework Angular
- `@angular/common` - Módulos comuns do Angular
- `@angular/forms` - Formulários reativos
- `tailwindcss` - Framework CSS utilitário

### Desenvolvimento
- `@angular/cli` - CLI do Angular
- `typescript` - Linguagem TypeScript
- `autoprefixer` - Processamento CSS
- `postcss` - Transformações CSS

## 🎯 Funcionalidades Técnicas

### Armazenamento Local
- Salvamento automático com debounce de 1 segundo
- Persistência de dados entre sessões
- Recuperação automática ao recarregar a página

### Compartilhamento
- **Web Share API**: Compartilhamento nativo em dispositivos compatíveis
- **Fallback**: Download automático em navegadores não compatíveis
- **Canvas**: Geração de imagens dos relatórios

### Responsividade
- Grid responsivo para produtos
- Layout adaptável para tablets e smartphones
- Otimização para impressão

### Performance
- Componentes standalone para bundle menor
- Lazy loading de funcionalidades
- Otimização de imagens e assets

## 🎨 Customização

### Cores e Temas
Edite `tailwind.config.js` para personalizar:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary': '#667eea',
        'secondary': '#764ba2',
      }
    }
  }
}
```

### Produtos
Modifique a lista em `constantes.service.ts`:

```typescript
public readonly PRODUTOS: string[] = [
  'Seu Produto 1',
  'Seu Produto 2',
  // ... mais produtos
];
```

## 🔧 Configurações Avançadas

### TypeScript
O projeto usa configuração strict do TypeScript:
- `strict: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`

### Angular
Configurações do Angular:
- Standalone components
- OnPush change detection (recomendado para performance)
- Lazy loading preparado

## 📱 PWA (Opcional)

Para transformar em PWA, adicione:

```bash
ng add @angular/pwa
```

Isso adicionará:
- Service Worker
- Web App Manifest
- Ícones otimizados
- Funcionalidade offline

## 🐛 Troubleshooting

### Problema com Tailwind
Se o Tailwind não carregar:
1. Verifique se `@tailwind` está no `styles.scss`
2. Confirme configuração do `tailwind.config.js`
3. Reinicie o servidor de desenvolvimento

### Erro de LocalStorage
Em ambientes onde localStorage não está disponível:
- O sistema mostra alertas informativos
- Funcionalidade básica mantém-se operacional
- Dados são perdidos apenas ao fechar a aba

### Build de Produção
Para resolver problemas de build:
```bash
ng build --prod --source-map
# Analise os source maps para identificar problemas
```

## 🚀 Deploy

### Netlify
```bash
ng build --prod
# Upload da pasta dist/ para Netlify
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages
```bash
ng add angular-cli-ghpages
ng deploy --base-href=/seu-repositorio/
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no repositório
- Consulte a documentação do Angular
- Verifique a documentação do Tailwind CSS

## 🔄 Changelog

### v1.0.0
- ✅ Implementação inicial
- ✅ Formulário de preços
- ✅ Geração de relatórios
- ✅ Funcionalidade de compartilhamento
- ✅ Armazenamento local
- ✅ Design responsivo
- ✅ Animações e transições

---

## Como migrar do Tailwind para CSS/SCSS puro

### 1. **Remova o Tailwind e plugins**
```bash
npm uninstall tailwindcss @tailwindcss/postcss autoprefixer
```
E remova as diretivas `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;` do seu `styles.scss`.

### 2. **Converta as classes Tailwind para CSS**
- Abra seus arquivos `.html` e procure por classes como `bg-gray-50`, `text-blue-600`, `rounded-lg`, etc.
- Para cada classe Tailwind usada, crie uma classe CSS correspondente no seu `styles.scss` ou nos arquivos `.css` dos componentes.
- Exemplo:
  ```css
  /* styles.scss */
  .bg-gray-50 { background-color: #f9fafb; }
  .text-blue-600 { color: #2563eb; }
  .rounded-lg { border-radius: 0.5rem; }
  /* ...e assim por diante */
  ```

### 3. **Ajuste os templates**
- Substitua as classes utilitárias do Tailwind pelas suas novas classes CSS.
- Ou, se preferir, use nomes de classe mais semânticos (ex: `.botao-primario`, `.cabecalho`, etc).

### 4. **Aproveite o SCSS**
- Use variáveis, mixins e aninhamento do SCSS para facilitar a manutenção dos estilos.

### 5. **Remova a configuração do Tailwind**
- Apague os arquivos `tailwind.config.js` e `postcss.config.js` se não forem mais necessários.

---

## Dica prática

Se você quiser, posso:
- Gerar um mapeamento das classes Tailwind usadas no seu projeto.
- Sugerir o CSS equivalente para cada uma.
- Automatizar a limpeza dos arquivos de configuração.

**Quer que eu faça um levantamento das classes Tailwind usadas e gere um CSS base para você começar a migração?**  
Ou prefere que eu já comece a migrar um componente de exemplo para CSS puro?