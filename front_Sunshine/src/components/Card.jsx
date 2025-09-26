export const Card = ({children, className = '', ...props}) => {
    return(
        <div 
        className={`glassmorphism shadow-lg p-6 ${className}`}
        {...props}
        >
            {children}
        
        </div>
    );
};