import { StateCreator, State, StoreApi } from 'zustand';

type SetState<T extends State> = (partial: Partial<T> | ((state: T) => Partial<T>), replace?: boolean) => void;
type GetState<T extends State> = () => T;

export const logMiddleware = <T extends State>(createState: StateCreator<T>) =>
  (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) =>
      createState(
          (...args: [Partial<T> | ((state: T) => Partial<T>), boolean?]) => {
              console.log(`old state:`, get());
              set(...args);
              console.log(`new state`, get());
          },
          get,
          api
      );