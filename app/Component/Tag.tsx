const Tag = (props: { item: DataWithMarking; onClickFunc: Function }) => {
  return (
    <div>
      <p>{props.item.city}</p>
      <button onClick={() => props.onClickFunc(props.item.id)}>X</button>
    </div>
  );
};

export default Tag;
