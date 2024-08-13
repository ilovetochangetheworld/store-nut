import React, { createContext, useState, ReactNode, useMemo, useCallback } from 'react';

// 定义状态的类型
interface State {
  a1: string;
  a2: string;
  b1: string;
  b_c1: string;
  b_c2: string;
}

// 定义 Context 的类型
interface ContextProps extends State {
  setA1: (value: string) => void;
  setA2: (value: string) => void;
  setB1: (value: string) => void;
  setBC1: (value: string) => void;
  setBC2: (value: string) => void;
}

// 创建 Context
const MyContext = createContext<ContextProps | undefined>(undefined);

// 创建 Provider 组件
const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [a1, setA1] = useState<string>('');
  const [a2, setA2] = useState<string>('');
  const [b1, setB1] = useState<string>('');
  const [b_c1, setBC1] = useState<string>('');
  const [b_c2, setBC2] = useState<string>('');

  const contextValue = {
    a1,
    a2,
    b1,
    b_c1,
    b_c2,
    setA1,
    setA2,
    setB1,
    setBC1,
    setBC2,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };