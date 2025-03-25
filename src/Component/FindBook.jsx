import { useState, useEffect } from "react";
import axios, { Axios } from "axios"
function FineBook (){

    const [textInput,setTectInput] = useState("")
    const [dataFormGoogle,setdataFormGoogle] = useState([]);

    useEffect(() => { const timer = setTimeout(() => {getDataGoogle()},600);  // ตั้งเวลาไว้ 500ms
         return () => {clearTimeout(timer)}}, 
        [textInput]);    

    // useEffect(()=>{getDataGoogle()},[textInput])

    async function getDataGoogle (){
        try{
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${textInput}`)
        setdataFormGoogle(response.data.items)
        }catch(error){console.log("Not found")}
    }
    return(
        <div>
            <h1>Find a book</h1>
            <input type="text" value={textInput} onChange={(event)=>setTectInput(event.target.value)} />
            <ul>
                {dataFormGoogle.map((item)=><li>{item.volumeInfo.title}</li>)}
            </ul>
        </div>
    )
}

export default FineBook