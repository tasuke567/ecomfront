const Button = ({ children, variant = 'primary', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-lg transition-colors";
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};