const ContextMenu = ({ x, y, currentStatus, moveTodo, onClose }) => {
  const options = ['New', 'Ongoing', 'Done'].filter((status) => status !== currentStatus);

  return (
    <div
      className="absolute bg-white border rounded shadow"
      style={{ top: y, left: x }}
      onClick={onClose}
    >
      {options.map((status) => (
        <div
          key={status}
          className="px-4 py-2 hover:bg-[#dfdfdf] cursor-pointer"
          onClick={() => moveTodo(status)}
        >
          Move to {status}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;