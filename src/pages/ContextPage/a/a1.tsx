import React, { useContext } from 'react';
import { MyContext } from '../Provider';

const A1: React.FC = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('A1 must be used within a MyProvider');
  }

  const { a1, setA1 } = context;

  console.log('A1 rendered');

  return (
    <div>
      <p>A1: {a1}</p>
      <input value={a1} onChange={(e) => setA1(e.target.value)} />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(A1);