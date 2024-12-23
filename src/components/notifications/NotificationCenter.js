// src/components/notifications/NotificationSystem.js
const NotificationSystem = () => {
    const [notifications, setNotifications] = useState([]);
    const [settings, setSettings] = useState({
      email: true,
      push: true,
      orderUpdates: true,
      promotions: true
    });
  
    useEffect(() => {
      // Subscribe to WebSocket for real-time notifications
      const ws = new WebSocket('ws://your-websocket-url');
      
      ws.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        handleNewNotification(notification);
      };
  
      return () => ws.close();
    }, []);
  
    const handleNewNotification = (notification) => {
      // Add new notification to state
      setNotifications(prev => [notification, ...prev]);
      
      // Show toast notification
      toast(notification.message, {
        icon: notification.type === 'success' ? '✅' : '❗️',
      });
    };
  
    return (
      <div className="space-y-6">
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.checked})}
                className="rounded border-gray-300"
              />
              <span className="ml-2">Email Notifications</span>
            </label>
            {/* Other notification settings */}
          </div>
        </div>
  
        {/* Notification History */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Recent Notifications</h3>
          <div className="divide-y">
            {notifications.map((notification) => (
              <div key={notification.id} className="py-4">
                <div className="flex items-start">
                  <div className={`mt-0.5 w-2 h-2 rounded-full ${
                    notification.read ? 'bg-gray-300' : 'bg-blue-500'
                  }`} />
                  <div className="ml-3">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };