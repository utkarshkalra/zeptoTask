import React from "react";

const MappedList = ({
  items,
  resourceName,
  itemComponent: ItemComponent,
  className,
  onClickFunc,
}) => {
  return (
    <>
      {items.map((item, i) => (
        <ItemComponent
          key={i}
          {...{ [resourceName]: item }}
          onClickFunc={onClickFunc}
        />
      ))}
    </>
  );
};

export default MappedList;
