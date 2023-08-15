export default function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li className="list">
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        <input
          type="checkbox"
          onChange={(e) => onToggleItem(item.id)}
          value={item.packed}
        />{" "}
        {item.quantity} {item.description}
        <button onClick={() => onDeleteItems(item.id)}>❌</button>
      </span>
    </li>
  );
}
