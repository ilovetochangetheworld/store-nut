import React, { useContext } from 'react';
import { MyContext } from '../Provider';

const A2: React.FC = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('A2 must be used within a MyProvider');
  }

  const { a2, setA2 } = context;

  console.log('A2 rendered');

  return (
    <div>
      <p>A2: {a2}</p>
      <input value={a2} onChange={(e) => setA2(e.target.value)} />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(A2);