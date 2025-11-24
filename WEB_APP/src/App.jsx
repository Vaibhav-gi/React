import { DataBinding } from "./components/DataBinding";

import { useState, useEffect } from "react";
import moment from "moment";

export function DataBinding(){

const [departure] = useState(new Date());

useEffect(()=>{

},[]);

return(
<div className="container-fluid p-2">
<dl>
<dt>Departure</dt>
<dd>

{moment(departure).format('dddd DD, MMMM YYYY')}</dd>
</dl>
</div>
)
}
