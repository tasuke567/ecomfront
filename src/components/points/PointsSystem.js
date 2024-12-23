// src/components/points/PointsSystem.js
const PointsSystem = ({ user }) => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Your Points</h3>
          <span className="text-2xl font-bold text-blue-600">
            {user.points} pts
          </span>
        </div>
  
        <div className="space-y-4">
          {/* Points History */}
          <div>
            <h4 className="font-medium mb-2">Recent Points Activity</h4>
            <div className="space-y-2">
              {user.pointsHistory.map((activity) => (
                <div key={activity.id} className="flex justify-between text-sm">
                  <span>{activity.description}</span>
                  <span className={activity.points > 0 ? 'text-green-600' : 'text-red-600'}>
                    {activity.points > 0 ? '+' : ''}{activity.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
  
          {/* Points Benefits */}
          <div>
            <h4 className="font-medium mb-2">Available Benefits</h4>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="border rounded-lg p-4">
                  <h5 className="font-medium">{benefit.name}</h5>
                  <p className="text-sm text-gray-600">{benefit.points} points</p>
                  <button
                    disabled={user.points < benefit.points}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Redeem
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };