import React, { useState, useEffect, startTransition } from 'react';
import useCountStore from "../store/useCountStore";

export default function StatePage() {
    const countStore = useCountStore();
    const { count, increase, decrease, reset } = countStore;

    return (
        <div>
            <h3>State Page</h3>
            <p>Count: {count}</p>
            <button onClick={() => increase()}>
              Increase {count}
            </button>
            <button onClick={() => decrease()}>Decrease {count}</button>
            <button onClick={() => reset()}>Reset</button>
        </div>
    );
}
