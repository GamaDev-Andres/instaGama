import { useContext } from 'react';

import searchContext from '../context/searchContext';
import Recents from './Recents';
import ResultSearch from './ResultSearch';

const Searches = () => {
  const { panelRef, autoCompleteState, autoComplete, inputRef } =
    useContext(searchContext);

  if (!autoCompleteState.isOpen && !inputRef.current?.value) {
    return <Recents />;
  }
  return (
    <div
      className="mx-auto max-w-[935px]"
      {...autoComplete.getPanelProps}
      ref={panelRef}
    >
      {autoCompleteState.collections.map((collection, i) => {
        const { items } = collection;
        return (
          <div key={'section' + i}>
            {items.length > 0 && (
              <ul {...autoComplete.getListProps()}>
                {items.map((item) => (
                  <ResultSearch {...item} key={item.id} />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Searches;
