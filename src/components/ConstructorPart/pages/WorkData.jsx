import { useState } from "react";
import Field from "../pagesComponents/Field";
import EditableHeader from "../pagesComponents/EditableHeader";
import SectionHeader from "../pagesComponents/SectionHeader";

/* eslint-disable react/prop-types */

function WorkData({ formData, setTempData, statusSaving, editStatus, header, setHeader }) {
  
  const [localFormData, setLocalFormData] = useState(formData)
  const [alertMessage, setAlertMessage] = useState("");

  function handleChange(index, e) {
    setAlertMessage("");
    const { name, value } = e.target;
    
    setLocalFormData((prev) => {
      const newLocalData = prev.map((item, i) => i === index ? { ...item, [name]: value } : item);
      return newLocalData
    })
  }

  function handleBlur() {
    setTempData(prevTemp => ({
        ...prevTemp,
        work: localFormData,
    }));
  }

  function deleteSection(indexToDelete) {
    setAlertMessage("");
    setLocalFormData((prev) => {
      const newLocalData = prev.filter((_, index) => index !== indexToDelete);
      return newLocalData
    });

    setOpenSections((prev) => {
      const updatedSections = prev.filter((_, index) => index !== indexToDelete)
      if (updatedSections.length > 0) {
        updatedSections[updatedSections.length - 1] = true;
      }
      return updatedSections
    })
  };

  function addSection() {
    if (localFormData.length > 0 && (!localFormData[localFormData.length-1].position.trim() && !localFormData[localFormData.length-1].company.trim())) {
      setAlertMessage("You didn't fill the last place of education.");
      return;
    } else {
      setAlertMessage("");
    }

    setLocalFormData((prev) => {
      const newLocalData = [
        ...prev,
        { position: "", company: "", startDate: "", endDate: "", city: "", description: "" }
      ];
      return newLocalData
    })

    setOpenSections((prev) => prev.map(() => false).concat(true))
  };

  const [openSections, setOpenSections] = useState(
    localFormData.map(() => false)
  );

  const toggleSection = (index) => {
    setAlertMessage("");
    setOpenSections((prev) => prev.map((isOpen, i) => (i === index ? !isOpen : false)))
  }

  return (
    <div className={`block ${editStatus.toLowerCase()}`}>
      <EditableHeader header={header} setHeader={setHeader} statusSaving={statusSaving}/>
      <div className="desctription">
        Describe your relevant work history and accomplishments that highlight your expertise
      </div>
      {localFormData.map((data, index) => (
        <div key={index} className="section">
          <SectionHeader
            data={data}
            index={index}
            title="company"
            subTitle='position'
            openSections={openSections[index]}
            toggleSection={toggleSection}
            deleteSection={deleteSection}
          />
          <div className={`fields ${openSections[index] ? 'open' : ''}`}>
            <Field key="position" label="Position" name="position" value={data.position} onChange={(e) => handleChange(index, e)} onBlur={handleBlur}/>
            <Field key="company" label="Company" name="company" value={data.company} onChange={(e) => handleChange(index, e)} onBlur={handleBlur}/>
            <div className="start-end-dates">
              <Field key="startDate" label="Start and end date" name="startDate" value={data.startDate} onChange={(e) => handleChange(index, e)} onBlur={handleBlur}/>
              <Field key="endDate" label="&nbsp;" name="endDate" value={data.endDate} onChange={(e) => handleChange(index, e)} onBlur={handleBlur}/>
            </div>
            <Field key="city" label="City" name="city" value={data.city} onChange={(e) => handleChange(index, e)} onBlur={handleBlur}/>
            <Field key="description" label="Description" name="description" value={data.description} onChange={(e) => handleChange(index, e)} onBlur={handleBlur}/>
          </div>
          </div>
      ))}
      <button className="add-section-button" onClick={addSection}>
        Add Work
      </button>
      <div className="alertMessage">
        {alertMessage}
      </div>
    </div>
  );
}

export default WorkData