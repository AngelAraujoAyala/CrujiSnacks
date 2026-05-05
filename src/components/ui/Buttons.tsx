

export const Button = ({ variant, children, ...props }) => {
    const baseStyles = "px-6 py-2 font-bold rounded-xl transition-colors";

    const variants = {
        primary: "bg-red-500 text-white hover:bg-red-600 mt-2",
    };

    return (
        <button className={`${baseStyles} ${variants[variant]}`} {...props}>
            {children}
        </button>
    );
};

