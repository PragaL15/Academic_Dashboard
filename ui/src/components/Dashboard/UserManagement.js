import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../../styles/checkbox.css";

export default function CustomFilterDemo() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]); 
  const toast = useRef(null); 

  const staticCustomers = [
    {
      id: 1,
      name: "John Doe",
      academicWorkload: 25,
      academicLab: 10,
      status: "Initiated",
      verified: true,
      representative: { name: "Amy Elsner" },
    },
    {
      id: 2,
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "Initiated",
      verified: false,
      representative: { name: "Anna Fali" },
    },
    {
      id: 3,
      name: "Alice Johnson",
      academicWorkload: 15,
      academicLab: 8,
      status: "Initiated",
      verified: true,
      representative: { name: "Liza Bean" },
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setCustomers(staticCustomers);
      setLoading(false);
    }, 500);
  }, []);

  const handleCheckboxChange = (e, id) => {
    let updatedItems = [...checkedItems];
    if (e.checked) {
      updatedItems.push(id);
    } else {
      updatedItems = updatedItems.filter((item) => item !== id);
    }
    setCheckedItems(updatedItems);
  };

  const handleApproval = (event, isApproved) => {
    const message = isApproved ? "Approve" : "Reject";
    confirmPopup({
      target: event.currentTarget,
      message: `Are you sure you want to ${message.toLowerCase()}?`,
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "bg-green-500 text-white p-1 ml-3 hover:none",
      rejectClassName: "bg-red-500 text-white p-1",
      accept: () => {
        toast.current.show({
          severity: "info",
          summary: `${message}d`,
          detail: `Request with IDs: ${checkedItems.join(", ")} have been ${message.toLowerCase()}d`,
          life: 3000,
        });

        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            checkedItems.includes(customer.id)
              ? { ...customer, status: isApproved ? "Approved" : "Rejected" }
              : customer
          )
        );
        setCheckedItems([]); 
      },
      reject: () => {
        toast.current.show({
          severity: "warn",
          summary: "Rejected",
          detail: "Approval has been rejected",
          life: 3000,
        });
      },
    });
  };

  const representativeBodyTemplate = (rowData) => {
    return <span>{rowData.representative.name}</span>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-12">
        <h2>Customers</h2>
        <div className="flex items-center">
          <IconField iconPosition="left" className="search-icon-field">
            <InputIcon className="pi pi-search" />
            <InputText placeholder="Search" className="search-input" />
          </IconField>
          <Button
            icon="pi pi-filter"
            className="p-button-text p-button-rounded ml-2"
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>
      </div>

      <DataTable
        value={customers}
        paginator
        rows={3}
        dataKey="id"
        loading={loading}
        emptyMessage="No customers found."
        className="p-datatable-sm"
        paginatorClassName="custom-paginator"
        style={{
          border: "1px solid #eeeefd",
          marginTop: "10px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Column
          field="id"
          header="Select"
          body={(rowData) => (
            <Checkbox
              inputId={`customCheckbox-${rowData.id}`}
              onChange={(e) => handleCheckboxChange(e, rowData.id)}
              checked={checkedItems.includes(rowData.id)}
              className="custom-checkbox"
            />
          )}
        />
        <Column field="name" header="Name" />
        <Column
          field="representative.name"
          header="Registration Number"
          body={representativeBodyTemplate}
        />
        <Column 
          field="academicWorkload" 
          header="Academic Workload Theory" 
          body={(rowData) => (
            <InputText 
              type="number" 
              value={rowData.academicWorkload} 
              onChange={(e) => {
                const newWorkload = parseInt(e.target.value, 10) || 0;
                setCustomers(prevCustomers =>
                  prevCustomers.map(customer =>
                    customer.id === rowData.id ? { ...customer, academicWorkload: newWorkload } : customer
                  )
                );
              }} 
            />
          )}
        />
        <Column 
          field="academicLab" 
          header="Academic Theory Lab" 
          body={(rowData) => (
            <InputText 
              type="number" 
              value={rowData.academicLab} 
              onChange={(e) => {
                const newLab = parseInt(e.target.value, 10) || 0;
                setCustomers(prevCustomers =>
                  prevCustomers.map(customer =>
                    customer.id === rowData.id ? { ...customer, academicLab: newLab } : customer
                  )
                );
              }} 
            />
          )}
        />
        <Column
          field="approval"
          header="Approval Status"
          body={(rowData) => (
            <Tag
              value={rowData.status}
              style={{
                backgroundColor:
                  rowData.status === "Rejected"
                    ? "red"
                    : rowData.status === "Approved"
                    ? "green"
                    : rowData.status === "Initiated"
                    ? "blue"
                    : "gray",
                color: "white",
              }}
            />
          )}
        />
      </DataTable>

      {checkedItems.length > 0 && (
        <div className="flex justify-content-center mt-3">
          <Button
            onClick={(e) => handleApproval(e, true)} // Approve
            label="Approve"
            className="p-button-success mr-2"
          />
          <Button
            onClick={(e) => handleApproval(e, false)} // Reject
            label="Reject"
            className="p-button-danger"
          />
        </div>
      )}
      <Toast ref={toast} />
      <ConfirmPopup />
    </div>
  );
}
