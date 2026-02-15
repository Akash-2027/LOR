const Input = ({ label, className = '', ...props }) => {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-700">
      {label && <span className="font-medium text-slate-800">{label}</span>}
      <input
        className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none ${className}`}
        {...props}
      />
    </label>
  );
};

export default Input;
