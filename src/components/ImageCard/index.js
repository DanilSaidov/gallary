import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardContent,
  CardMedia,
  CardHeadline1,
  TextBox,
  TextBoxBigTitle,
  TextBoxBiggerTitle,
  TextBoxSubTitle,
  Button,
} from "@sberdevices/ui";

function ImageCard({
  title,
  subtitle,
  focused,
  imageSrc,
  outlined,
  scaleOnFocus,
  cover,
  description,
  onBtnClick,
}) {
  return (
    <Card
      style={{ width: "22.5rem" }}
      tabIndex={-1}
      outlined={outlined}
      scaleOnFocus={scaleOnFocus}
      focused={focused}
    >
      <CardBody>
        <CardMedia
          src={imageSrc}
          placeholder={{ imageSrc }}
          ratio={cover ? "1 / 1" : "16 / 9"}
        />
        <CardContent cover={cover}>
          <TextBox>
            <TextBoxBigTitle>{subtitle}</TextBoxBigTitle>
            <TextBoxBiggerTitle>{title}</TextBoxBiggerTitle>
            <TextBoxSubTitle>{description}</TextBoxSubTitle>
          </TextBox>
          <Button
            text="Label"
            view="primary"
            size="s"
            scaleOnInteraction={false}
            outlined={false}
            stretch
            style={{ marginTop: "1em" }}
            tabIndex={-1}
            onClick={onBtnClick}
          />
        </CardContent>
      </CardBody>
    </Card>
  );
}

ImageCard.propTypes = {};

export default ImageCard;
