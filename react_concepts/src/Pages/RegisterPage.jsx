import { useState } from "react";

function RegisterPage() {
    const [outputname, inputname] = useState("");
    const [outputphoneno, inputphoneno] = useState("");
    const [outputpassword, inputpassword] = useState("");
    function onClickSubmit(){
        console.log(outputname)
        console.log(outputphoneno)
        console.log(outputpassword)

    }

    return (
        <div>
            <label>Full Name</label>
            <input
                value={outputname}
                onChange={(e) => inputname(e.target.value)}
            />
            <label>Phone no</label>
            <input
                value={outputphoneno}
                onChange={(e) => inputphoneno(e.target.value)}
            />
            <label>password</label>
            <input
                value={outputpassword}
                onChange={(e) => inputpassword(e.target.value)}
            />
            <button id="btnSubmit" onClick={onClickSubmit}>submit</button>
        </div>


    )
}
export default RegisterPage;