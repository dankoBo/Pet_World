import './Button.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: string;
    className: string;
};

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
    return (
        <button className={`button ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
