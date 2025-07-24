import { Suspense } from "react";
import Counter from "./components/Counter";
import SlowComponent from "./components/SlowComponent";

export default function Home() {
  return (
    <div >
      Exercise 2
      <Counter />
      <Suspense fallback={<div>loading....</div>}>
      <SlowComponent />
      </Suspense>
      

    </div>
  );
}
