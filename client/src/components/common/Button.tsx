type Props = {
  color: string;
  colorHover?: string;
  textColor: string;
  text: string;
  textSize: string;
  width: string;
  onClick: () => void;
};

const Button = (props: Props) => {
  const colorClasses: { [key: string]: string } = {
    customBlue: 'bg-customBlue hover:opacity-80',
    customLightGray: 'bg-customLightGray hover:bg-customLightGray',
    customMediumGray: 'bg-customMediumGray hover:bg-customMediumGray',
    customDarkGray: 'bg-customDarkGray hover:bg-customDarkGray',
  };
  const widthClasses: { [key: string]: string } = {
    '32': 'w-32',
    '48': 'w-48',
    '64': 'w-64',
    '96': 'w-96',
  };
  const textSizeClasses: { [key: string]: string } = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  return (
    <button
      className={`${colorClasses[props.color]} hover:bg-${
        props.color
      } font-medium text-${props.textColor} ${
        textSizeClasses[props.textSize]
      } py-3 rounded transition duration-200 ${widthClasses[props.width]}`}
      type='submit'
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
