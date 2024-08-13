import React, { useContext } from 'react';
import { MyContext } from '../../Provider';

const BC1: React.FC = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('BC1 must be used within a MyProvider');
  }

  const { b_c1, setBC1 } = context;

  console.log('B_C1 rendered');

  return (
    <div>
      <p>BC1: {b_c1}</p>
      <input value={b_c1} onChange={(e) => setBC1(e.target.value)} />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(BC1);