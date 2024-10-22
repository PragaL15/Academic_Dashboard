import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function UploadingPage() {
    const [subjects, setSubjects] = useState(0); 
    const [subjectFields, setSubjectFields] = useState([{ 
        department: '', 
        courseCode: '', 
        courseTitle: '', 
        courseType: '', 
        courseNature: '' 
    }]);

    // UseEffect to update fields when the number of subjects changes
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
        <div className="card">
            <div className="mb-4">
                <label className="font-bold block mb-2">
                    Name:
                </label>
                <InputText id="name" className="w-full p-inputtext-lg" />
            </div>

            <div className="mb-4">
                <label htmlFor="department" className="font-bold block mb-2">
                    Department:
                </label>
                <InputText id="department" className="w-full p-inputtext-lg" />
            </div>

            <div className="mb-4">
                <label htmlFor="designation" className="font-bold block mb-2">
                    Designation:
                </label>
                <InputText id="designation" className="w-full p-inputtext-lg" />
            </div>

            <div className="mb-4">
                <label htmlFor="reporting" className="font-bold block mb-2">
                    Reporting to:
                </label>
                <InputText id="reporting" className="w-full p-inputtext-lg" />
            </div>

            <div className="mb-4">
                <label htmlFor="responsibilities" className="font-bold block mb-2">
                    Responsibilities:
                </label>
                <InputText id="responsibilities" className="w-full p-inputtext-lg" />
            </div>

            <div className="mb-4">
                <label htmlFor="academicWorkloadTheory" className="font-bold block mb-2">
                    Academic Workload Theory:
                </label>
                <InputText id="academicWorkloadTheory" keyfilter="int" className="w-full p-inputtext-lg" />
            </div>

            <div className="mb-4">
                <label htmlFor="academicWorkloadLab" className="font-bold block mb-2">
                    Academic Workload Lab:
                </label>
                <InputText id="academicWorkloadLab" keyfilter="int" className="w-full p-inputtext-lg" />
            </div>

            <div className="mb-4">
                <label htmlFor="numSubjects" className="font-bold block mb-2">
                    No of Subjects:
                </label>
                <InputText id="numSubjects" keyfilter="int" value={subjects} onChange={handleSubjectsChange} className="w-full p-inputtext-lg" />
            </div>

            {/* Render the dynamic fields based on number of subjects */}
            {subjectFields.map((subject, index) => (
                <div key={index} className="card mt-4">
                    <h4 className="font-bold mb-2">Subject {index + 1}</h4>

                    <div className="mb-4">
                        <label className="font-bold block mb-2">
                            Subject {index + 1} Department:
                        </label>
                        <InputText className="w-full p-inputtext-lg" value={subject.department} onChange={(e) => handleInputChange(index, 'department', e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="font-bold block mb-2">
                            Subject {index + 1} Course Code:
                        </label>
                        <InputText className="w-full p-inputtext-lg" value={subject.courseCode} onChange={(e) => handleInputChange(index, 'courseCode', e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="font-bold block mb-2">
                            Subject {index + 1} Course Title:
                        </label>
                        <InputText className="w-full p-inputtext-lg" value={subject.courseTitle} onChange={(e) => handleInputChange(index, 'courseTitle', e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="font-bold block mb-2">
                            Subject {index + 1} Course Type:
                        </label>
                        <InputText className="w-full p-inputtext-lg" value={subject.courseType} onChange={(e) => handleInputChange(index, 'courseType', e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="font-bold block mb-2">
                            Subject {index + 1} Course Nature:
                        </label>
                        <InputText className="w-full p-inputtext-lg" value={subject.courseNature} onChange={(e) => handleInputChange(index, 'courseNature', e.target.value)} />
                    </div>
                </div>
            ))}

            <div className="mt-4">
                <Button label="Submit" className="w-full" />
            </div>
        </div>
    );
}
