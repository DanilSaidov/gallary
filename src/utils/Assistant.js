// Функция createSmartappDebugger используется в development среде. В production среде необходимо использовать createAssistant.
import {
  createAssistant,
  createSmartappDebugger,
} from "@sberdevices/assistant-client";

const initialize = (getState, getRecoveryState) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      // Токен из Кабинета разработчика
      token: "token",
      // Пример фразы для запуска приложения
      initPhrase: "Хочу попкорн",
      // Функция, которая возвращает текущее состояние приложения
      getState,
      // Функция, возвращающая состояние приложения, с которым приложение будет восстановлено при следующем запуске
      getRecoveryState,
    });
  }

  // Только для среды production
  return createAssistant({ getState, getRecoveryState });
};

const assistant = initialize(
  () => state,
  () => recoveryState
);
assistant.on("data", (command) => {
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

const handleOnClick = () => {
  // Отправка сообщения ассистенту с фронтенд.
  // Структура может меняться на усмотрение разработчика, в зависимости от бэкенд
  assistant.sendData({
    action: { type: "some_action_name", payload: { param: "some" } },
  });
};

const handleOnRefreshClick = () => {
  // Отправка сообщения бэкенду, с возможностью подписки на ответ.
  // В обработчик assistant.on('data'), сообщение передано не будет
  const unsubscribe = assistant.sendAction(
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
