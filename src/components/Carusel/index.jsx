import React from "react";
import {
  CarouselGridWrapper,
  Carousel,
  CarouselCol,
  Container,
  Row,
} from "@sberdevices/ui";
const items = [
  {
    title: "Item 1",
    url:
      "http://vitabrand.ru/image/cache/catalog/cb17e245eaec078ab370-300x300-300x300.jpg",
  },
  {
    title: "Item 2",
    url:
      "http://vitabrand.ru/image/cache/catalog/cb17e245eaec078ab370-300x300-300x300.jpg",
  },
  {
    title: "Item 3",
    url:
      "http://vitabrand.ru/image/cache/catalog/cb17e245eaec078ab370-300x300-300x300.jpg",
  },
  {
    title: "Item 4",
    url:
      "http://vitabrand.ru/image/cache/catalog/cb17e245eaec078ab370-300x300-300x300.jpg",
  },
];

function Carusel() {
  const [index, setIndex] = React.useState(0);
  const gallaryScroll = {
    next(i) {
      if (i === items.length - 1) {
        return false;
      }
      setIndex(index + 1);
    },
    prev(i) {
      if (i === 0) {
        return false;
      }
      setIndex(index - 1);
    },
  };
  return (
    <div className='carusel'>
      <Container>
        <CarouselGridWrapper>
          <Carousel
            as={Row}
            axis='x'
            index={index}
            animatedScrollByIndex
            scrollSnapType='proximity'
            detectActive
            detectThreshold={0.5}
            stylingCallback={() => {
              console.log("stylingCallback");
            }}
            stylingResetCallback={() => {
              console.log("stylingResetCallback");
            }}
            onIndexChange={(i) => {
              setIndex(i);
              console.log(i);
            }}
            paddingStart='50%'
            paddingEnd='50%'>
            {items.map(({ title, url }, i) => (
              <CarouselCol
                onClick={(e) => console.log({ e, title, url })}
                size={3}
                key={`item:${i}`}>
                {title}
                <img src={url} />
              </CarouselCol>
            ))}
          </Carousel>
        </CarouselGridWrapper>
        <span onClick={() => gallaryScroll.prev(index)}> - </span>

        <span onClick={() => gallaryScroll.next(index)}> + </span>
      </Container>
    </div>
  );
}

export default Carusel;
