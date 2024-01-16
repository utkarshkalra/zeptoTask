const DropDownElement = (props: {
  item: DataWithMarking;
  onClickFunc: Function;
}) => {
  return (
    <li onClick={() => props.onClickFunc(props.item.id)}>{props.item.city}</li>
  );
};

export default DropDownElement;
