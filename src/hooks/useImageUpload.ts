import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { useState } from "react";
import { storage } from "../firebase";
import { IImageUploadHook } from "../Interfaces/postsTypes";

const useImageUpload = (): IImageUploadHook => {
  const [selectedImage, setSelectedImage] = useState<null | File>(null);

  const uploadImage = async (
    imageFile: File | null,
    fileName: string,
  ): Promise<string | null> => {
    if (!imageFile) return null;
    const imageRef = ref(storage, `/${fileName}/${imageFile?.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageFile);
      const url = await getDownloadURL(snapshot.ref);
      setSelectedImage(null);
      return url || "";
    } catch (error) {
      return null;
    }
  };
  return { selectedImage, setSelectedImage, uploadImage };
};
export default useImageUpload;
