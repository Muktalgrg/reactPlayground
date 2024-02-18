export default function Stats({ items }) {
  // early return as conditional rendering
  if (!items.length) {
    return (
      <p className="footer">
        <em>Start adding some items to your list!</em>
      </p>
    );
  }

  const numItems = items.length; // derived state
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go"
          : `box🥊 You have ${numItems} items on your list, and 
          you already packed ${numPacked}(${percentage}%)`}
      </em>
    </footer>
  );
}
