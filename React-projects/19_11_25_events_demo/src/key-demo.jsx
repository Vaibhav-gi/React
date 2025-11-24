import axios from "axios";
import { useEffect, useState } from "react";

export function KeyDemo(){
  const [users, setUsers] = useState([{user_name:null}]);
  const [msg, setMsg] = useState('');
  const [errorClass, setErrorClass] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [progressClass, setProgressClass] = useState('');
  const [progressWidth, setProgressWidth] = useState('');
  const [ifsc, setIfsc] = useState('');

  useEffect(()=>{
    axios.get('/users.json')
      .then(response=> setUsers(response.data))
      .catch(err => console.error('users.json load error', err));
  },[])

  function VerifyUserName(e){
    const val = e.target.value;
    let taken = false;
    for(const user of users){
      if(user.user_name === val){
        setMsg('User Name Taken - Try Another');
        setErrorClass('text-danger');
        taken = true;
        break;
      }
    }
    if(!taken){
      setMsg('User Name Available');
      setErrorClass('text-success');
    }
  }

  function VerifyPassword(e){
    const v = e.target.value;
    if(v.match(/(?=.*[A-Z])\w{4,10}/)){
      setPwdMsg('Strong Password');
      setProgressClass('progress-bar bg-success progress-bar-striped progress-bar-animated');
      setProgressWidth('100%');
    } else {
      if(v.length < 4){
        setPwdMsg('Poor Password');
        setProgressClass('progress-bar bg-danger progress-bar-striped progress-bar-animated');
        setProgressWidth('40%');
      } else {
        setPwdMsg('Weak Password');
        setProgressClass('progress-bar bg-warning progress-bar-striped progress-bar-animated');
        setProgressWidth('70%');
      }
    }
  }

  function handleIfscChange(e){ setIfsc(e.target.value); }
  function ChangeCase(e){ setIfsc(e.target.value.toUpperCase()); }

  return(
    <div className="container-fluid">
      <h3>Register</h3>
      <dl className="mt-3 w-25">
        <dt>User Name</dt>
        <dd><input type="text" className="form-control" onKeyUp={VerifyUserName} /></dd>
        <dd className={errorClass}>{msg}</dd>

        <dt>Password</dt>
        <dd><input type="password" className="form-control" onKeyUp={VerifyPassword} /></dd>
        <dd>
          <div className="progress">
            <div style={{width:progressWidth}} className={progressClass}>
              {pwdMsg}
            </div>
          </div>
        </dd>

        <dt>Bank IFSC</dt>
        <dd>
          <input type="text" value={ifsc} onChange={handleIfscChange} onBlur={ChangeCase} className="form-control" />
        </dd>
      </dl>
    </div>
  )
}
