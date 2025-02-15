/* eslint-disable react/prop-types */

function Field({ label, type, name, value, onChange, onBlur }) {  
    return (
        
        <div className="field">
        <span className="label-name"> {label} </span>
        <div className="input-container">
            {type === "textarea" ? (
            <textarea 
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            ) : (
            <input 
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            )}
        </div>
        <div className='border-bottom'></div>
        </div>
    );
}

export default Field;

