import React, { useState, useRef } from 'react'
import './FetchData.css'
const API_URL = import.meta.env.VITE_API_URL;
const FetchData = () => {
    const url = useRef("");
    const shortUrlInput=useRef("");
    const [originalUrl,setOriginalUrl]=useState("");
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

    const handleGetOriginalUrl = async (e) => {

    e.preventDefault();

    const shortUrl = shortUrlInput.current.value.trim();

    if (shortUrl === "") {
        alert("Enter the shortened URL first");
        shortUrlInput.current.focus();
        return;
    }

    try {

        const shortCode = shortUrl.split("/").pop();

        const response = await fetch(
            `${API_URL}/api/urls/${shortCode}/original`
        );

        if (!response.ok) {
            throw new Error("Short URL not found");
        }

        const result = await response.text();

        setOriginalUrl(result);

    } catch (error) {

        console.log(error);
        alert("Unable to find the original URL");

    }
};

    


    return (
        <div className='container'>
            <h1>URL Shortener</h1>
            <form onSubmit={handlesend} className='form-1'>
                <input type="url" ref={url} placeholder='enter the originalUrl' required/><br /><br />
                <button type='submit'>get short Url</button>
                {res.shortUrl && (<div className='result'><a href={res.shortUrl} target="_blank" rel="noopener noreferrer">{res.shortUrl}</a></div>)}
            </form>
            <h2 className='originalUrl'>Find Original URL</h2>
            <form onSubmit={handleGetOriginalUrl} className='form-1'>

                

                <input type="url" ref={shortUrlInput}  placeholder="Enter the shortened URL"  required/><br /><br />

                <button type="submit">Get Original URL</button>
                {originalUrl && (<div className="result"> <p>Original URL:</p> <a href={originalUrl} target="_blank"  rel="noopener noreferrer">{originalUrl}</a></div>
                )}

            </form>
           
          
            


            
        </div>
    )
}

export default FetchData
