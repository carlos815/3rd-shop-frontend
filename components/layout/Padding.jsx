export default function Padding({ children, ...props }) {

    const { className } = props

    return <div className={`px-6 xl:px-0  ${className}`}>
        {children}
    </div>
}