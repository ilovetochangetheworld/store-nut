import React, { useContext } from 'react';
import { MyContext } from '../Provider.tsx';
import BC1 from './b_c/b_c1.tsx';
import BC2 from './b_c/b_c2.tsx';

const B1: React.FC = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('B1 must be used within a MyProvider');
  }

  const { b1, setB1 } = context;

  console.log('B1 rendered');

  return (
    <div>
      <p>B1: {b1}</p>
      <input value={b1} onChange={(e) => setB1(e.target.value)} />
      <BC1 />
      <BC2 />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default B1;