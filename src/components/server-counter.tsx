import type { RequestContext } from "brisa";
import { rerenderInAction } from "brisa/server";

export default function ServerCounter({}, { store }: RequestContext) {
  if (!store.has("count")) store.set("count", 0);

  const count = store.get("count");

  store.transferToClient(["count"]);

  function increment() {
    store.set("count", count + 1);
    rerenderInAction({ type: "page" });
  }

  function decrement() {
    store.set("count", count - 1);
    rerenderInAction({ type: "page" });
  }

  return (
    <div>
      <h1 class="text-5xl font-bold mb-4">Server Counter</h1>
      <h3 class="text-xl text-gray-500 mb-8">
        Server counter example using Brisa.
      </h3>
      <div class="flex gap-4">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={increment}
        >
          Increment
        </button>
        <button
          class="bg-red-500 text-white px-4 py-2 rounded"
          onClick={decrement}
        >
          Decrement
        </button>
      </div>
      <p class="text-2xl mt-4">Count: {count}</p>
    </div>
  );
}
