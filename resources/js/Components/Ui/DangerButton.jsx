export default function DangerButton({ className = '', disabled, children, ...props }) {
  return (
    <button {...props} className={`btn btn-error ${className}`} disabled={disabled}>
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
