const Button = ({ as: Component = 'button', variant = 'primary', className = '', type, ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60';
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100'
  };

  return (
    <Component
      className={`${base} ${styles[variant] || styles.primary} ${className}`}
      type={Component === 'button' ? type || 'button' : undefined}
      {...props}
    />
  );
};

export default Button;
