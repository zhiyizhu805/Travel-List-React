export default function Stats({ items }) {
  //when items.length = 0,0 is falsy value
  if (!items.length)
    return (
      <footer className="stats">
        Start adding some items to your packing list 🚀!
      </footer>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed === true).length;
  const packedPecentage = (numPacked / numItems).toFixed(2) * 100;
  return (
    <footer className="stats">
      {packedPecentage === 100 ? (
        <em>'You got everything! Ready to go!'</em>
      ) : (
        <em>
          💼 You have {numItems} items in your list, and you already packed
          {numPacked} ({packedPecentage}%).
        </em>
      )}
    </footer>
  );
}
