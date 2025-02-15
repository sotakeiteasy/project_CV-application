import { useState } from "react";
import "./App.css";

import PersonalData from "./components/ConstructorPart/pages/PersonalData";
import WorkData from "./components/ConstructorPart/pages/WorkData";
import EducationData from "./components/ConstructorPart/pages/EducationData";
import ResumePreview from "./components/PreviewPart/ResumePreview";
import ConstructorPart from "./components/ConstructorPart/ConstructorPart";
import AdditionalData from "./components/ConstructorPart/pages/AdditionalData";

function App() {
  const sections = [
    { key: 'personal', label: 'Personal Details', component: PersonalData },
    { key: 'work', label: 'Work', component: WorkData },
    { key: 'education', label: 'Education', component: EducationData },
    { key: 'additional', label: 'Additional', component: AdditionalData }
  ]

  const [formData, setFormData] = useState({
    personal:
      { position: "", photo: "", firstName: "", lastName: "", email: "", phone: "", city: "", country: "", description: "",
      website: "", linkedIn: "", gitHub: "", twitter: "", instagram: "" },
    education: [{ school: "", degree: "", startDate: "", endDate: "", city: "", description: "" }],
    work: [{ position: "", company: "", startDate: "", endDate: "", city: "", description: "" }],
    additional: { skills: [{ skill: "" }], achievements: [{achievement: ""}]},
  })

  const [headers, setHeaders] = useState(sections.map(section => section.label))

  return (
    <>
      <ConstructorPart
        sections={sections} 
        formData={formData}
        setFormData={setFormData}
        headers={headers}
        setHeaders={setHeaders}
      />
      
      <ResumePreview
        formData={formData}
        headers={headers}
      />
    </>
  );
}

export default App;
