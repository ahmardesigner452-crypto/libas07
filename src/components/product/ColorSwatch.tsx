interface ColorSwatchProps {
  colors: { name: string; hex: string }[];
  selected: string;
  onSelect: (color: string) => void;
}

export function ColorSwatch({ colors, selected, onSelect }: ColorSwatchProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => onSelect(color.name)}
          className={`color-swatch ${selected === color.name ? 'active' : ''}`}
          style={{ backgroundColor: color.hex }}
          title={color.name}
        />
      ))}
    </div>
  );
}
