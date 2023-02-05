/**
 * @author Victor Giovanni Beltrán Rodríguez
 * @file Contains `useModal` custom React Hook.
 */

// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT REACT MODULES
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';

// ━━ TYPE DEFINITIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * A modal component.
 *
 * @typedef {() => React.Portal}  Modal
 */

/**
 * The returns from `useModal` custom hook, An object with the modal state,
 * toggle, open and close functions.
 *
 * @typedef   {Object}      modalHook
 * @property  {boolean}     isOpen      - Indicates if the modal is open or closed.
 * @property  {() => void}  toggle      - Toggles the current state of the modal.
 * @property  {() => void}  openModal   - Opens the modal component.
 * @property  {() => void}  closeModal  - Closes the modal component.
 * @property  {Modal}       Modal       - A modal component.
 */

// ━━ FUNCTIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Adds an element to the end of the body of an HTML document.
 *
 * @param {HTMLElement} element - The element to be added to the body of the HTML document.
 * @returns {void}
 * @example
 * ```js
 *  const rootElement = document.createElement('div');
 *  rootElement.setAttribute('id', id);
 *  rootElement.setAttribute('class', 'modal');
 *  addElement(rootElement);
 * ```
 */
const addElement = element => {
  document.body.insertBefore(element, document.body.lastElementChild.nextElementSibling);
};

// ━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `TitleBar` component.
 *
 * @component
 * @component
 * @param {object} props - Component properties.
 * @param {string} props.title - The title that will be displayed in the Title bar.
 * @param {string} props.close - Function to close the modal window.
 * @param {string} props.onMouseDown - Function to handle the `onMouseDown` event.
 * @returns {JSX.Element} The `TitleBar` components.
 */
const TitleBar = React.forwardRef((props, ref) => (
  <nav
    role="presentation"
    className="titlebar titlebar--modal"
    ref={ref}
    onMouseDown={props.onMouseDown}
  >
    <div className="titlebar__app-name ">
      <span>&#xE700;</span>
      <p>{props.title}</p>
    </div>
    <div className="titlebar__windows-control titlebar--nodrag">
      <button
        className="titlebar__button titlebar__button--close"
        type="button"
        title="close"
        onClick={props.close}
      >
        &#xE8BB;
      </button>
    </div>
  </nav>
));

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
};

/**
 * A reusable component to create modal windows.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Node} props.children - The content to be displayed in the modal.
 * @param {string} props.id - The id of the root element of the modal.
 * @param {string} props.title - The title of the modal.
 * @param {boolean} props.isOpen - A flag indicating if the modal is open or closed.
 * @param {function} props.closeModal - A function that closes the modal.
 * @param {Object} props.position - An object containing the initial position of the modal.
 * @param {string} props.position.left - The initial left position of the modal.
 * @param {string} props.position.top - The initial top position of the modal.
 *
 * @returns {React.Portal} The modal component.
 * @example
 * ```js
 *  <Modal
 *    id="popup"
 *    title="Modal"
 *    isOpen={isOpen}
 *    closeModal={closeModal}
 *    position={{ top: '50%', left: '50%' }}
 *  >
 *    <h1>HI😊</h1>
 *  </Modal>
 *```
 *
 */
const Modal = ({ children, id, title, isOpen, closeModal, position }) => {
  const [left, setLeft] = useState(position.left);
  const [top, setTop] = useState(position.top);
  const rootElement = document.createElement('div');
  const titlebarRef = useRef(null);
  const modalRef = useRef(rootElement);
  modalRef.current.setAttribute('id', id);
  modalRef.current.setAttribute('class', 'modal');

  useEffect(() => {
    const element = modalRef.current;
    if (isOpen) {
      addElement(element);
      element.style.left = left;
      element.style.top = top;
    }
    if (!isOpen) {
      setTop(position.top);
      setLeft(position.left);
    }
    return () => {
      element.remove();
    };
  }, [isOpen, modalRef, left, top, position.left, position.top]);

  const handleMouseDown = event => {
    let currentX = event.clientX;
    let currentY = event.clientY;
    let initialX = event.clientX;
    let initialY = event.clientY;
    let xOffset = 0;
    let yOffset = 0;

    const handleMouseMove = e => {
      const bound = modalRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const limitHeight = viewportHeight - bound.height;
      const limitWidth = viewportWidth - bound.width;
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      const positionX = modalRef.current.offsetLeft + xOffset;
      const positionY = modalRef.current.offsetTop + yOffset;

      const edges = {
        x: {
          start: bound.x + xOffset > 0,
          end: bound.x + xOffset < limitWidth,
        },
        y: {
          start: bound.y + yOffset > 0,
          end: bound.y + yOffset < limitHeight,
        },
      };

      if (edges.x.start && edges.x.end) {
        setLeft(`${positionX}px`);
      }

      if (edges.y.start && edges.y.end) {
        setTop(`${positionY}px`);
      }

      initialX = e.clientX;
      initialY = e.clientY;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <React.Fragment key="root-modal">
      <TitleBar title={title} close={closeModal} ref={titlebarRef} onMouseDown={handleMouseDown} />
      <section className="modal-container">{children}</section>
    </React.Fragment>,
    modalRef.current,
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.shape({
    left: PropTypes.string.isRequired,
    top: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

// ━━ CUSTOM REACT HOOK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `useModal` Custom hook for managing the state of a modal component.
 *
 * @Hook
 * @returns {modalHook} An object with the modal state and functions to manage its state.
 * @example
 * ```js
 *  const App = () => {
 *    const { isOpen, toggle, closeModal, Modal } = useModal();
 *    return (
 *      <div className="App">
 *        <button type="button" onClick={toggle}>
 *          Modal
 *        </button>
 *        <Modal
 *          id="popup"
 *          title="Modal"
 *          isOpen={isOpen}
 *          closeModal={closeModal}
 *          position={{ top: '50%', left: '50%' }}
 *        >
 *          <h1>HI 😊</h1>
 *        </Modal>
 *      </div>
 * ```
 *
 */
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    toggle,
    openModal,
    closeModal,
    Modal,
  };
};

// ━━ EXPORT MODULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default useModal;
