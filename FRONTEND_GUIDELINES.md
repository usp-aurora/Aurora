# Diretrizes de Desenvolvimento Frontend

Este documento descreve a estrutura, convenções de nomenclatura e boas práticas para o desenvolvimento do frontend deste projeto utilizando React, Inertia.js e MUI. Seguir estas diretrizes garante consistência, manutenibilidade e facilidade de colaboração.

## Filosofia Central: Agrupamento Baseado em Funcionalidades (Feature-Based Grouping)

Organizamos nosso código frontend primariamente por **funcionalidade** (feature). Isso significa que todos os arquivos relacionados a uma funcionalidade específica da aplicação (componentes, hooks, contextos, utilitários, etc.) devem residir dentro de uma pasta dedicada para essa funcionalidade em `resources/js/Features/`. Isso promove a colocalização e torna as funcionalidades mais fáceis de entender, modificar ou remover.

Componentes de UI genéricos e reutilizáveis têm seu próprio espaço dedicado dentro do diretório `resources/js/ui/`.

## Convenções de Nomenclatura

A consistência na nomenclatura é crucial para a legibilidade.

### Arquivos

1.  **Arquivos JSX:**
    *   Arquivos que exportam componentes React (componentes funcionais retornando JSX) **devem** usar `PascalCase`.
    *   Esses arquivos **devem** terminar com a extensão `.jsx`.
    *   *Exemplo:* `MeuComponente.jsx`, `CardPerfilUsuario.jsx`

2.  **Arquivos Não-JSX:**
    *   Arquivos que exportam código JavaScript *diferente de* componentes React (ex: funções utilitárias, hooks, definições de contexto, dados, configuração) **devem** usar `camelCase`.
    *   Esses arquivos **devem** terminar com a extensão `.js`.
    *   *Exemplo:* `apiClient.js`, `useFetchData.js`, `stringUtils.js`, `theme.js`

### Pastas

1.  **Pastas de Componentes:**
    *   Pastas que contêm primariamente arquivos que exportam componentes React (arquivos `.jsx`) **devem** usar `PascalCase`.
    *   Isso se aplica a pastas de funcionalidades individuais (`Features/SubjectPicker/`) e a subpastas contendo variações ou partes de componentes (`ui/Card/`, `Features/SubjectInfo/Components/`).

2.  **Pastas Utilitárias/Auxiliares:**
    *   Pastas que contêm *apenas* arquivos não-JSX (arquivos `.js` como utilitários, hooks, dados específicos, configuração de estilos) **devem** usar `camelCase`.
    *   *Exemplo:* `Features/SubjectInfo/Components/GraphView/utils/`, `styles/animations/`, `Contexts/utils/`.

## Estrutura de Diretórios de Topo (`resources/js/`)

*   `app.jsx`: Ponto de entrada principal da aplicação, configurando Inertia e React.
*   `Contexts/`: Contém definições de Contextos React **globais** e hooks/funções utilitárias associadas a esses arquivos, em `Contexts/utils/`.
*   `data/`: Armazena estruturas de dados estáticas ou manuais usadas pelo frontend (ex: `coreCurriculum.js`).
*   `Features/`: O diretório central contendo todos os módulos específicos de funcionalidades
*	`ui/`: Biblioteca de componentes UI utilizados em todo o projeto.
*   `Pages/`: Contém os componentes de página do Inertia. Estes são os componentes de nível superior renderizados para rotas específicas (ex: `Home.jsx`).
*   `styles/`: Contém configurações globais de estilização, temas (ex: `theme.js`), estilos base (`globalStyles.js`), animações (`animations/`), ou construções CSS-in-JS reutilizáveis (`glassmorphism.js`).

## Estrutura de Pasta de Funcionalidade (`Features/*`)

Cada pasta dentro de `Features/` representa uma funcionalidade distinta da aplicação.

*   **Raiz da Funcionalidade (`Features/MinhaFeature/`):**
    *   Contém o(s) componente(s) principal(is) da funcionalidade (ex: `Semesters.jsx`, `SubjectInfo.jsx`).
    *   Pode conter contexto específico da funcionalidade (`SubjectInfoContext.jsx`).
    *   Pode conter um arquivo `index.js` para exportações controladas.
*   **`components/`:** (Opcional) Se um componente de funcionalidade é complexo e composto por subcomponentes menores e específicos *não destinados à reutilização fora desta funcionalidade*, coloque-os aqui (ex: `Features/SubjectInfo/Components/SubjectInfoHeader.jsx`).
*   **`utils/`:** (Opcional) Contém funções utilitárias específicas para esta funcionalidade (ex: `Features/DragAndDrop/utils/dragUtils.js`).
*   **`hooks/`:** (Opcional) Contém hooks customizados do React específicos para esta funcionalidade.
*   **`storybookSupport/` ou `storybook/`:** (Opcional) Se dados ou helpers específicos são necessários *apenas* para o Storybook dentro desta funcionalidade.

## Biblioteca de UI Compartilhada (`ui/`)

*   Esta pasta atua como nossa biblioteca de componentes de UI compartilhada.
*   Cada subpasta dentro de `ui/` representa um componente de UI reutilizável (ex: `Button/`, `Card/`, `Dialog/`).
*   Siga a estrutura de componente padrão dentro de cada pasta de componente de UI (ex: `Button.jsx`, `Button.stories.jsx`).


## Storybook

*   Arquivos do Storybook (`*.stories.js` ou `*.stories.jsx`) **devem** estar localizados na **mesma pasta** que o componente que eles documentam.
    *   *Exemplo:* `Button.jsx` e `Button.stories.jsx` residem ambos em `Features/ui/Buttons/`.

## Exportações (`index.js`)

*   Usar um arquivo `index.js` dentro de uma pasta de funcionalidade ou componente é opcional, mas encorajado quando:
    *   Uma funcionalidade exporta múltiplos componentes primários que são frequentemente importados juntos (ex: `HeaderDesktop` e `HeaderMobile`).
    *   Você quer simplificar os caminhos de importação para as exportações principais da funcionalidade.

## Estilo de Código

Para garantir a uniformidade do código, siga estas regras de estilo:

1.  **Ponto e Vírgula (Semicolons):**
    *   Sempre use ponto e vírgula (`;`) no final das declarações JavaScript.

2.  **Declaração de Funções:**
    *   Prefira usar a palavra-chave `function` para declarar componentes React e outras funções de nível superior, em vez de arrow functions (`=>`).
    *   *Exemplo (Componente):*
        ```jsx
        function MeuComponente(props) {
            // ... lógica
            return <div>Olá</div>;
        }
        ```
    *   *Exemplo (Utilitário):*
        ```javascript
        function formatarData(data) {
            // ... lógica
            return dataFormatada;
        }
        ```

3.  **Indentação:**
    *   Use **tabs** para indentação, não espaços. Configure seu editor para usar tabs.

4.  **Exportações:**
    *   As declarações `export` (seja `export default` ou `export`) **devem** ser colocadas no **final do arquivo**, não inline com a declaração da função ou variável.
    *   *Exemplo:*
        ```jsx
        import React from 'react';

        // ... outras importações

        function MeuComponente(props) {
            // ... lógica do componente
            return <div>Conteúdo</div>;
        }

        function funcaoAuxiliar() {
            // ...
        }

        // Exportações no final
        export { funcaoAuxiliar };
        export default MeuComponente;
        ```

---

Ao aderir a estas diretrizes, podemos construir uma base de código frontend mais organizada, compreensível e de fácil manutenção. Obrigado pela sua contribuição!