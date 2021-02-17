import './Modal.css';

function Modal(props) {

  return (
    <div className="modal">
      <p onClick={props.close}>X</p>
      <div>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
