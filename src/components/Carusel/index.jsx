import React from "react";
import {
  CarouselGridWrapper,
  Carousel,
  CarouselCol,
  Container,
  Row,
} from "@sberdevices/ui";

import { ImageCard } from "../";

const Carusel = ({ activeIndex, gallaryCategories, setActiveCategory }) => {
  const onGallaryItemClick = (event, item) => {
    setActiveCategory(item.categoryId);
    console.log("carousel", gallaryCategories);
  };
  return (
    <div className="carusel">
      <Container>
        <CarouselGridWrapper>
          <Carousel
            axis="x"
            index={activeIndex}
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
          >
            {gallaryCategories.map((item, i) => (
              <CarouselCol size={3} key={`item:${i}`} offset={1} type="calc">
                <ImageCard
                  title={item.title}
                  //subtitle={subtitle}
                  focused={i === activeIndex}
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

export default Carusel;
