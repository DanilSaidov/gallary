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
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg1MTY2NjMsImV4cCI6MTYxODYwMzA2MywidHlwZSI6IkJlYXJlciIsImp0aSI6IjY2MjlkMDcxLTU4ZGUtNGFlNC04ZWU5LWFmNjc4YWYyMTc1MSIsInN1YiI6IjMxOGYyYWMzNjgwZmVjZTM0ZTJhYjJkYjcyY2Y0NmVhM2JlNDQxZTFhYzVlNzA2MmY4ZjkzYTM3ODJhMWQxZmQ1MzliZTkyNzAwNDI2Mjk4IiwiYXVkIjoiVlBTIn0.EhKp0ya962Pc7Ocv5k0o6oipqB8nPqDYL0635976dw3RsbJ6S8MfqhA0x9VDIsJdDjtmjCWimfbPYFQndJuCxQJJK3FCtIi4Ph2yEfrjX7bAfdqfYHbp2UPVyquuHfkcXIhkdcswaOovmIpbOFE1kmL8u-5xILKfgOvSsPRTmR3UJnuVpKzKpa6Fc3E5Zy9VROb3VBFkkbv025U9t1_7q9kymqNrwxWnlZnfM7pKp1i-fkQFVRKb3p7yeL5jf4VN2_X0fFdRMkSHkPpHYN9IAfp31SND2dxwU2sxag9eYlRTbhR859myRhnl_Ik5APndTLhnXNrIM--aaH9Fcumx8pl7i2oaZK1sQzOLn0CmQnLcLfj7Nb92dt1EWIMIu_LZGJCcP7nJb4Hbj4GcC7kMvnBMNXVG54G28pEpT2Ym3y29-eoxwLonkLRmdAGH4EfdxVUowxfv5M5nqFAqCK-fl_VRBXLSgGSWDQR8EVSh-e9tFT0EA5hdhH6ra-TcbTqtFc-s_ZDrgJRFu9PzNSHUFNc5qNeNajWAIuFOo0g5E5rC6C47OD3BJUwjLndujKIU7uZd78c1RYzTeDW3CpOFcXPgDoqbwOwOP11kxMP3V3RJ_CGRBBPgvCaJYfIEeHDDNrj3BImK2EegH7ZT8YbO6T-AEdP4OnS5T7rMU8mezA8",
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
    <div className='App'>
      <h1>Gallary App </h1>
      <p>
        <Button view='primary'>Hello Plasma</Button>
      </p>
      <Carusel />
      <GallaryModal />
    </div>
  );
}

export default App;
