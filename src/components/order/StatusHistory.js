// src/components/order/StatusHistory.js
const StatusHistory = ({ orderId }) => {
    const [history, setHistory] = useState([]);
  
    useEffect(() => {
      const fetchStatusHistory = async () => {
        try {
          const response = await axios.get(`/api/orders/${orderId}/history`);
          setHistory(response.data);
        } catch (error) {
          console.error('Failed to fetch status history:', error);
        }
      };
  
      fetchStatusHistory();
    }, [orderId]);
  
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Order Status History</h3>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
  
          {/* Status Items */}
          <div className="space-y-6">
            {history.map((item, index) => (
              <div key={item.id} className="relative pl-10">
                {/* Status Dot */}
                <div className={`absolute left-2 w-4 h-4 rounded-full ${
                  index === 0 ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
  
                {/* Status Content */}
                <div>
                  <h4 className="font-medium">{item.status}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <time className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </time>
                  {item.note && (
                    <p className="text-sm text-gray-600 mt-1">{item.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };