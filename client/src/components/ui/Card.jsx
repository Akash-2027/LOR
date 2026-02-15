const Card = ({ className = '', ...props }) => {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`} {...props} />
  );
};

export default Card;
