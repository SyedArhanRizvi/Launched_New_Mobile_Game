import { useEffect, useRef, useState } from 'react';
import GridUI from './puzzle';
import './game.css';
import { areItemsFromSingleGroup } from '../utils/group.items';

function Game({ itemGroups, allItems, columns = 2, groupSize }) {
  const [items, setItems] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState(null);
  const gridUIRef = useRef(null);

  // when items change, reset the game
  useEffect(() => {
    setItems(allItems);
    setAttempts(0);
    setStatus(null);
    gridUIRef.current?.clearSelection();
  }, [allItems]);

  // take action if items are from the same group on selection completion
  function onSelection(selected) {
    if (selected.length === groupSize) {
      setAttempts(attempts + 1);
      const newStatus = areItemsFromSingleGroup(itemGroups, selected)
        ? 'success'
        : 'failure';
      setStatus(newStatus);
      const timeoutId = setTimeout(() => unHighlight(selected, newStatus), 1000);
      return () => clearTimeout(timeoutId);
    }
  }

  function unHighlight(itemsForRemoval, status) {
    if (status === 'success') {
      setItems(items.filter((item) => !itemsForRemoval.includes(item)));
    }
    setStatus(null);
    gridUIRef.current?.clearSelection();
  }

  return (
    <>
      {items.length ? (
        <GridUI
          items={items}
          cols={columns}
          onSelection={onSelection}
          status={status}
          ref={gridUIRef}
        />
      ) : (
        <p className="center">Well done. Reset to play again!</p>
      )}
      <p className="center">
        Attempts: <strong>{attempts}</strong>
      </p>
    </>
  );
}

export default Game;
