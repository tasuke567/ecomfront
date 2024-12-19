const Card = ({ title, children }) => {
    return (
      <div className="card">
        {title && (
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    );
  };