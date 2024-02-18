export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.checked}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/* VVIP: react will immediately call the onDeleteItem here but
            we want react to call this only when event happens!!!
            this happens */}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
