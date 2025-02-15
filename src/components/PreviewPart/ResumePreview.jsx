/* eslint-disable react/prop-types */

import styles from './ResumePreview.module.css';
import { useState } from 'react';

function ResumePreview({ formData, headers }) {
  
  const testData = {
      personal: {
          position: "Software Engineer",
          photo: "https://i.imgur.com/1jD1b1b.png",
          firstName: "Emily",
          lastName: "Clark",
          email: "emily.clark@example.com",
          phone: "987654321",
          city: "San Francisco",
          country: "USA",
          description: "A passionate software engineer with 5 years of experience in full-stack development.",
          website: "https://www.emilyclark.dev",
          linkedIn: "https://www.linkedin.com/in/emilyclark",
          gitHub: "https://www.github.com/emilyclark",
          twitter: "https://www.twitter.com/emilydev",
          instagram: "https://www.instagram.com/emilytech"
      },
      education: [
          {
              school: "University of California, Berkeley",
              degree: "Bachelor of Science in Computer Science",
              startDate: "2012",
              endDate: "2016",
              city: "Berkeley",
              description: "Focused on algorithms, data structures, and machine learning."
          },
          {
              school: "Stanford University",
              degree: "Master of Science in Software Engineering",
              startDate: "2016",
              endDate: "2018",
              city: "Stanford",
              description: "Specialized in cloud computing and scalable systems."
          }
      ],
      work: [
          {
              position: "Software Engineer",
              company: "Stripe",
              startDate: "2018",
              endDate: "2022",
              city: "San Francisco",
              description: "Built and maintained payment systems for thousands of businesses globally, with a focus on API development."
          },
          {
              position: "Senior Software Engineer",
              company: "Netflix",
              startDate: "2022",
              endDate: "Present",
              city: "Los Gatos",
              description: "Working on enhancing the recommendation algorithm and backend systems to improve user experience."
          }
      ],
      additional: {
          skills: [
              { skill: "JavaScript (ES6+)" },
              { skill: "React" },
              { skill: "Node.js" },
              { skill: "Python" },
              { skill: "AWS (Amazon Web Services)" },
              { skill: "Docker & Kubernetes" },
              { skill: "GraphQL" },
              { skill: "SQL & NoSQL Databases" },
              { skill: "Agile Methodologies" },
              { skill: "Machine Learning (basic)" }
          ],
          achievements: [
              { achievement: "Built a payment gateway that processes over $10 million per day at Stripe." },
              { achievement: "Led a project at Netflix that improved recommendation algorithm accuracy by 15%." },
              { achievement: "Awarded 'Employee of the Year' at Stripe in 2020 for outstanding contributions." },
              { achievement: "Contributed to an open-source machine learning library used by over 500 developers." },
              { achievement: "Speaks at tech conferences on cloud computing and microservices." }
          ]
      }
  }

  const [useTestData, setUseTestData] = useState(false);

  const fillWithTestData = () => setUseTestData(true);
  const clearFormData = () => setUseTestData(false);

  const dataToShow = useTestData ? testData : formData;
console.log(dataToShow)
return (
  <div className={styles.previewPart}>
    <div className="buttons">
      <button className={styles.button} onClick={fillWithTestData}>Show preview with test data</button>
      <button className={styles.button} onClick={clearFormData}>Back to your data</button>
    </div>
    <div className={styles.resumePreview}>
      <div className={styles.previewPersonal}>
        <h1 className={styles.headerName}>{(dataToShow.personal.firstName || '') + " " + (dataToShow.personal.lastName || '')}</h1>
        <h2 className={styles.headerPosition}>{dataToShow.personal.position}</h2>
        {/* <div className={styles.photo}>{dataToShow.personal.avatar}</div> */}
        <div className={styles.location}>
          {dataToShow.personal.country && dataToShow.personal.country}
          {dataToShow.personal.country && dataToShow.personal.city && ', '}
          {dataToShow.personal.city && dataToShow.personal.city}
        </div>
        <div className={styles.contacts}>
          {dataToShow.personal.phone && dataToShow.personal.phone}
          {dataToShow.personal.email && dataToShow.personal.phone && ', '}
          {dataToShow.personal.email && dataToShow.personal.email}
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <div>
            <div>{dataToShow.personal.website}</div>
            <div>{dataToShow.personal.linkedIn}</div>
            <div>{dataToShow.personal.gitHub}</div>
            <div>{dataToShow.personal.instagram}</div>
          </div>
          <div className={styles.skills}>
            {dataToShow.additional.skills.length > 0 ? (
              <>
                <h2 className={styles.headerWork}>
                  {Object.values(dataToShow.additional.skills[dataToShow.additional.skills.length - 1]).some(value => value !== '') ? 'Skills' : ''}
                </h2>
                {dataToShow.additional.skills.map((skills, index) => (
                  <div key={index}>{skills.skill}</div>
                ))}
              </>
            ) : null}
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.previewWork}>
            {dataToShow.personal.description}
          </div>
          <div className={styles.previewWork}>
            {dataToShow.work.length > 0 ? (
              <>
                <h2 className={styles.headerWork}>
                  {Object.values(dataToShow.work[dataToShow.work.length - 1]).some(value => value !== '') ? headers[1] : ''}
                </h2>
                {dataToShow.work.map((work, index) => (
                  <div className={styles.workExperience} key={index}>
                    <h3 className={styles.workPosition}>
                      {[work.position, work.company, work.city].filter(Boolean).join(', ')}
                    </h3>
                    <div className={styles.workDate}>
                      {[work.startDate, work.endDate].filter(Boolean).join(' - ')}
                    </div>
                    <div className={styles.workDesc}>{work.description}</div>
                  </div>
                ))}
              </>
            ) : null}
          </div>

          <div className={styles.previewEducation}>
            {dataToShow.education.length > 0 ? (
              <>
                <h2 className={styles.headerEducation}>
                  {Object.values(dataToShow.education[dataToShow.education.length - 1]).some(value => value.trim() !== '') ? headers[2] : ''}
                </h2>
                {dataToShow.education.map((data, index) => (
                  <div className={styles.educationExperience} key={index}>
                    <h3 className={styles.school}>
                      {[data.school, data.degree, data.city].filter(Boolean).join(", ")}
                    </h3>
                    <div className={styles.schoolDate}>
                      {[data.startDate, data.endDate].filter(Boolean).join(' - ')}
                    </div>
                    <div className={styles.schoolDesc}>
                      {data.description}
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </div>
          <div className={styles.previewAdditional}>
            {dataToShow.additional.achievements.length > 0 ? (
              <>
                <h2 className={styles.headerWork}>
                  {Object.values(dataToShow.additional.achievements[dataToShow.additional.achievements.length - 1]).some(value => value !== '') ? headers[3] : ''}
                </h2>
                {dataToShow.additional.achievements.map((achievements, index) => (
                  <div key={index}>{achievements.achievement}</div>
                ))}
              </>
            ) : null}
          </div>

        </div>

      </div>
    </div>
  </div>
);

}

export default ResumePreview