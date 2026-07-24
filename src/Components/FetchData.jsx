import React, { useState, useRef } from 'react'
import './FetchData.css'
const API_URL = import.meta.env.VITE_API_URL;
const FetchData = () => {
    const url = useRef("");
    const [res, setRes] = useState({});
    console.log(url);
    const handlesend = async (e) => {
        e.preventDefault();
        const originalUrl=url.current.value.trim();
        if(originalUrl=="")
        {
            alert("enter the original url first");
            url.current.focus();
            return;
        }
        const data = {
            "originalUrl": originalUrl
        }
        
        try {
            const response = await fetch(`${API_URL}/api/urls`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            setRes(result);
           
        }
        catch (error) {
            console.log(error);
        }
    }

    


    return (
        <div className='container'>
            <h1>URL Shortener</h1>
            <form onSubmit={handlesend} className='form-1'>
                <input type="url" ref={url} placeholder='enter the originalUrl' required/><br /><br />
                <button type='submit'>get short Url</button>
                {res.shortUrl && (<div className='result'>{res.shortUrl}</div>)}
            </form>
           
          
            


            
        </div>
    )
}

export default FetchData
