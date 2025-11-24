import { useState } from "react";
import { Navbar } from "../../controlled-components/navbar";
import { DataGrid } from "../../controlled-components/data-grid";

export function ComponentDemo(){
    const [products] = useState([
        { Name: 'TV', Price: 45000, Stock: 'Available' },
        { Name: 'Mobile', Price: 13000, Stock: 'Out of Stock' }
    ]);

    const [employees] = useState([
        { FirstName: 'Raj', LastName:'Kiran', Designation:'Developer', Salary: 50000 },
        { FirstName: 'Asha', LastName:'Patel', Designation:'Admin', Salary: 60000 },
        { FirstName: 'Sagar', LastName:'Nair', Designation:'Manager', Salary: 70000 }
    ]);

    return(
        <div className="container-fluid p-2">
            <Navbar orientation='horizontal' brandTitle="Shopper." theme='bg-danger text-white' btnstyle='btn-warning' menuItems={['Home','Electronics','Shop','Offers','Contact']} />
            <Navbar orientation='vertical' brandTitle="Myntra" theme='bg-dark text-white' btnstyle='btn-light w-100' menuItems={['Home','Fashion','Kids']} />

            <hr />

            <DataGrid title="Employee Details" fields={Object.keys(employees[0])} data={employees} />
            <DataGrid title="Product Details" fields={Object.keys(products[0])} data={products} />
        </div>
    )
}
