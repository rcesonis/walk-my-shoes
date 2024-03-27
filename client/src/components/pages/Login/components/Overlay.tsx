type Props = {
    isOpen: boolean,
    onClose: () => void;
}

const Overlay = (props: Props) => {
    const {isOpen, onClose} = props;
  return (
    isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={onClose}></div>
    )
  )
}

export default Overlay