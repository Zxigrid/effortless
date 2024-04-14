export default function PrimaryButton({ className = '', disabled, children, ...props }) {
  return (
    <button
      {...props}
      className={`btn btn-primary ${className}`}
      disabled={disabled}
    >
      {
        disabled ? (
          <span class="loading loading-spinner loading-sm"></span>
        ) : (
          children
        )
      }
    </button>
  );
}
