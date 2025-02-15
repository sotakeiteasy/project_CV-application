import { useState } from "react";
import Field from "../pagesComponents/Field";
import EditableHeader from "../pagesComponents/EditableHeader";

/* eslint-disable react/prop-types */

function PersonalData({ formData, setTempData, statusSaving, editStatus, header, setHeader }) {
  const [localFormData, setLocalFormData] = useState(formData)

  function handleChange(e) {
    const { name, value } = e.target;    
    setLocalFormData((prev) => {
      const newLocalData = { ...prev, [name]: value };
      return newLocalData;
    })
  }

  function handleChange2(e) {
  const { name, files } = e.target;  // Используем 'files' вместо 'value' для получения файла
  const file = files[0];  // Берём первый файл

  setLocalFormData((prev) => {
    const newLocalData = { ...prev, [name]: file };  // Сохраняем файл в состоянии
    return newLocalData;
  });
}

  function handleBlur() {
    setTempData(prevTemp => ({
        ...prevTemp,
        personal: localFormData,
    }));
  }

  const [openSections, setOpenSections] = useState(
    false
  );

  function toggleSection () {
    setOpenSections(openSections ? false : true)
  }

  return (
    <div className={`block ${editStatus.toLowerCase()}`}>
      <EditableHeader header={header} setHeader={setHeader} statusSaving={statusSaving}/>
      <div className="desctription">
        Tell about yourself, your personal qualities, and your contact information
      </div>   
      <div>
        <div className={'fields-personal open'}>    
          {/* <Field key="position" label="Job Position" name="position" value={localFormData.position || ''} onChange={handleChange} onBlur={handleBlur} /> */}
          {/* <div className="field photo">
            <span className="label-name"> Photo </span>
            <div className="input-container photo">
               <input type="text" id="avatar" name="avatar" accept="image/*" value={localFormData.photo} onChange={handleChange2} onBlur={handleBlur}/>
            </div>
            <div className='border-bottom'></div>
          </div> */}
          {/* <Field key="photo" label="Photo" name="photo" value={localFormData.photo || ''} onChange={handleChange} onBlur={handleBlur}/> */}
          <Field key="firstName" label="First Name" name="firstName" value={localFormData.firstName || ''} onChange={handleChange} onBlur={handleBlur}/>
          <Field key="lastName" label="Last Name" name="lastName" value={localFormData.lastName || ''} onChange={handleChange} onBlur={handleBlur}/>
          <Field key="city" label="City" name="city" value={localFormData.city || ''} onChange={handleChange} onBlur={handleBlur} />
          <Field key="country" label="Country" name="country" value={localFormData.country || ''} onChange={handleChange} onBlur={handleBlur}/>
          <Field key="phone" label="Phone" name="phone" value={localFormData.phone || ''} onChange={handleChange} onBlur={handleBlur}/>
          <Field key="email" label="E-mail" name="email" value={localFormData.email || ''} onChange={handleChange} onBlur={handleBlur}/>
        </div>
        <div className="section personal">  
            <div className={`fields-personal ${openSections ? 'open' : ''}`}>
                <Field key="linkedIn" label="LinkedIn" name="linkedIn" value={localFormData.linkedIn || ''} onChange={handleChange} onBlur={handleBlur}/>
                <Field key="gitHub" label="GitHub" name="gitHub" value={localFormData.gitHub || ''} onChange={handleChange} onBlur={handleBlur}/>
                <Field key="website" label="Your Website" name="website" value={localFormData.website || ''} onChange={handleChange} onBlur={handleBlur}/>
                <Field key="instagram" label="Instagram" name="instagram" value={localFormData.instagram || '' } onChange={handleChange} onBlur={handleBlur}/>
            </div>
        </div>
        <button className='personal-button' aria-expanded={openSections} onClick={() => toggleSection(2)}>
            <span>{`${!openSections ? 'Add more detail' : 'Hide details'}`}</span>
            <svg viewBox="0 0 10 10" aria-hidden="true" focusable="false">  
                <rect className="vert" height="8" width="1" y="1" x="4.5"/>
                <rect height="1" width="8" y="4.5" x="1"/>
            </svg>
        </button> 
      </div>
    </div>
  );
}

export default PersonalData