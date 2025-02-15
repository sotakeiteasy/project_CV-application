import { useState } from "react";
import Field from "../pagesComponents/Field";
import EditableHeader from "../pagesComponents/EditableHeader";
import SectionHeader from "../pagesComponents/sectionHeader";

/* eslint-disable react/prop-types */


function AdditionalData({ formData, setTempData, statusSaving, editStatus, header, setHeader }) {
    const [skills, setSkills] = useState(formData.skills);
    const [achievements, setAchievements] = useState(formData.achievements);
  
  const [alertMessage, setAlertMessage] = useState("");
  const [openSkills, setOpenSkills] = useState(skills.map(() => false));
  const [openAchievements, setOpenAchievements] = useState(achievements.map(() => false));

  function handleChange(setter, index, e) {
    setAlertMessage("");
    const { name, value } = e.target;
    setter((prev) => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [name]: value };
      return newData;
    });
  }

  function handleBlur() {
  setTempData((prevTemp) => {
    const updatedData = {
      ...prevTemp,
      additional: {
        skills: [...skills],
        achievements: [...achievements],
      },
    };
    return updatedData;
  });
}

  function deleteEntry(setter, setOpenSetter, indexToDelete, key) {
    setAlertMessage("");
    setter((prev) => {
    const updatedData = prev.filter((_, index) => index !== indexToDelete);
    
    setTempData((prevTemp) => ({
      ...prevTemp,
      additional: {
        ...prevTemp.additional,
        [key]: updatedData,
      },
    }));

    return updatedData;
  });
    // setOpenSetter((prev) => prev.filter((_, index) => index !== indexToDelete));
  }

  function addEntry(setter, setOpenSetter, key) {
    setter((prev) => [...prev, { [key]: "" }]);
    setOpenSetter((prev) => [...prev, true]);
  }

  function toggleSection(setOpenSetter, index) {
    setOpenSetter((prev) => prev.map((isOpen, i) => (i === index ? !isOpen : isOpen)));
  }

  return (
    <div className={`block ${editStatus.toLowerCase()}`}>
      <EditableHeader header={header} setHeader={setHeader} statusSaving={statusSaving} />
      <div className="description">List your skills and achievements that showcase your qualifications</div>
      
      {/* Skills Section */}
        <h3>Skills</h3>
        {skills.map((data, index) => (
          <div key={`skill-${index}`} className="section add">
            <SectionHeader
              data={data}
              index={index}
              title="skill"
              subTitle=""
              openSections={openSkills[index]}
              toggleSection={() => toggleSection(setOpenSkills, index)}
              deleteSection={() => deleteEntry(setSkills, setOpenSkills, index, "skills")}
            />
            <div className={`fields ${openSkills[index] ? "open" : ""}`}>
              <Field
                label="Skill"
                name="skill"
                value={data.skill}
                onChange={(e) => handleChange(setSkills, index, e)}
                onBlur={handleBlur}
              />
            </div>
          </div>
        ))}
        <button className="add-section-button" onClick={() => addEntry(setSkills, setOpenSkills, "skill")}>
          Add Skill
        </button>
      
      {/* Achievements Section */}
        <h3>Achievements</h3>
        {achievements.map((data, index) => (
          <div key={`achievement-${index}`} className="section add">
            <SectionHeader
              data={data}
              index={index}
              title="achievement"
              subTitle=""
              openSections={openAchievements[index]}
              toggleSection={() => toggleSection(setOpenAchievements, index)}
              deleteSection={() => deleteEntry(setAchievements, setOpenAchievements, index, "achievements")}
            />
            <div className={`fields ${openAchievements[index] ? "open" : ""}`}>
              <Field
                label="Achievement"
                name="achievement"
                value={data.achievement}
                onChange={(e) => handleChange(setAchievements, index, e)}
                onBlur={handleBlur}
              />
            </div>
          </div>
        ))}
        <button className="add-section-button" onClick={() => addEntry(setAchievements, setOpenAchievements, "achievement")}>
          Add Achievement
        </button>
      
      <div className="alertMessage">{alertMessage}</div>
    </div>
  );
}

export default AdditionalData;
