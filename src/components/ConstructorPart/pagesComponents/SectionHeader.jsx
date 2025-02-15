/* eslint-disable react/prop-types */

function SectionHeader({ data, index, title, subTitle, openSections, toggleSection, deleteSection }) {

    return (
        <h2>  
            <button aria-expanded={openSections} onClick={() => toggleSection(index)}>
              <span>
                <p>
                  {(data[title] && data[subTitle]) ? (
                    `${data[subTitle]} at ${data[title]}`
                  ) : data[subTitle] ? (
                    data[subTitle]
                  ) : data[title] ? (
                    data[title]
                  ) : (
                    '(Not specified)'
                    )} 
                </p>
              
                <p>
                {[
                  data.startDate,
                  data.endDate
                  ].filter(Boolean).join(' - ')}
                </p>
                </span>
              <svg viewBox="0 0 10 10" aria-hidden="true" focusable="false">  
                <rect className="vert" height="8" width="1" y="1" x="4.5"/>
                <rect height="1" width="8" y="4.5" x="1"/>
              </svg>
            </button>
            <button
              className="delete-button" onClick={() => deleteSection(index)}> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>delete-outline</title>
                <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 
                18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
              /></svg>

            </button>

        </h2>
    )
}

export default SectionHeader