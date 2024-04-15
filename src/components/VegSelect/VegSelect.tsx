import { IVegList } from '@/data/vegetableData';

interface VegSelectProps {
  items: IVegList[];
  veg: string | undefined;
  setCurrentVeg: (veg: string) => void;
}

export default function VegSelect({ veg, setCurrentVeg, items }: VegSelectProps) {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCurrentVeg(e.target.value);
  };

  return (
    <select value={veg} onChange={handleChange}>
      <option value="">Select a vegetable</option>
      {items.map((item) => {
        return (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
}
