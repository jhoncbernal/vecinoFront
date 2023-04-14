import { useState, useEffect, useRef } from "react";
import {
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonIcon,
} from "@ionic/react";
import React from "react";

interface FilterableListProps<T> {
  items: { [key: string]: any }[];
  labelText: string;
  labelIcon: string;
  choosenItem: any;
  value: string;
  regexInput?: string;
  fieldToShow: string;
}

const FilterableList = <T extends object>({
  items,
  labelText,
  labelIcon,
  choosenItem,
  value,
  regexInput = "",
  fieldToShow,
}: FilterableListProps<T>) => {
  const [filter, setFilter] = useState("");
  const [showList, setShowList] = useState(false);
  const inputRef = useRef<HTMLIonInputElement>(null);
  const [listMax, setListMax] = useState(5);
  const [validInputState, setValidInputState] = useState(true);
  useEffect(() => {
    if (showList) {
      inputRef.current?.getInputElement().then((el) => el.focus());
    }
  }, [showList]);

  useEffect(() => {
    if (filter) choosenItem(filter);
  }, [filter]);

const filteredItems = items
  .filter(
    (item) =>
      item[fieldToShow].toLowerCase().indexOf(filter.toLowerCase()) !== -1,
  )
  .slice(0, listMax);

  const handleItemClick = (item: T) => {
    if (item) {
      setFilter(item[fieldToShow]);
      setShowList(false);
    }
  };

  const handleInputInList = () => {
    if (
      items.filter(
        (item) =>
          item[fieldToShow].toLowerCase().indexOf(filter.toLowerCase()) !== -1,
      ).length > 0
    ) {
      const item = items.find((item) => item[fieldToShow] === filter)!;
      handleItemClick(item as T);
    }
  };

  const handleInputFocus = () => {
    setShowList(true);
  };

  const handleInputMaxList = () => {
    setListMax(listMax + 5);
  };

  const handleInputBlur = () => {
    // Delay the blur event using setTimeout
    setTimeout(() => {
      setShowList(false);
      handleInputInList();
    }, 100);
  };
  useEffect(() => {
    if (value) setFilter(value);
  }, [value]);

  const handleValidInput = () => {
    const regex = new RegExp(regexInput);
    if (regex.test(filter)) {
      return setValidInputState(false);
    } else {
      return setValidInputState(true);
    }
  };
  return (
    <>
      <IonItem>
        <IonIcon color="primary" icon={labelIcon} slot="start" />
        <IonLabel position="stacked">{labelText}</IonLabel>
        <IonInput
          value={filter}
          color={validInputState ? "primary" : "danger"}
          placeholder="Type to filter"
          onIonChange={(e) => {
            setFilter(e.detail.value!);
            handleValidInput();
          }}
          onIonFocus={handleInputFocus} // Use onIonFocus instead of onFocus
          onIonBlur={handleInputBlur} // Use onIonBlur instead of onBlur
          ref={inputRef}
        />
        {showList && (
          <IonList>
            <IonListHeader>Result</IonListHeader>
            {filteredItems.map((item, index) => (
              <IonItem
                key={index}
                button
                onClick={() => handleItemClick(item as T)}
              >
                <IonLabel>{item[fieldToShow]}</IonLabel>
              </IonItem>
            ))}
            <>
              {listMax < items.length - 5 ||
              listMax < filteredItems.length - 5 ? (
                <IonItem button onClick={() => handleInputMaxList()}>
                  <IonLabel>ShowMore</IonLabel>
                </IonItem>
              ) : null}
            </>
          </IonList>
        )}
      </IonItem>
    </>
  );
};
export default FilterableList;
