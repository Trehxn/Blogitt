import { useState } from "react";
import ReactDOM from "react-dom";
const modalRoot = document.getElementById("modal");

export default function Modal({ children, open, onClose }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        zIndex: "99",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0, .6)",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        onClick={onClose}
      />
      <div
        style={{
          zIndex: 999,
        }}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
}
