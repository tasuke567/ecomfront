const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
      <div className="flex items-center border-b py-4">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
        <div className="ml-4 flex-1">
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-gray-600">${item.price}</p>
          <div className="flex items-center mt-2">
            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
            <span className="mx-2">{item.quantity}</span>
            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => onRemove(item.id)} className="ml-4 text-red-500">
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  };