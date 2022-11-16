export default function Padding({ children, ...props }) {

    const { className } = props

    return <div className={`p-6 xl:px-0 mb-6 ${className}`}>
        {children}
    </div>
}