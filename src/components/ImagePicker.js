import React, { useState, useEffect } from "react"

const ImagePicker = ({onFileSelect}) => {
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    useEffect(() => {
        onFileSelect(selectedFile)
    }, [selectedFile, onFileSelect])

    return (
        <div className="imagePicker">
            <input className="form-control" type="file" onChange={handleFileChange} />
            {selectedFile && (
                <div className="selectedImage">
                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" width="200" />
                </div>
            )}
            </div>
    )
}

export default ImagePicker
