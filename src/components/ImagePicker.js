import React, { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, "testImage");

const ImagePicker = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    console.log(selectedFile);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    uploadBytes(storageRef, selectedFile).then((snapshot) => {
        console.log("Uploaded a blob or file!");
    });

    return (
        <div>
            <label className="questionInputLabel">Image: </label>
            <input className="form-control" type="file" onChange={handleFileChange} />
            {selectedFile && (
                <div>
                    <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    width="200"
                />
                    </div>
            )}
                </div>
    );
};

export default ImagePicker;
