const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 4, minWidth: 300 }}>
        <button style={{ float: "right" }} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
