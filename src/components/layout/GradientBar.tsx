export function GradientBar() {
  return (
    <div
      style={{
        height: 3,
        background: "linear-gradient(to right, var(--primary), var(--accent))",
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}

export default GradientBar;
