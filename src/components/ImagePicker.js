import React, { useState, useEffect } from "react"

const ImagePicker = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
            if (allowedTypes.includes(file.type)) {
                setSelectedFile(file)
            } else {
                setSelectedFile(null)
                alert("Please select a PNG, JPG, or JPEG file.")
            }
        }
    }

    useEffect(() => {
        onFileSelect(selectedFile)
    }, [selectedFile, onFileSelect])

    return (
        <div className="imagePicker">
            <input className="form-control" type="file" accept="image/png,image/jpeg,image/jpg" onChange={handleFileChange} />
            {selectedFile && (
                <div className="selectedImage">
                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" width="200" />
                </div>
            )}
            </div>
    )
}

export default ImagePicker
