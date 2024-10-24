import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import { Toast } from "primereact/toast";
export default function UploadingPage() {
  const [department, setDepartment] = useState("");
  const [subjects, setSubjects] = useState(1);
  const [subjectFields, setSubjectFields] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showStepper, setShowStepper] = useState(false);
  const stepperRef = useRef(null);
  const toast = useRef(null);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [reportingTo, setReportingTo] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [academicWorkloadTheory, setAcademicWorkloadTheory] = useState("");
  const [academicWorkloadLab, setAcademicWorkloadLab] = useState("");

  const departmentOptions = [
    { label: "Computer Science", value: "cs" },
    { label: "Mechanical Engineering", value: "me" },
    { label: "Electrical Engineering", value: "ee" },
  ];

  const nameOptions = [
    { label: "Praglya", value: "Praglya" },
    { label: "Neli", value: "Neli" },
  ];

  const subjectsOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
  ];

  const courseCodeOptions = [
    { label: "CS101", value: "CS101" },
    { label: "CS102", value: "CS102" },
    { label: "ME201", value: "ME201" },
  ];

  const designationOptions = [{ label: "Mr", value: "Mr" }];
  const courseTitleOptions = [
    { label: "Data Structures", value: "Data Structures" },
    { label: "Thermodynamics", value: "Thermodynamics" },
    { label: "Electrical Circuits", value: "Electrical Circuits" },
  ];

  const ReportingToOptions = [
    { label: "Prof. Praglya", value: "Prof. Praglya" },
  ];
  const courseTypeOptions = [
    { label: "Theory", value: "Theory" },
    { label: "Practical", value: "Practical" },
    { label: "Lab", value: "Lab" },
  ];

  const courseNatureOptions = [
    { label: "Mandatory", value: "Mandatory" },
    { label: "Elective", value: "Elective" },
  ];

  const responsibilitiesOptions = [
    { label: "course Coordinator", value: "Course Coordinator" },
  ];

  const [formdata, setFormData] = useState({
     name: '',
    department: '',
    designation: '',
    reporting_to: '',
    responsibilities: '',
    academic_workload_theory: 0,
    academic_workload_lab: 0,
    no_of_subjects: 0
  })



  useEffect(() => {
    if (subjects > 0) {
      const fields = Array.from({ length: subjects }, () => ({
        department: "",
        courseCode: "",
        courseTitle: "",
        courseType: "",
        courseNature: "",
      }));
      setSubjectFields(fields);
    } else {
      setSubjectFields([]);
    }
  }, [subjects]);

  const handleInputChange = (index, field, value) => {
    const updatedFields = [...subjectFields];
    updatedFields[index][field] = value;
    setSubjectFields(updatedFields);
  };

  const goToStepper = () => {
    if (subjects > 0) {
      setShowStepper(true);
    }
  };

  const exitStepper = () => {
    setShowStepper(false);
    setCurrentStep(0);
  };

  const goNextStep = () => {
    if (currentStep < subjects - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const goPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (
      subjectFields.every(
        (subject) => subject.courseCode && subject.courseTitle
      )
    ) {
      try {
        const formData = {
          name,
          designation,
          department,
          reportingTo,
          responsibilities,
          academicWorkloadTheory,
          academicWorkloadLab,
          subjects: subjectFields,
        };
  
        const response = await axios.post("/user/upload_details", formData); 
  
        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Form submitted successfully!",
            life: 3000,
          });
          console.log("Form Data Sent:", formData);
  
          setShowStepper(false);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to submit the form. Please try again.",
          life: 3000,
        });
      }
    } else {
        toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill all fields",
        life: 3000,
      });
    }
  };
  
  return (
    <div className="p-6 bg-transparent">
      <Toast ref={toast} />
      <h2 className="text-2xl font-bold mb-4">Upload Course Details</h2>

      {!showStepper && (
        <div className="p-6 rounded-lg shadow-lg border-slate-200 bg-white">
          <div className="field mb-4 flex items-center">
            <label className="block text-lg font-medium text-gray-700 mr-4 w-1/3">
              Name:
            </label>
            <Dropdown
              value={name}
              options={nameOptions}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 mt-2 pt-1 pb-1 border rounded static"
              placeholder="Enter faculty name"
            />
          </div>
          <div className="field mb-4 flex items-center">
            <label className="block text-lg font-medium text-gray-700 mr-4 w-1/3">
              Department:
            </label>
            <Dropdown
              value={department}
              options={departmentOptions}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full h-10 mt-2 pt-1 pb-1 border rounded static"
              placeholder="Select department"
            />
          </div>
          <div className="field mb-4 flex items-center">
            <label className="block text-lg font-medium text-gray-700 mr-4 w-1/3">
              Designation:
            </label>
            <Dropdown
              value={designation}
              options={designationOptions}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full h-10 mt-2 pt-1 pb-1 border rounded static"
              placeholder="Enter designation"
            />
          </div>
          <div className="field mb-4 flex items-center">
            <label className="block text-lg font-medium text-gray-700 mr-4 w-1/3">
              Reporting to:
            </label>
            <Dropdown
              value={reportingTo}
              options={ReportingToOptions}
              onChange={(e) => setReportingTo(e.target.value)}
              className="w-full h-10 mt-2 pt-1 pb-1 border rounded static"
              placeholder="Enter reporting officer"
            />
          </div>
          <div className="field mb-4 flex items-center">
            <label className="block text-lg font-medium text-gray-700 mr-4 w-1/3">
              Responsibilities:
            </label>
            <Dropdown
              value={responsibilities}
              options={responsibilitiesOptions}
              onChange={(e) => setResponsibilities(e.target.value)}
              className="w-full h-10 mt-2 pt-1 pb-1 border rounded static"
              placeholder="Enter responsibilities"
            />
          </div>
          <div className="field mb-4 flex items-center">
            <label className="block text-lg font-medium text-gray-700 mr-4 w-1/3">
              Academic Workload Theory:
            </label>
            <InputText
              value={academicWorkloadTheory}
              onChange={(e) => setAcademicWorkloadTheory(e.target.value)}
              className="w-full h-10 mt-2 pt-1 pb-1 border rounded static"
              placeholder="Enter theory workload"
              keyfilter="int"
            />
          </div>

          <div className="field mb-4 flex items-center">
            <label className="block text-lg font-medium text-gray-700 mr-4 w-1/3">
              Academic Workload Lab:
            </label>
            <InputText
              value={academicWorkloadLab}
              onChange={(e) => setAcademicWorkloadLab(e.target.value)}
              className="w-full h-10 mt-2 pt-1 pb-1 border rounded static"
              placeholder="Enter lab workload"
              keyfilter="int"
            />
          </div>

          <div className="field mb-4 flex items-center">
          <label className="block text-lg font-medium text-gray-700 mr-4 w-1/3">
              No of Subjects:
            </label>
            <Dropdown
              value={subjects}
              options={subjectsOptions}
              onChange={(e) => setSubjects(e.value)}
              className="w-full h-10 mt-2 pt-1 pb-1 border rounded static"
              placeholder="Select number of subjects"
            />
          </div>

          <Button
            label="Proceed"
            onClick={goToStepper}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          />
        </div>
      )}
      {showStepper && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 mt-2 mb-2 rounded-lg shadow-lg w-10/12 md:w-3/4 lg:w-1/2">
            <div className="mb-4 flex items-center">
              <FiArrowLeft
                onClick={exitStepper}
                className="text-2xl cursor-pointer mr-2 hover:text-blue-500"
              />
              <h3 className="text-xl font-semibold">Back to Upload Page</h3>
            </div>

            <div key={currentStep} className="mb-6">
              <h3 className="text-xl font-semibold mb-4">
                Subject {currentStep + 1}
              </h3>

              <div className="field mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-4 w-1/3">
                  Subject {currentStep + 1} Department:
                </label>
                <Dropdown
                  value={subjectFields[currentStep]?.department}
                  options={departmentOptions}
                  onChange={(e) =>
                    handleInputChange(currentStep, "department", e.value)
                  }
                  className="w-full h-10 mt-2 pt-1 pb-1 border rounded"
                  placeholder="Select department"
                />
              </div>

              <div className="field mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-4 w-1/3">
                  Subject {currentStep + 1} Course Code:
                </label>
                <Dropdown
                  value={subjectFields[currentStep]?.courseCode}
                  options={courseCodeOptions}
                  onChange={(e) =>
                    handleInputChange(currentStep, "courseCode", e.value)
                  }
                  className="w-full h-10 mt-2 pt-1 pb-1 border rounded"
                  placeholder="Select course code"
                />
              </div>

              <div className="field mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-4 w-1/3">
                  Subject {currentStep + 1} Course Title:
                </label>
                <Dropdown
                  value={subjectFields[currentStep]?.courseTitle}
                  options={courseTitleOptions}
                  onChange={(e) =>
                    handleInputChange(currentStep, "courseTitle", e.value)
                  }
                  className="w-full h-10 mt-2 pt-1 pb-1 border rounded"
                  placeholder="Select course title"
                />
              </div>

              <div className="field mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-4 w-1/3">
                  Subject {currentStep + 1} Course Type:
                </label>
                <Dropdown
                  value={subjectFields[currentStep]?.courseType}
                  options={courseTypeOptions}
                  onChange={(e) =>
                    handleInputChange(currentStep, "courseType", e.value)
                  }
                  className="w-full h-10 mt-2 pt-1 pb-1 border rounded"
                  placeholder="Select course type"
                />
              </div>

              <div className="field mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-4 w-1/3">
                  Subject {currentStep + 1} Course Nature:
                </label>
                <Dropdown
                  value={subjectFields[currentStep]?.courseNature}
                  options={courseNatureOptions}
                  onChange={(e) =>
                    handleInputChange(currentStep, "courseNature", e.value)
                  }
                  className="flex-grow h-10 pt-1 pb-1 border rounded"
                  placeholder="Select course nature"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                label="Previous"
                onClick={goPrevStep}
                disabled={currentStep === 0}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              />

              {currentStep === subjects - 1 ? (
                <Button
                  label="Submit"
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                />
              ) : (
                <Button
                  label="Next"
                  onClick={goNextStep}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
