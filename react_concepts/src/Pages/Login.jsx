import { useState } from "react";

function Login(){
const [outputphone,inputphone] = useState("");
const [outputpassword,inputpassword] = useState("");
function onClickCheck(){
    console.log(outputphone)
    console.log(outputpassword)
}

    return(
        <div>
            <label>Phoneno</label>
            <input
            value={outputphone}
            onChange={(e) => inputphone(e.target.value)}
            />
            <label>password</label>
            <input
            value={outputpassword}
            onChange={(e)=> inputpassword(e.target.value)}
            />
            <button id="btnCheck" onClick={onClickCheck}>click me</button>
        </div>
    )
}
export default Login;