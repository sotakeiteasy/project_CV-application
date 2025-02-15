import { useState } from "react";

/* eslint-disable react/prop-types */

function EditableHeader({ header, setHeader, statusSaving }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <h1 className="block-header" tabIndex="0">
            {isEditing ? (
                <div className="input-container">
                <input
                    type="text"
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    autoFocus
                    />
                    <div className='border-bottom'></div>
                </div>
                ) : (
                <span>{header}</span>
                )}
            <span>{statusSaving === true ? <span className="saving-message"> saving... </span> : <span></span>}</span>
            <button className="edit-header-button" onClick={() => setIsEditing(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title>
                    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 
                        16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
            </button>
        </h1>
    )
}

export default EditableHeader;
