import React, { useContext } from 'react';

const withSelector = (selector) => (Component) => {
  const MemoComponent = React.memo(Component);
  return (props) => {
    const value = useContext(selector.context);
    const selectedValue = selector.selector(value);
    return <MemoComponent {...props} {...selectedValue} />;
  };
};

export default withSelector;