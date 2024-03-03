import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import React from "react";

type Props = {
    id: string
    title: string
}

export const TodolistTitle = ({id, title}: Props) => {
    return <>
        <h3 style={{textAlign: 'center', color: 'white'}}>
            <EditableSpan title={title}
                          id={id}/>
        </h3>
    </>
}