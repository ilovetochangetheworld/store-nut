// 定义 Store API 的接口，包含操作和获取状态的方法。
export interface StoreApi<T> {
  getState: () => T; // 获取当前状态的方法。
  setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void; // 更新状态的方法。
  subscribe: (listener: (state: T, prevState: T) => void) => () => void; // 订阅状态变化的方法。
  destroy: () => void; // 清理资源的方法，通常用于不再需要存储时。
}

/**
 * 使用提供的初始化函数创建一个具备状态管理能力的存储。
 * @param initState 一个初始化存储状态并提供与之交互方法的函数。
 * @returns 返回代表存储的对象，包含操作和订阅状态变化的方法。
 */
export function createStore<T>(initState: (set: StoreApi<T>["setState"], get: StoreApi<T>["getState"], api: StoreApi<T>) => T): StoreApi<T> {
  // 存储的初始状态，将由 initState 函数设置。
  let state: T;
  
  // 用于保存订阅状态变化的监听器的数组。
  const listeners: Array<(state: T, prevState: T) => void> = [];

  // 更新状态的函数。它接受一个需要更新的部分状态对象或函数。
  // set((state) => ({count: state.count + by}))
  // set({count: 0})
  const setState: StoreApi<T>["setState"] = (partial) => {
    const prevState = state; // 保存先前的状态。
    const nextState = typeof partial === 'function' ? partial(state) : partial; // 确定下一个状态。

    // 状态值改变，更新state，执行监听函数
    if (!Object.is(nextState, state)) {
      state = { ...state, ...nextState }; // 合并先前状态与下一个状态。
      // 通知所有监听器关于状态变化。
      listeners.forEach(listener => listener(state, prevState));
    }
    
  };

  // 获取当前状态的函数。
  const getState: StoreApi<T>["getState"] = () => state;

  // 订阅状态变化的函数。返回一个取消订阅的函数。
  const subscribe: StoreApi<T>["subscribe"] = (listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1); // 从数组中移除监听器。
      }
    };
  };

  // 清理资源的函数，用于在存储不再需要时调用。
  const destroy: StoreApi<T>["destroy"] = () => {
    listeners.length = 0; // 清空监听器数组。
  };

  // 存储 API 对象，包含所有操作和观察存储的方法。
  const storeApi: StoreApi<T> = { getState, setState, subscribe, destroy };

  // 使用提供的 initState 函数初始化状态。
  /**
   *  (set) => ({
        count: 0,
        increase: (by = 1) => set((state) => ({count: state.count + by})),
        decrease: (by = 1) => set((state) => ({count: state.count - by})),
        reset: () => set({count: 0}),
        setCount: (count: number) => set({count}),
      })
   */
  state = initState(setState, getState, storeApi);

  // 返回存储 API。
  return storeApi;
}