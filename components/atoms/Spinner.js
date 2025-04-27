const Spinner = ({ size, color = "#fff" }) => {
  return (
    <>
      <span id="spinner" size={size} color={color}></span>

      <style jsx>{`
        @keyframes Spin {
          0% {
            transform: rotate(0deg);
          }

          75% {
            transform: rotate(210deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        #spinner {
          border: 3px solid rgba(0, 0, 0, 0.15);
          border-left: 3px solid ${color};
          border-radius: 50%;
          min-width: ${size || "18px"};
          min-height: ${size || "18px"};
          width: ${size || "18px"};
          height: ${size || "18px"};
          animation: Spin 0.45s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Spinner;
