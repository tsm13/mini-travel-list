import i18next from "i18next";
import i18nextBrowserLanguagedetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next
  // detecting user language
  .use(i18nextBrowserLanguagedetector)
  // passing the i18n instance to react-i18next
  .use(initReactI18next)
  // initializes i18next with the specified config
  .init({
    debug: true,
    fallbackLng: ["en-US", "pt-BR"],
    resources: {
      "en-US": {
        translation: {
          listTitle: {
            organize: "Organize",
            ready: "Ready",
          },
          headerOptions: {
            load: "Load list",
            export: "Export list",
            clear: "Clear list",
            changeLanguage: "🇧🇷  Em Português",
            github: "Source Code",
          },
          listFunctions: {
            enter: "Item name",
            add: "Add to list",
            toggleReady: "Toggle all ready",
            resetReady: "Reset all ready",
            itemsReady_one: "item ready",
            itemsReady_other: "items ready",
          },
        },
      },
      "pt-BR": {
        translation: {
          listTitle: {
            organize: "Organizar",
            ready: "Pronto",
          },
          headerOptions: {
            load: "Importar lista",
            export: "Exportar lista",
            clear: "Apagar lista",
            changeLanguage: "🇬🇧  In English",
            github: "Código fonte",
          },
          listFunctions: {
            enter: "Nome do item",
            add: "Adicionar",
            toggleReady: "Todos prontos",
            resetReady: "Desfazer prontos",
            itemsReady_one: "objeto pronto",
            itemsReady_other: "objetos prontos",
          },
        },
      },
    },
  });
