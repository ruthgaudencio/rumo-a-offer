# Rumo à Offer — Tracker de estudos para consultoria

Um app web (que também instala como aplicativo no celular e no computador) para acompanhar seus estudos diários rumo à sua offer de consultoria: **GMAT Quant, Mental math, Cases e Fit/PEI**. Dentro de Cases você seleciona o tipo do dia entre os **4 principais** (Lucratividade, Entrada em mercado, M&A e Crescimento).

Você registra todo dia quanto estudou, quantas questões fez, quantas acertou, o que precisa revisar e os insights dos cases — e o app mostra sua evolução, sua ofensiva (streak) e a contagem regressiva até o final round.

Tudo funciona **sem servidor e sem custo**: os dados ficam salvos no próprio navegador do seu dispositivo. Dá para exportar um backup quando quiser.

---

## O que ele faz

- **Hoje** — mostra o plano do dia (minutos por área conforme a fase), e você registra minutos, questões, acertos (com % de acerto automático), o tipo de case, o que revisar e insights. Botão para marcar o dia como concluído.
- **Progresso** — questões totais, % de acerto geral, horas estudadas, dias estudados, gráfico de acerto ao longo do tempo, questões por dia, tempo por área na semana, acerto por área e um mapa de consistência de 8 semanas.
- **Revisar** — junta tudo que você marcou como "preciso revisar", por data e área. Marque como revisado quando fechar o ponto.
- **Insights** — seu diário de aprendizados dos cases, com o tipo de case e a data. Toque no ✕ para apagar um insight.
- **Plano** — muda a data do final round, ativa/desativa áreas, carrega presets de semana por fase e edita os minutos por área em cada dia. Também exporta/importa backup.

### As três fases (ajustam a proporção do estudo automaticamente)

O app olha quantas semanas faltam para a sua data e sugere um modelo de semana (calibrado para ~30 min nos dias úteis e ~1h30 no fim de semana):

- **Fundamentos** (mais de 8 semanas): base de GMAT Quant + mental math, com cases entrando aos poucos.
- **Transição** (4 a 8 semanas): cases crescendo, GMAT em manutenção.
- **Reta final** (menos de 4 semanas): cases + fit/PEI + mocks pesados, math diário, GMAT leve.

> Os 4 tipos de case ficam no topo do arquivo `index.html` (`const CASE_TYPES`). Se quiser trocar algum (ex: Crescimento por Pricing ou Operações), é só me avisar ou editar ali.

Você pode carregar qualquer preset a qualquer momento na aba **Plano**, ou editar os minutos manualmente do seu jeito.

---

## Como publicar no GitHub Pages (grátis)

1. Crie uma conta no [GitHub](https://github.com) (se ainda não tiver).
2. Crie um novo repositório — por exemplo `rumo-a-offer`. Pode deixar **público**.
3. Suba **todos os arquivos desta pasta** para o repositório (mantendo a pasta `icons/` junto):
   - Pelo site: no repositório, clique em **Add file → Upload files**, arraste os arquivos e a pasta `icons`, e clique em **Commit changes**.
   - Ou pelo terminal:
     ```bash
     git init
     git add .
     git commit -m "Rumo à Offer - tracker de estudos"
     git branch -M main
     git remote add origin https://github.com/SEU_USUARIO/rumo-a-offer.git
     git push -u origin main
     ```
4. No repositório, vá em **Settings → Pages**.
5. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
6. Em **Branch**, selecione **main** e a pasta **/ (root)**, e clique em **Save**.
7. Aguarde 1–2 minutos. A URL aparece no topo da página do Pages, algo como:
   `https://SEU_USUARIO.github.io/rumo-a-offer/`

Pronto — é esse link que você abre todo dia.

> Dica: os caminhos do app são **relativos**, então ele funciona certinho dentro da subpasta do GitHub Pages, sem configuração extra.

---

## Como instalar como app (PWA)

Depois de abrir o link do GitHub Pages:

**No iPhone (Safari):**
1. Abra o link no **Safari**.
2. Toque no botão de **compartilhar** (quadrado com seta pra cima).
3. Toque em **Adicionar à Tela de Início**.
4. Confirme. O ícone aparece na sua tela como um app.

**No Android (Chrome):**
1. Abra o link no **Chrome**.
2. Toque no menu **⋮** (três pontinhos).
3. Toque em **Instalar app** (ou **Adicionar à tela inicial**).

**No computador (Chrome/Edge):**
1. Abra o link.
2. Na barra de endereço, clique no ícone de **instalar** (um monitor com uma seta) à direita.
3. Ou menu **⋮ → Instalar Rumo à Offer**.

Depois de instalado, o app abre em tela cheia, funciona **offline** e guarda seus dados normalmente.

---

## Seus dados e backup

- Os dados ficam salvos **só no navegador do dispositivo** onde você usa (localStorage). Nada é enviado para nenhum servidor.
- Para levar seus dados para outro aparelho, ou só por segurança: aba **Plano → Exportar backup (.json)**. Depois, no outro dispositivo, **Importar backup**.
- Se limpar os dados do navegador ou desinstalar, use o backup para restaurar. Vale exportar de vez em quando.
- Usar no mesmo navegador (celular ou desktop) mantém tudo entre um dia e outro automaticamente.

---

## Arquivos do projeto

```
index.html              → o app inteiro (interface + lógica, tudo em um arquivo)
manifest.webmanifest    → configuração para instalar como app
sw.js                   → service worker (funcionar offline)
icons/                  → ícones do app
README.md               → este guia
```

> Dá pra abrir o `index.html` sozinho no seu computador (é só dar dois cliques) só pra ver como fica. Para instalar como app no celular e funcionar offline, publique a pasta toda no GitHub Pages (passo a passo acima).

Tudo é HTML/CSS/JavaScript puro, sem dependências para instalar. Bons estudos e boa sorte na sua offer! 🍀
