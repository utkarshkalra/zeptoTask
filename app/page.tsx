"use client";
import { data } from "./data";
import { useEffect, useState } from "react";
import MappedList from "./Common/MappedList";
export default function Home() {
  const originalData: Array<Data> = data;
  const [searchList, setSearchList] = useState<Array<DataWithMarking>>(
    originalData.map((i) => {
      return { ...i, isInChipList: false };
    })
  );
  const [filteredSearchList, setFilteredSearchList] = useState<
    Array<DataWithMarking>
  >(
    originalData.map((i) => {
      return { ...i, isInChipList: false };
    })
  );

  const [showDropDown, setShowDropDown] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setFilteredSearchList(
      searchList.filter((i) =>
        i?.city?.toLowerCase()?.includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, searchList]);

  const addToChip = (id: string) => {
    let newSearchList = searchList.map((el) => {
      if (el.id !== id) {
        return { ...el };
      } else
        return {
          ...el,
          isInChipList: true,
        };
    });

    setSearchList(newSearchList);
  };

  const removeChip = (id: string) => {
    let newSearchList = searchList.map((el) => {
      if (el.id !== id) {
        return { ...el };
      } else
        return {
          ...el,
          isInChipList: false,
        };
    });

    setSearchList(newSearchList);
  };
  return (
    <main className="container">
      <div className="tags">
        <MappedList
          items={searchList.filter((i) => i.isInChipList)}
          resourceName="item"
          itemComponent={Tag}
          className="tag"
          onClickFunc={removeChip}
        />
        <section className="search-list">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            onClick={() => setShowDropDown(true)}
            onFocus={() => setShowDropDown(true)}
            placeholder="select tag"
          />
          {showDropDown && (
            <ul
              className="dropdown"
              onMouseLeave={() => setShowDropDown(false)}
            >
              <MappedList
                items={filteredSearchList.filter((i) => !i.isInChipList)}
                resourceName="item"
                itemComponent={DropDownElement}
                className="dropdown"
                onClickFunc={addToChip}
              />
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

const Tag = (props: { item: DataWithMarking; onClickFunc: Function }) => {
  return (
    <div>
      <p>{props.item.city}</p>
      <button onClick={() => props.onClickFunc(props.item.id)}>X</button>
    </div>
  );
};

const DropDownElement = (props: {
  item: DataWithMarking;
  onClickFunc: Function;
}) => {
  return (
    <li onClick={() => props.onClickFunc(props.item.id)}>{props.item.city}</li>
  );
};
