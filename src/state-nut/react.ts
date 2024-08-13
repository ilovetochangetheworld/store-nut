import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { createStore, StoreApi } from './vanilla';

export function create<T>(initState: (set: StoreApi<T>["setState"], get: StoreApi<T>["getState"], api: StoreApi<T>) => T): () => T {
  const store = createStore(initState);

  // 返回一个函数，这个函数是一个 hook，可以在组件中使用
  // return function useStore() {
  //   const [, setUpdateState] = useState(Object.create(null));
  //   // React更新函数，避免每次渲染时都创建一个新的闭包
  //   const forceUpdate = useCallback(() => setUpdateState(Object.create(null)), []);

  //   useEffect(() => {
  //     const unsubscribe = store.subscribe((newState) => {
  //       forceUpdate();
  //       console.log('newState', newState);
  //     });

  //     // 清理函数，用于组件卸载时取消订阅
  //     return () => unsubscribe();
  //   }, []);  // 依赖数组包含 store，确保如果 store 变更，重新订阅

  //   return store.getState();
  // };

  return function useStore() {
    // 使用 useSyncExternalStore 来订阅和获取状态
    const state = useSyncExternalStore(
      store.subscribe,
      store.getState,
      store.getState // 传递相同的获取状态函数作为快照，确保在 React 的 Concurrent Mode 下一致性
    );

    return state;
  };
}