import React from 'react'

interface TitleProps {
    title: string;
}


export const Title = ({ title }: TitleProps) => {
    return (
        <span className='text-2xl font-bold'>{title}</span>
    )
}
