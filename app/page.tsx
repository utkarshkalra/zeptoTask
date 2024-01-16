"use client";
import { KeyboardEvent, useEffect, useState } from "react";

import MappedList from "./Common/MappedList";
import Tag from "./Component/Tag";
import DropDownElement from "./Component/DropDownElement";
import { data } from "./data";

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
