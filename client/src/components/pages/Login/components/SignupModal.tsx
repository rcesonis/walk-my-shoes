import React from 'react';

type Props = {
  onClose: () => void;
}

const SignupModal: React.FC<Props> = ({ onClose }) => { 
  return (
    <div>
      <div>SignupModal</div>
      <button onClick={onClose}>Close</button> 
    </div>
  );
};

export default SignupModal;
