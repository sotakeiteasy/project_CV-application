import { useState } from "react";
import Field from "../pagesComponents/Field";
import EditableHeader from "../pagesComponents/EditableHeader";
import SectionHeader from "../pagesComponents/sectionHeader";

/* eslint-disable react/prop-types */

function EducationData({ formData, setTempData, statusSaving, editStatus, header, setHeader }) {
  
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
        education: localFormData,
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
    if (localFormData.length > 0 && (!localFormData[localFormData.length-1].school.trim() && !localFormData[localFormData.length-1].degree.trim())) {
      setAlertMessage("You didn't fill the last place of education.");
      return;
    } else {
      setAlertMessage("");
    }

    setLocalFormData((prev) => {
      const newLocalData = [
        ...prev,
        { school: "", degree: "", startDate: "", endDate: "", city: "", description: "" }
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
        List your degrees and academic experience that showcase your qualifications
      </div>
      {localFormData.map((data, index) => (
        <div key={index} className="section">

          <SectionHeader
            data={data}
            index={index}
            title="school"
            subTitle='degree'
            openSections={openSections[index]}
            toggleSection={toggleSection}
            deleteSection={deleteSection}
          />

          <div className={`fields ${openSections[index] ? 'open' : ''}`}>
            <Field key="school" type="input" label="School" name="school" value={data.school} onChange={(e) => handleChange(index, e)} onBlur={handleBlur}/>
            <Field key="degree" type="input"label="Degree" name="degree" value={data.degree} onChange={(e) => handleChange(index, e)} onBlur={handleBlur}/>
            <div className="start-end-dates">
              <Field key="startDate" type="input"label="Start and end date" name="startDate" value={data.startDate} onChange={(e) => handleChange(index, e)} onBlur={handleBlur}/>
              <Field key="endDate" type="input"label="&nbsp;" name="endDate" value={data.endDate} onChange={(e) => handleChange(index, e)}onBlur={handleBlur} />
            </div>
            <Field key="city" type="input" label="City" name="city" value={data.city} onChange={(e) => handleChange(index, e)} onBlur={handleBlur}/>
            <Field key="description" type="textarea" label="Description" name="description" value={data.description} onChange={(e) => handleChange(index, e)}onBlur={handleBlur} />
          </div>
        </div>
      ))}

      <button className="add-section-button" onClick={addSection}>
        Add Education
      </button>
      <div className="alertMessage">
        {alertMessage}
      </div>
    </div>
  );
}

export default EducationData