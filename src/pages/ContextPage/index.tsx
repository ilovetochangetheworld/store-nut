import { MyProvider } from "./Provider";
import A1 from './a/a1';
import A2 from './a/a2';
import B1 from './b/b1';

export default function App() {

  return (
    <MyProvider>
      <A1 />
      <A2 />
      <B1 />
    </MyProvider>
  )
}