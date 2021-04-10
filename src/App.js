import React from "react";

import { Button } from "@sberdevices/ui/components/Button/Button";
import { Carusel } from "./components";
function App() {
  return (
    <div className='App'>
      <h1>Gallary App </h1>
      <p>
        <Button view='primary'>Hello Plasma</Button>
      </p>
      <Carusel />
    </div>
  );
}

export default App;
