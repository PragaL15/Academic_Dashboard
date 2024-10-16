// import React, { useState } from "react";
// import { Paginator as PrimePaginator } from 'primereact/paginator'; // Renaming here
// import { Dropdown } from 'primereact/dropdown';

// export default function Pagetable() {
//     const [first, setFirst] = useState([0, 0, 0]);
//     const [rows, setRows] = useState([10, 10, 10]);

//     const onPageChange = (e, index) => {
//         setFirst(first.map((f, i) => (index === i ? e.first : f)));
//         setRows(rows.map((r, i) => (index === i ? e.rows : r)));
//     };

//     const template2 = {
//         layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
//         RowsPerPageDropdown: (options) => {
//             const dropdownOptions = [
//                 { label: 5, value: 5 },
//                 { label: 10, value: 10 },
//                 { label: 20, value: 20 },
//                 { label: 120, value: 120 }
//             ];

//             return (
//                 <React.Fragment>
//                     <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
//                         Items per page:{' '}
//                     </span>
//                     <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
//                 </React.Fragment>
//             );
//         },
//         CurrentPageReport: (options) => {
//             return (
//                 <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
//                     {options.first} - {options.last} of {options.totalRecords}
//                 </span>
//             );
//         }
//     };

//     return (
//         <div className="card">
//             {/* Using renamed PrimePaginator */}
//             <PrimePaginator 
//                 template={template2} 
//                 first={first[1]} 
//                 rows={rows[1]} 
//                 totalRecords={120} 
//                 onPageChange={(e) => onPageChange(e, 1)} 
//                 className="justify-content-end" 
//             />
//         </div>
//     )
// }
