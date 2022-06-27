/* eslint-disable-next-line */
export interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
  children: any;
  onClick?: () => void;
}

export function Button({
  type,
  className,
  onClick,
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
