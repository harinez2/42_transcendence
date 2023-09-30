"use client";

import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function AvatarUpload({ onUpdate }: { onUpdate: () => void }) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCropAndSubmit = async () => {
    const imageElement: any = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      if (croppedCanvas) {
        croppedCanvas.toBlob(async (blob: Blob) => {
          const formData = new FormData();
          formData.append("avatar", blob, "cropped.png");

          try {
            const response = await fetch("/api/users/avatar", {
              method: "POST",
              body: formData,
            });

            setError("");
            if (!response.ok) {
              setError(response.statusText);
              return;
            }

            closeModal();
            onUpdate();
            alert("Avatar updated");
          } catch (error) {
            setError(`Error uploading avatar: ${String(error)}`);
          }
        }, "image/png");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setError("");
  };

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
          setError("");
        }}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Upload Avatar
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="max-h-[80%] max-w-[90%] overflow-auto bg-white p-5">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
            />
            {uploadedImage && (
              <>
                <Cropper
                  ref={cropperRef}
                  src={uploadedImage}
                  style={{ height: 400, width: "100%" }}
                  aspectRatio={1}
                  guides={false}
                />
                <button
                  onClick={handleImageCropAndSubmit}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  Send
                </button>
              </>
            )}
            <button
              onClick={closeModal}
              className="ml-4 rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400/50"
            >
              Close
            </button>
            {error && <p className="text-red-600">Error: {error}</p>}
          </div>
        </div>
      )}
    </>
  );
}
