import React from "react";
import { inject, observer } from "mobx-react";
import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";

import { Button } from "@sberdevices/ui/components/Button/Button";
import { Carusel, GallaryModal } from "./components";
import "./utils/Assistant.js";
function App({ gallaryStore }) {
  const { gallaryCategories, setActiveCategory } = gallaryStore;

  const [carusel, dispatchCarusel] = React.useReducer(
    (carusel, action) => {
      switch (action.type) {
        case "next":
          if (carusel.activeIndex === gallaryCategories.length - 1) {
            return { activeIndex: carusel.activeIndex };
          }
          return { activeIndex: carusel.activeIndex + 1 };
        case "prev":
          if (carusel.activeIndex === 0) {
            return { activeIndex: carusel.activeIndex };
          }
          return { activeIndex: carusel.activeIndex - 1 };
        default:
          throw new Error();
      }
    },
    { activeIndex: 0 }
  );
  const initialize = (getState, getRecoveryState) => {
    if (process.env.NODE_ENV === "development") {
      return createSmartappDebugger({
        token:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMThmMmFjMzY4MGZlY2UzNGUyYWIyZGI3MmNmNDZlYTNiZTQ0MWUxYWM1ZTcwNjJmOGY5M2EzNzgyYTFkMWZkNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYxODM4OTY0MiwiaWF0IjoxNjE4MzAzMjMyLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiMTdiNDM5MjctOGJmYS00MzRiLWEwYWEtNWQxNDZjNmFkNGQxIiwic2lkIjoiODlkN2NhYTktZjgyNi00NzAzLWIzZDktNDQ1MmY5NWRmY2FmIn0.fOJOvZQ9EVmt1g8LmctJ62nwLZCAcbLajeIPUDPfdrLEWjZOeE6p8YN9LoUxjl2o5Tqi2IbpxFKTqzdqrqwRQL-DVclCrMVPUIvKlzdmvoUa13MGxGopP4MEyvdLxzlieajRIEnlrnDQvjGxtNPkxhiRNTxs_zvPA5JGdS5aQuY91Obivyo9rGGCVbiEHsO3g75v4ZC0ZZImnrrw7NQNzrtMSCvY-L8xGmcpYPrvIzb_JXSt_FG7oPag3hWMLhait7eyjqzhe0OxpxM9cTDFI3GO5PfNTR3xZAPpyhu5bekh-GGETzBC-DVx5NXfFu1BgyY_hkbFL6jWEdYhtV_Yem0npM4oJJIMg7UIxi13J-gzJWVnbaNpkxGdUlHq1Q210VDJyfbLfQQKOxsSc09-xhFTgknepvRW4_jjXMxiAGXcIFnHtkInhrPA-bB5PrCxsYtENe6DsObx-uhYPnQKe0xb9SXAGrGs_JKc-9616nNLlaL8rEaIGqKI5cs49wVWsWbG09cDpQ2NcTIa6jDQ31XuiievBTw1InQldByrHwfHoCL5m4DUql5g60AWE_ZtDSCektzX7uexYe5tuVbDxns-Cg8msah74dFugK5uXa34N_W1ogef4MXVp-7cCIOLmAotTmDXs7pxNzgWDmh13APeoV8i4IJ8QWZ-evlfq_0",
        initPhrase: "запустить saidov",
        getState,
        //getRecoveryStatel,
      });
    }

    return createAssistant({ getState, getRecoveryState });
  };

  const assistantStateRef = React.useRef();
  const assistantRef = React.useRef();

  React.useEffect(() => {
    assistantRef.current = initialize(() => assistantStateRef.current);
    assistantRef.current.on("data", (navigation) => {
      console.log(navigation);
      if (navigation.action) {
        switch (navigation.action.type) {
          case "next_card":
            dispatchCarusel({ type: "next" });
            break;
          case "prev_card":
            dispatchCarusel({ type: "prev" });
            break;
          default:
            console.log("Assistante action");
        }
      }
    });
    return () => {
      console.log("unmount", assistantRef.current);
      assistantRef.current.close();
    };
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
    console.log("handleOnRefreshClick");
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
      <Carusel
        activeIndex={carusel.activeIndex}
        gallaryCategories={gallaryCategories}
        setActiveCategory={setActiveCategory}
        next={dispatchCarusel()}
      />
      <GallaryModal />
    </div>
  );
}

export default inject("gallaryStore")(observer(App));
