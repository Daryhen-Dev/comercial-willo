import React from 'react'
import { Input } from '../input'

interface InputLargeProps {
    field: any;
    disabled?: boolean;
    type?: string;
}

export default function InputLarge({ field, disabled, type }: InputLargeProps) {
    return (
        <Input className="h-12 text-lg px-6 rounded-lg" {...field} disabled={disabled} type={type} />
    )
}
