import { useRouter } from "next/router";
import Image from "next/image";

const ImagePage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>Loading...</p>; // Loading state while router is resolving
  }

  // Construct the Google Drive download URL dynamically using the `id`
  const imageUrl = `https://drive.google.com/uc?export=download&id=${id}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Image Viewer</h1>
      <Image
        src={imageUrl}
        alt={`Image with ID: ${id}`}
        width={800}
        height={600}
        className="rounded-lg shadow-lg"
      />
      <p className="mt-4 text-gray-600">Image ID: {id}</p>
    </div>
  );
};

export default ImagePage;
