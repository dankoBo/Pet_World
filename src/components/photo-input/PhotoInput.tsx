import { ChangeEvent, useRef, useState } from 'react';
import './PhotoInput.scss';

type PhotoInputProps = {
    accept?: string;
    onImageSelect: (file: File) => void;
};

const PhotoInput: React.FC<PhotoInputProps> = ({ accept = 'image/*', onImageSelect }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageFile(file);
            onImageSelect(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            setImageFile(file);
            onImageSelect(file);
        }
    };

    return (
        <div className="container">
            <div
                className="dropZone"
                onDragOver={handleDragOver}
                onDrop={handleFileDrop}
                onClick={handleImageUploadClick}
            >
                {imageFile ? (
                    <img src={URL.createObjectURL(imageFile)} alt="Uploaded" className="uploadedImage" />
                ) : (
                    <span>Додайте або перетягніть файл</span>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    style={{ display: 'none' }}
                    onChange={updateImage}
                />
            </div>
        </div>
    );
};

export default PhotoInput;
