import React from "react";
import {
  CarouselGridWrapper,
  Carousel,
  CarouselCol,
  Container,
  Row,
} from "@sberdevices/ui";
import { inject, observer } from "mobx-react";

import { ImageCard } from "../";

const Carusel = ({ gallaryStore }) => {
  const [index, setIndex] = React.useState(0);
  const { gallaryCategories, setActiveCategory } = gallaryStore;
  const gallaryScroll = {
    next(i) {
      if (index === gallaryCategories.length - 1) {
        return false;
      }
      setIndex(index + 1);
    },
    prev() {
      if (index === 0) {
        return false;
      }
      setIndex(index - 1);
    },
  };
  const onGallaryItemClick = (event, item) => {
    setActiveCategory(item.categoryId);
    console.log("carousel", gallaryStore);
  };

  return (
    <div className="carusel">
      <Container>
        <CarouselGridWrapper>
          <Carousel
            axis="x"
            index={index}
            animatedScrollByIndex
            scrollSnapType="mandatory"
            detectActive={true}
            scrollAlign="start"
            stylingCallback={() => {
              console.log("stylingCallback");
            }}
            stylingResetCallback={() => {
              console.log("stylingResetCallback");
            }}
            onIndexChange={(i) => {
              setIndex(i);
            }}
          >
            {gallaryCategories.map((item, i) => (
              <CarouselCol size={3} key={`item:${i}`} offset={1} type="calc">
                <ImageCard
                  title={item.title}
                  //subtitle={subtitle}
                  focused={i === index}
                  imageSrc={item.imageUrl}
                  onBtnClick={(event) => onGallaryItemClick(event, item)}
                />
              </CarouselCol>
            ))}
          </Carousel>
        </CarouselGridWrapper>
        <span onClick={gallaryScroll.prev}> - </span>
        <span onClick={gallaryScroll.next}>+</span>
      </Container>
    </div>
  );
};

export default inject("gallaryStore")(observer(Carusel));
