import React, { useState } from "react";

export default function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    };
    const onFileUpload = async () => {
    if (!selectedFile) {
        setMessage("Пожалуйста, выберите файл.");
        return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
            credentials: "include", // если нужны куки и авторизация
        });
        if (response.ok) {
            const text = await response.text();
            setMessage(text);
            setImageUrl(`http://localhost:3000/uploads/${selectedFile.name}`);
        } else {
            setMessage(`Ошибка загрузки файла: ${response.statusText}`);
        }
    } catch (error) {
        setMessage("Произошла ошибка: " + error.message);
    }
    };
    return (
    <div>
        <h2>Загрузить файл</h2>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Загрузить</button>
        {message && <p>{message}</p>}
        {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '20px' }} />}
    </div>
    );
}
