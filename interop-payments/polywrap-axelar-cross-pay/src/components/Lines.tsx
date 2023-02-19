const Lines = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        padding: "0 80px",
        marginTop: "80px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          display: "block",
          width: "12px",
          height: "12px",
          background: "black",
        }}
      />
      <span
        style={{
          width: "100%",
          height: "0",
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px dashed black",
        }}
      >
        <span
          style={{
            width: "900px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <span
            style={{
              borderLeft: "2px dashed black",
              height: "100px",
              transform: "translateY(-50%)",
            }}
          />
          <span
            style={{
              display: "block",
              width: "12px",
              height: "12px",
              background: "black",
              transform: "translateY(-50%)",
            }}
          />
          <span
            style={{
              borderLeft: "2px dashed black",
              height: "100px",
              transform: "translateY(-50%)",
            }}
          />
        </span>
      </span>
      <span
        style={{
          display: "block",
          width: "12px",
          height: "12px",
          background: "black",
        }}
      />
    </div>
  );
};

export default Lines;
