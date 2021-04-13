import React from "react";

import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";

import { Button } from "@sberdevices/ui/components/Button/Button";
import { Carusel, GallaryModal } from "./components";
import "./utils/Assistant.js";
function App() {
  const initialize = (getState, getRecoveryState) => {
    if (process.env.NODE_ENV === "development") {
      return createSmartappDebugger({
        // Токен из Кабинета разработчика
        token:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMThmMmFjMzY4MGZlY2UzNGUyYWIyZGI3MmNmNDZlYTNiZTQ0MWUxYWM1ZTcwNjJmOGY5M2EzNzgyYTFkMWZkNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYxODMwNjQ0OSwiaWF0IjoxNjE4MjIwMDM5LCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiNGI5MGJiODQtYTM4OS00ODYyLWE3MjctYmQ2NjFhYjc2MzhlIiwic2lkIjoiMGJjNTczMjEtZTA0Zi00NzdhLWIzZGQtY2JlYmE4ZWUzZmIxIn0.TZZahqYz1cNGdxnC4Ei5FXl2K98I7QCb_aQspJcfd1hK_MVvL3i_cTIhD-u47C_1YrqKBIUX74_f8Zuw7NNzA_M8VBGaUprJQGfZiDbVBaRtF5ZipvaizKmDNlvu4IFZ9F0ATZ3MbaYItnAoMJShl8H5RaDaSwaHljjFRznPDjiaQ771vglNe1n95tnGz0F2vPQgYMDQt9iGsMSg1hFCcnL_NQ_5K2YP0e94wgFCPj3dZ_oTorKlBiBj2_7irrmDBTjLNpnXDt1I0ujcyqJkzbppJ_NSp4N_OxvDw9RwM_j-QpsuK8hiXWza6O-7ymvlqmRJBlVHkGKksMw44g-lEEvoA1O_Yx_wJTbVKLB_YfzIGFfyqnuyp239eDkUZX51SSQkexeWuRQA9Srn85xb4TUkbzxMz3PSSgT2qq6-9lsERENzI4itxyBIPgcHlVU-6B7yH2FCaOtpsnBsTcLwxgUeRgbEjVSIZObyOSKM9Eqy1r6NUfrF8ytregM9Bi-Q3BqT2hDA4E9Q5lzthw_ijOLnWTUGV8VKa_YM8wZQkosp1_OAlwdqJpDPD-p-zdrgaDBQ3rFkW1oRCB8snoyQTSM2PWsgij-LyMKKv_J2iKTYQbaBAh5sv8dMxlWJGw7LzOiOJpzNcljWY65-CKS-0x5XHF2gAZJzYO5CqA-lObI",
        // Пример фразы для запуска приложения
        initPhrase: "начать gallary",
        // Функция, которая возвращает текущее состояние приложения
        getState,
        // Функция, возвращающая состояние приложения, с которым приложение будет восстановлено при следующем запуске
        //getRecoveryStatel,
      });
    }

    // Только для среды production
    return createAssistant({ getState, getRecoveryState });
  };

  const assistantStateRef = React.useRef();
  const assistantRef = React.useRef();
  React.useEffect(() => {
    assistantRef.current = initialize(() => assistantStateRef.current);
    assistantRef.current.on("data", (command) => {
      console.log(command);
      // Подписка на команды ассистента, в т.ч. команда инициализации смартапа.

      // Ниже представлен пример обработки голосовых команд "ниже"/"выше"
      if (command.navigation) {
        switch (command.navigation.command) {
          case "UP":
            window.scrollTo(0, 0);
            break;
          case "DOWN":
            window.scrollTo(0, 1000);
            break;
        }
      }
    });
  }, []);

  const handleOnClick = () => {
    // Отправка сообщения ассистенту с фронтенд.
    // Структура может меняться на усмотрение разработчика, в зависимости от бэкенд
    console.log("handleOnClick");
    assistantRef.current.sendData({
      action: { type: "some_action_name", payload: { param: "some" } },
    });
  };

  const handleOnRefreshClick = () => {
    // Отправка сообщения бэкенду, с возможностью подписки на ответ.
    // В обработчик assistant.on('data'), сообщение передано не будет
    console.log("handleOnClick");
    const unsubscribe = assistantRef.current.sendAction(
      { type: "some_action_name", payload: { param: "some" } },
      (data) => {
        console.log(data);
        // здесь обработка данных, переданных от бэкенд
        unsubscribe();
      },
      (error) => {
        console.log(error);
        // обработка ошибки, переданной от бэкенд
      }
    );
  };

  return (
    <div className="App">
      <h1>Gallary App </h1>
      <p>
        <Button view="primary">Hello Plasma</Button>
      </p>
      <Carusel />
      <GallaryModal />
    </div>
  );
}

export default App;
