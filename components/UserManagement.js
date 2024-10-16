import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function CustomFilterDemo() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false); // Toggle filter visibility

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
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "new",
      verified: false,
      representative: { name: "Anna Fali" },
    },
    {
      id: 4,
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "new",
      verified: false,
      representative: { name: "Anna Fali" },
    },
    {
      id: 5,
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "new",
      verified: false,
      representative: { name: "Anna Fali" },
    },
    {
      id: 6,
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "new",
      verified: false,
      representative: { name: "Anna Fali" },
    },
    {
      id: 7,
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "new",
      verified: false,
      representative: { name: "Anna Fali" },
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setCustomers(staticCustomers);
      setLoading(false);
    }, 500);
  }, []);

  // Template for numeric filtering
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

  const representativeBodyTemplate = (rowData) => {
    return <span>{rowData.representative.name}</span>;
  };

  const buttonTemplate = () => {
    return (
      <div className="card flex justify-content-center">
        <Button label="Approve"/>
      </div>
    );
  };

  return (
    <div className="card p-4">
      {/* Filter icon on the right side */}
      <div className="flex justify-between items-center">
        <h3>Customers</h3>
        <div className="flex items-center">
          <IconField iconPosition="left" className="search-icon-field">
            <InputIcon className="pi pi-search" />
            <InputText placeholder="Search" className="search-input" />
          </IconField>
          <Button
            icon="pi pi-filter"
            className="p-button-text p-button-rounded ml-2" // Add margin to the left
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>
      </div>

      {/* Conditionally render the filter template when the icon is clicked */}
      {/* {showFilter && (
     
      )} */}

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
             
          borderRadius: "10px 10px 10px 10px", 
          overflow: "hidden"     
        }} >
        <Column
          field="name"
          header="Name"
          style={{ borderBottom: "1px solid #eeeeee", borderTop:"1px solid #eeeeee"}} // Grey border for column
        />
        <Column
          field="representative.name"
          header="Registration Number"
          body={representativeBodyTemplate}
          style={{ borderBottom: "1px solid #eeeeee" }} // Grey border for column
        />
        <Column
          field="academicWorkload"
          header="Year"
          style={{ borderBottom: "1px solid #eeeeee" }} // Grey border for column
        />
        <Column
          field="academicLab"
          header="email"
          style={{ borderBottom: "1px solid #eeeeee" }} // Grey border for column
        />
        <Column
          field="status"
          header="Status"
          body={(rowData) => <Tag value={rowData.status} />}
          style={{ borderBottom: "1px solid #eeeeee" }} // Grey border for column
        />
        <Column
          field="approval"
          header="Approval Status"
          body={buttonTemplate}
          style={{ borderBottom: "1px solid #eeeeee" }} // Grey border for column
        />
      </DataTable>
    </div>
  );
}
