import React, { useState, startTransition } from 'react';
import useCountStore from "../store/useCountStore";

function Counter() {
  const { count } = useCountStore();

  const simulateHeavyComputation = () => {
      const start = performance.now();
      while (performance.now() - start < 20) {
          // 模拟复杂计算持续20毫秒
      }
      return count;  // 返回当前的 count 值
  };

  return (
    <p>Count: {simulateHeavyComputation()}</p>
  );
}

export default function StatePage() {
    const { setCount } = useCountStore();

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        startTransition(() => {
            setCount(parseInt(newValue, 10) || 0);
        });
    };

    return (
        <div>
            <h3>State Page</h3>
            <input type="text" onChange={handleInputChange} />
            {Array(10).fill(null).map((_, index) => (
                <div key={index}>
                    <Counter />
                </div>
            ))}
        </div>
    );
}