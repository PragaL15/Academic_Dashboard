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
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../../styles/checkbox.css";
import { Dialog } from "primereact/dialog"; // Import Dialog

export default function CustomFilterDemo() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State for selected customer
  const [visible, setVisible] = useState(false); // State for dialog visibility
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
          detail: `Request with IDs: ${checkedItems.join(
            ", "
          )} have been ${message.toLowerCase()}d`,
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

  const openDialog = (customer) => {
    setSelectedCustomer(customer);
    setVisible(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-12">
        <h2>Customers</h2>
        <div className="flex items-center">
          <IconField
            iconPosition="left"
            className="search-icon-field p-3 flex items-center"
          >
            <InputIcon className="pi pi-search" />
            <InputText placeholder="Search" className="search-input p-2" />
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
                setCustomers((prevCustomers) =>
                  prevCustomers.map((customer) =>
                    customer.id === rowData.id
                      ? { ...customer, academicWorkload: newWorkload }
                      : customer
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
                setCustomers((prevCustomers) =>
                  prevCustomers.map((customer) =>
                    customer.id === rowData.id
                      ? { ...customer, academicLab: newLab }
                      : customer
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
        <Column
          header="View"
          body={(rowData) => (
            <Button
              icon={<RemoveRedEyeIcon />}
              onClick={() => openDialog(rowData)}
              className="p-button-text"
            />
          )}
        />
      </DataTable>

      {checkedItems.length > 0 && (
        <div className="flex justify-content-center mt-3">
          <Button
            onClick={(e) => handleApproval(e, true)}
            label="Approve"
            className="p-button-success mr-2 bg-green-800 text-cyan-50 text-s p-2"
          />
          <Button
            onClick={(e) => handleApproval(e, false)}
            label="Reject"
            className="p-button-danger bg-red-600 text-cyan-50 text-s p-2"
          />
        </div>
      )}
      <Dialog
        header="Customer Details"
        visible={visible}
        position="top"
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        {selectedCustomer && (
          <>
            <div className="field flex items-center mb-4">
              <label htmlFor="name" className="w-1/3 text-right mr-2 font-bold">
                Name:
              </label>
              <InputText
                className="flex-grow border-gray-300 rounded-md"
                id="name"
                value={selectedCustomer.name}
                readOnly
              />
            </div>

            <div className="field flex items-center mb-4">
              <label
                htmlFor="academicWorkload"
                className="w-1/3 text-right mr-2 font-bold"
              >
                Academic Workload:
              </label>
              <InputText
                className="flex-grow border-gray-300 rounded-md"
                id="academicWorkload"
                value={selectedCustomer.academicWorkload}
                readOnly
              />
            </div>

            {/* Row for Academic Lab */}
            <div className="field flex items-center mb-4">
              <label
                htmlFor="academicLab"
                className="w-1/3 text-right mr-2 font-bold"
              >
                Academic Lab:
              </label>
              <InputText
                className="flex-grow border-gray-300 rounded-md"
                id="academicLab"
                value={selectedCustomer.academicLab}
                readOnly
              />
            </div>

            {/* Row for Status */}
            <div className="field flex items-center mb-4">
              <label
                htmlFor="status"
                className="w-1/3 text-right mr-1 font-bold"
              >
                Status:
              </label>
              <Tag
                value={selectedCustomer.status}
                style={{
                  backgroundColor:
                    selectedCustomer.status === "Rejected"
                      ? "red"
                      : selectedCustomer.status === "Approved"
                      ? "green"
                      : selectedCustomer.status === "Initiated"
                      ? "blue"
                      : "gray",
                  color: "white",
                  borderRadius: "5px",
                  padding: "0.25rem 0.5rem",
                }}
              />
            </div>
          </>
        )}
      </Dialog>
      <Toast ref={toast} />
      <ConfirmPopup />
    </div>
  );
}
