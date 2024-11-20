import { getConnectedGroups } from './utils/group.items';
import { useCallback, useEffect, useState } from 'react';
import Game from './components/game';
import { Leva, useControls } from 'leva';
import './components/game.css';

const isSmallScreen = window.innerWidth <= 768;

const App = () => {
  const { groupSize } = useControls({ groupSize: { value: 2, min: 2, max: 4, step: 1 } });
  const { itemCount } = useControls({ itemCount: { value: 8, min: 4, max: 12, step: 1 } });
  const { columns } = useControls({
    columns: { value: 4, min: 2, max: 4, step: 1, disabled: isSmallScreen },
  });

  const [itemGroups, setItemsGroup] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const reset = useCallback(() => {
    const [newItemGroups, newAllItems] = getConnectedGroups(itemCount, groupSize);
    setItemsGroup(newItemGroups);
    setAllItems(newAllItems);
  }, [setAllItems, itemCount, groupSize]);

  useEffect(reset, [itemCount, groupSize, reset]);

  return (
    <div className="app-container">
      <Leva
        collapsed
        hideCopyButton={true}
        titleBar={{ position: { x: 0, y: 40 }, filter: false, title: 'Config' }}
        theme={{
          colors: {
            highlight1: '#ff7f50', 
            highlight2: '#ffffff',
          },
        }}
      />
      <h3 className="center text-description">
        Connect group of {groupSize} words by clicking on related words
      </h3>
      <Game itemGroups={itemGroups} allItems={allItems} columns={columns} groupSize={groupSize} />
      <div className="center">
        <button className="reset" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
