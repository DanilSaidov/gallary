import React from "react";
import { inject, observer } from "mobx-react";
import "./modal.scss";

const GallaryModal = ({ gallaryStore }) => {
  const {
    activeCategoryItems,
    toggleModalCategory,
    showModalCategory,
  } = gallaryStore;
  const [activeCategoryItemIndex, setActiveCategoryItemIndex] = React.useState(
    0
  );
  const modalControls = {
    next() {
      if (activeCategoryItemIndex === activeCategoryItems.length - 1) {
        return;
      }
      setActiveCategoryItemIndex(activeCategoryItemIndex + 1);
    },
    prev() {
      if (activeCategoryItemIndex === 0) {
        return;
      }
      setActiveCategoryItemIndex(activeCategoryItemIndex - 1);
    },
  };
  return (
    showModalCategory && (
      <div className="gallaryModal">
        <div className="gallaryModal__content">
          <div className="gallaryModal__header">
            <h2>header</h2>
          </div>
          <div className="gallaryModal__header">
            <img
              src={activeCategoryItems[activeCategoryItemIndex].imageUrl}
              alt={activeCategoryItems[activeCategoryItemIndex].title}
            />
            ;
          </div>
          <div className="gallaryModal__header">
            <h2
              onClick={() => {
                toggleModalCategory(false);
              }}
            >
              {activeCategoryItems[activeCategoryItemIndex].title}
            </h2>
            <p onClick={modalControls.next}>next</p>
            <p onClick={modalControls.prev}>prev</p>
          </div>
        </div>
      </div>
    )
  );
};

export default inject("gallaryStore")(observer(GallaryModal));
