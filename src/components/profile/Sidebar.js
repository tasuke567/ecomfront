// src/components/profile/Sidebar.js
const Sidebar = ({ activeTab, onTabChange }) => {
    const menuItems = [
      { id: 'profile', label: 'Profile Information', icon: 'user' },
      { id: 'orders', label: 'Order History', icon: 'shopping-bag' },
      { id: 'addresses', label: 'Addresses', icon: 'map-pin' },
      { id: 'security', label: 'Security', icon: 'shield' },
      { id: 'settings', label: 'Settings', icon: 'settings' }
    ];
  
    return (
      <div className="bg-white rounded-lg shadow-sm">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors ${
              activeTab === item.id ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
            }`}
          >
            <i className={`icon-${item.icon} mr-3`}></i>
            {item.label}
          </button>
        ))}
      </div>
    );
  };

  export default Sidebar;