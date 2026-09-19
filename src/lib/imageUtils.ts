export const convertToWebP = (file: File, quality = 0.85): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Conversion failed"))),
        "image/webp",
        quality
      );
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
