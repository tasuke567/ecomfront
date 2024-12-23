// src/components/profile/ProfileInformation.js
const ProfileInformation = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthDate: user.birthDate,
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await dispatch(updateProfile(formData));
        setIsEditing(false);
        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error('Failed to update profile');
      }
    };
  
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 hover:text-blue-800"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className="w-full border rounded-md p-2"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!isEditing}
              className="w-full border rounded-md p-2"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
              className="w-full border rounded-md p-2"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">Birth Date</label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              disabled={!isEditing}
              className="w-full border rounded-md p-2"
            />
          </div>
  
          {isEditing && (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          )}
        </form>
      </div>
    );
  };