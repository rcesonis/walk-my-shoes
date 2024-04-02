type Props = {
    isOpen: boolean,
    onClose: () => void;
}

const Overlay:React.FC<Props> = ({ isOpen, onClose}) => {
  return (
    isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-75 z-100" onClick={onClose}></div>
    )
  )
}

export default Overlay