export const LoadingSpinner = ({size = 'md'}) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-16 h-16',
    }
    return(
        <div className=" flex justify-center items-center">
             <div
             className={`${sizes[size]}border-light/30 border-t-light rounded-full animate-spin`}
             ></div>
        </div>
    )
}