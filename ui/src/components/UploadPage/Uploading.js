import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import '../../styles/uploadpage.css'

export default function UploadingPage() {
    const [subjects, setSubjects] = useState(0); 
    const [subjectFields, setSubjectFields] = useState([{ 
        department: '', 
        courseCode: '', 
        courseTitle: '', 
        courseType: '', 
        courseNature: '' 
    }]);

    useEffect(() => {
        const fields = [];
        for (let i = 1; i <= subjects; i++) {
            fields.push({
                department: '',
                courseCode: '',
                courseTitle: '',
                courseType: '',
                courseNature: ''
            });
        }
        setSubjectFields(fields);
    }, [subjects]);

    const handleSubjectsChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setSubjects(value);
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedFields = [...subjectFields];
        updatedFields[index][field] = value;
        setSubjectFields(updatedFields);
    };

    return (
        <>
           <h2 className="section-title">Upload Course Details</h2>
         
        <div className="card premium-card">   
            <div className="field">
                <label>Name:</label>
                <InputText id="name" className="inputfield" placeholder="Enter your name" />
            </div>

            <div className="field">
                <label>Department:</label>
                <InputText id="department" className="inputfield" placeholder="Enter department" />
            </div>

            <div className="field">
                <label>Designation:</label>
                <InputText id="designation" className="inputfield" placeholder="Enter designation" />
            </div>

            <div className="field">
                <label>Reporting to:</label>
                <InputText id="reporting" className="inputfield" placeholder="Enter reporting officer" />
            </div>

            <div className="field">
                <label>Responsibilities:</label>
                <InputText id="responsibilities" className="inputfield" placeholder="Enter responsibilities" />
            </div>

            <div className="field">
                <label>Academic Workload Theory:</label>
                <InputText id="academicWorkloadTheory" keyfilter="int" className="inputfield" placeholder="Enter theory workload" />
            </div>

            <div className="field">
                <label>Academic Workload Lab:</label>
                <InputText id="academicWorkloadLab" keyfilter="int" className="inputfield" placeholder="Enter lab workload" />
            </div>

            <div className="field">
                <label>No of Subjects:</label>
                <InputText id="numSubjects" keyfilter="int" value={subjects} onChange={handleSubjectsChange} className="inputfield" />
            </div>

            {subjectFields.map((subject, index) => (
                <div key={index} className="subject-card">
                    <h4>Subject {index + 1}</h4>

                    <div className="field">
                        <label>Subject {index + 1} Department:</label>
                        <InputText value={subject.department} onChange={(e) => handleInputChange(index, 'department', e.target.value)} className="inputfield" />
                    </div>

                    <div className="field">
                        <label>Subject {index + 1} Course Code:</label>
                        <InputText value={subject.courseCode} onChange={(e) => handleInputChange(index, 'courseCode', e.target.value)} className="inputfield" />
                    </div>

                    <div className="field">
                        <label>Subject {index + 1} Course Title:</label>
                        <InputText value={subject.courseTitle} onChange={(e) => handleInputChange(index, 'courseTitle', e.target.value)} className="inputfield" />
                    </div>

                    <div className="field">
                        <label>Subject {index + 1} Course Type:</label>
                        <InputText value={subject.courseType} onChange={(e) => handleInputChange(index, 'courseType', e.target.value)} className="inputfield" />
                    </div>

                    <div className="field">
                        <label>Subject {index + 1} Course Nature:</label>
                        <InputText value={subject.courseNature} onChange={(e) => handleInputChange(index, 'courseNature', e.target.value)} className="inputfield" />
                    </div>
                </div>
            ))}

            <Button label="Submit" className="submit-btn" />
        </div>
        </>
    );
}
