import React from 'react';
import { MyContext } from '../../Provider';
import withSelector from '../../withSelector';

// eslint-disable-next-line react-refresh/only-export-components
const BC2: React.FC<{ b_c2: string; setBC2: (value: string) => void }> = ({ b_c2, setBC2 }) => {

  console.log('B_C2 rendered');

  return (
    <div>
      <p>BC2: {b_c2}</p>
      <input value={b_c2} onChange={(e) => setBC2(e.target.value)} />
    </div>
  );
};

const selector = {
  context: MyContext,
  selector: (value: { b_c2: string; setBC2: string; }) => ({ b_c2: value.b_c2, setBC2: value.setBC2 }),
};

// eslint-disable-next-line react-refresh/only-export-components
export default withSelector(selector)(BC2);