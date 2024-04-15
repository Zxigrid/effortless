export default function PrimaryButton({ className = '', disabled, children, ...props }) {
  return (
    <button
      {...props}
      className={`btn btn-primary ${className}`}
      disabled={disabled}
    >
      {
        disabled ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          children
        )
      }
    </button>
  );
}
