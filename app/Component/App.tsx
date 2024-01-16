"use client";
import { KeyboardEvent, useEffect, useState } from "react";

import MappedList from "../Common/MappedList";
import DropDownElement from "./DropDownElement";
import Tag from "./Tag";

import { modifyChip } from "../Utility";

export default function App(props: { originalData: Array<Data> }) {
  const [searchList, setSearchList] = useState<Array<DataWithMarking>>(
    props.originalData.map((i) => {
      return { ...i, isInChipList: false };
    })
  );
  const [filteredSearchList, setFilteredSearchList] = useState<
    Array<DataWithMarking>
  >(
    props.originalData.map((i) => {
      return { ...i, isInChipList: false };
    })
  );

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    setFilteredSearchList(
      searchList.filter((i) =>
        i?.city?.toLowerCase()?.includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, searchList]);

  const addToChip = (id: string) => {
    modifyChip(id, searchList, setSearchList, "add");
  };

  const removeChip = (id: string) => {
    modifyChip(id, searchList, setSearchList, "remove");
  };

  const onBackSpace = (e: KeyboardEvent<HTMLElement>) => {
    var key = e.key;
    if (key === "Backspace") {
      if (!searchQuery) {
        let lastChip = searchList.findLast((el) => el.isInChipList);
        if (lastChip) removeChip(lastChip.id);
      }
    }
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
            onKeyDown={onBackSpace}
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
