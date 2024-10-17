import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
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
  const [checkedItems, setCheckedItems] = useState([]); // Track selected checkboxes
  const toast = useRef(null); // Ref for toast notifications

  const staticCustomers = [
    {
      id: 1,
      name: "John Doe",
      academicWorkload: 25,
      academicLab: 10,
      status: "qualified",
      verified: true,
      representative: { name: "Amy Elsner" },
    },
    {
      id: 2,
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "new",
      verified: false,
      representative: { name: "Anna Fali" },
    },
    {
      id: 3,
      name: "Alice Johnson",
      academicWorkload: 15,
      academicLab: 8,
      status: "qualified",
      verified: true,
      representative: { name: "Liza Bean" },
    },
    // Add more customers as needed
  ];

  useEffect(() => {
    setTimeout(() => {
      setCustomers(staticCustomers);
      setLoading(false);
    }, 500);
  }, []);

  const IndividualApp = () =>{
    
  }

  const AppOrRej = () => {
    return (
      <div className="card flex justify-content-center bg-blue-900 text-slate-100 rounded -md text-xs p-2">
        <Button label="Submit" />
      </div>
    );
  };

  const numericFilterTemplate = (value, setValue, placeholder) => {
    return (
      <div className="flex gap-1" style={{ border: "1px solid black" }}>
        <InputNumber
          value={value ? value[0] : null}
          onValueChange={(e) => setValue([e.value, value ? value[1] : null])}
          placeholder={`Min ${placeholder}`}
          min={0}
        />
        <InputNumber
          value={value ? value[1] : null}
          onValueChange={(e) => setValue([value ? value[0] : null, e.value])}
          placeholder={`Max ${placeholder}`}
          min={0}
        />
      </div>
    );
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e, id) => {
    let updatedItems = [...checkedItems];
    if (e.checked) {
      updatedItems.push(id); // Add selected ID
    } else {
      updatedItems = updatedItems.filter((item) => item !== id); // Remove deselected ID
    }
    setCheckedItems(updatedItems);
  };

  // Show confirmation popup
  const handleApprove = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to approve?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        toast.current.show({
          severity: "info",
          summary: "Approved",
          detail: `Items with IDs: ${checkedItems.join(
            ", "
          )} have been approved`,
          life: 3000,
        });
        setCheckedItems([]); // Clear checked items after approval
      },
      reject: () => {
        toast.current.show({
          severity: "warn",
          summary: "Rejected",
          detail: "Approval has been rejected",
          life: 3000,
        });
        setCheckedItems([]);
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
        <Column field="academicWorkload" header="Year" />
        <Column field="academicLab" header="Edit" body={<BorderColorIcon />} />
        <Column
          field="academicLab"
          header="View Subject"
          body={<RemoveRedEyeIcon />}
        />
        <Column
          field="status"
          header="Status"
          body={(rowData) => <Tag value={rowData.status} />}
        />
        <Column
          field="condition"
          header="App/rej"
          body={AppOrRej}
        />
        <Column
          field="approval"
          header="Approval Status"
          body={(rowData) => (
            <Tag
              value={rowData.status}
              style={{
                backgroundColor:
                  rowData.status === "new"
                    ? "red"
                    : rowData.status === "qualified"
                    ? "green"
                    : "gray",
                color: "white",
              }}
            />
          )}
        />
      </DataTable>

      {/* Show Approve button if more than 1 checkbox is selected */}
      {checkedItems.length > 0 && (
        <div className="card flex justify-content-center mt-3">
          <Button onClick={handleApprove} label="Approve" icon="pi pi-check" />
        </div>
      )}

      <Toast ref={toast} />
      <ConfirmPopup />
    </div>
  );
}
