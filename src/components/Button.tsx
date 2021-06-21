import React from 'react'

type buttonProps = {
    text?: string
    children?: string
}

export function Button(props: buttonProps) {

    return (
        <>
            <button>{props.children || 'default'}</button>
        </>
    )
}