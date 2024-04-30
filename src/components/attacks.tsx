import type { Pokemon } from "@/data";

export default async function Attacks({ attacks }: { attacks: Pokemon["attacks"] }) {
  await Bun.sleep(1000);
  return (
    <div>
      <h4 class="font-bold text-lg pb-6">Attacks</h4>
      <ul>
        {attacks.map((attack) => (
          <li>
            <span class="font-semibold">{attack.name}</span> - {attack.power}
          </li>
        ))}
      </ul>
    </div>
  );
}

Attacks.suspense = () => <div>Loading attacks...</div>;