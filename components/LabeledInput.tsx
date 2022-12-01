import { ChangeEventHandler } from "react"

export default function LabeledInput({
    htmlFor,
    label,
    name,
    placeholder,
    value,
    onChange,
    type = "text",
}: {
    name: string,
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    htmlFor?: string,
    label?: string,
    placeholder?: string,
    type?: string
}) {
    return <label htmlFor={htmlFor ?? name} className="flex flex-col font-headline text-h6 text-yellow  disabled:opacity-50">
        <div className="mb-2">{label ?? name}</div>
        <input
            type={type ?? "text"}
            name={name}
            placeholder={placeholder ?? label ?? name}
            autoComplete={name ?? name}
            value={value}
            onChange={onChange}
            className="font-body text-base p-3 placeholder:text-gray text-purple-dark bg-yellow drop-shadow-lg rounded-xl font-medium disabled:opacity-50" />
    </label>
}