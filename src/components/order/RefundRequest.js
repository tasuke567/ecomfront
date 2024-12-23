// src/components/order/RefundRequest.js
const RefundRequest = ({ order }) => {
    const [reason, setReason] = useState('');
    const [bankInfo, setBankInfo] = useState({
      bankName: '',
      accountName: '',
      accountNumber: ''
    });
    const [images, setImages] = useState([]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append('orderId', order.id);
        formData.append('reason', reason);
        formData.append('bankInfo', JSON.stringify(bankInfo));
        images.forEach(image => {
          formData.append('images', image);
        });
  
        await refundService.submitRequest(formData);
        toast.success('Refund request submitted successfully');
      } catch (error) {
        toast.error('Failed to submit refund request');
      }
    };
  
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Request Refund</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Reason for Refund</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded-md p-2"
              rows="3"
              required
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bank Name</label>
              <input
                type="text"
                value={bankInfo.bankName}
                onChange={(e) => setBankInfo({...bankInfo, bankName: e.target.value})}
                className="w-full border rounded-md p-2"
                required
              />
            </div>
            {/* เพิ่มฟิลด์ข้อมูลธนาคารอื่นๆ */}
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages([...e.target.files])}
              className="w-full"
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Submit Refund Request
          </button>
        </form>
      </div>
    );
  };