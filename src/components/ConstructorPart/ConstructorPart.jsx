  
import { useState } from 'react';
/* eslint-disable react/prop-types */

const ConstructorPart = ({sections, formData, setFormData, headers, setHeaders}) => {
  
  const [tempData, setTempData] = useState(formData)
  const [statusSaving, setStatusSaving] = useState(false)
  const [saveButton, setSaveButton] = useState('Save')
  const [currentSection, setSection] = useState(0);
  const CurrentComponent = sections[currentSection].component

  function nextSection() {
    if (currentSection < sections.length - 1) {
      setSection(prev => prev + 1);
    }
  }

  function previousSection() {
    if (currentSection > 0) {
      setSection(prev => prev - 1);
    }
  } 

  function handleSubmit() {
    setFormData(tempData);
    showSaving();
  }

  function showSaving() {
    setStatusSaving(true)

    setTimeout(() => {
      setStatusSaving(false)
    }, 1000)
  }

  function nameButton() {
    setSaveButton(saveButton == 'Save' ? 'Edit' : 'Save')
  }


  return (
    <div className="constructor-part">
        <CurrentComponent
          formData={tempData[sections[currentSection].key]}
          setTempData={setTempData}
          statusSaving={statusSaving}
          editStatus={saveButton}
          header={headers[currentSection]} 
          setHeader={(newHeader) => {
            const updatedHeaders = [...headers];
            updatedHeaders[currentSection] = newHeader;
            setHeaders(updatedHeaders);
          }}
        />
        <div className="change-block-buttons">
          <button className="save-button" onClick={() => { handleSubmit(); nameButton() }}>
            {saveButton}
          </button>
          <div className="prev-next-buttons">
            <button className="prev-button" onClick={() => { handleSubmit(); previousSection() }}>Back</button>
            <button className="next-button" onClick={() => { handleSubmit(); nextSection() }}>Next</button>
          </div>      
        </div>
      </div>
  );
}

export default ConstructorPart