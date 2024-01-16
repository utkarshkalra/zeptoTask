const modifyChip = (
  id: string,
  searchList: Array<Data>,
  setSearchList: Function,
  commmand: string
) => {
  let newSearchList = searchList.map((el) => {
    if (el.id !== id) {
      return { ...el };
    } else
      return {
        ...el,
        isInChipList: commmand === "add" ? true : false,
      };
  });
  setSearchList(newSearchList);
};

export { modifyChip };
