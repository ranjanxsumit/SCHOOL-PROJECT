import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [message, setMessage] = useState('');
  const [imageStatus, setImageStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null); // ✅ New state for Cloudinary image

  const imageWatch = watch('image');
  const handleImagePreview = () => {
    const f = imageWatch?.[0];
    if (f) setPreviewUrl(URL.createObjectURL(f));
    else setPreviewUrl(null);
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    setMessage('');
    setImageStatus('');
    setUploadedUrl(null);

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === 'image' && data[key] && data[key].length > 0) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const res = await fetch('/api/uploadImage', { method: 'POST', body: formData }); // ✅ Updated URL
      const result = await res.json();

      if (res.ok) {
        setMessage(result.message || 'School added successfully.');
        setImageStatus(`Image uploaded to: ${result.imageUrl}`); // ✅ Show Cloudinary URL
        setUploadedUrl(result.imageUrl); // ✅ Store image URL for rendering
        reset();
        setPreviewUrl(null);
      } else {
        setMessage(result.error || 'Something went wrong.');
      }
    } catch (err) {
      setMessage('Error uploading school.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">School Admin</h1>
          <nav className="flex items-center gap-3">
            <Link href="/showSchools" className="text-sm text-blue-600 hover:underline">View Schools</Link>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="bg-white shadow-lg rounded-2xl p-6 space-y-4"
          >
            <h2 className="text-2xl font-bold text-blue-700">Add a New School</h2>

            <div>
              <label className="block text-sm font-medium mb-1">School Name</label>
              <input
                {...register('name', { required: true })}
                placeholder="eg. Green Valley High School"
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                {...register('address', { required: true })}
                placeholder="123, MG Road"
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  {...register('city', { required: true })}
                  placeholder="Mumbai"
                  className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  {...register('state', { required: true })}
                  placeholder="Maharashtra"
                  className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Contact Number</label>
                <input
                  {...register('contact', { required: true, pattern: /^[0-9]+$/ })}
                  placeholder="9876543210"
                  className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.contact && <p className="text-red-500 text-xs mt-1">Valid contact required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  {...register('email_id', {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  placeholder="info@school.com"
                  className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email_id && <p className="text-red-500 text-xs mt-1">Valid email required</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">School Image</label>
              <input
                type="file"
                accept="image/*"
                {...register('image', { required: true })}
                onChange={handleImagePreview}
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.image && <p className="text-red-500 text-xs mt-1">Image is required</p>}
            </div>

            <button
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md font-semibold disabled:opacity-60"
            >
              {submitting ? 'Adding…' : 'Add School'}
            </button>

            {message && <p className="text-center text-green-600 font-semibold">{message}</p>}
            {imageStatus && <p className="text-center text-gray-700">{imageStatus}</p>}
          </form>

          {/* Live preview */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Image Preview</h3>
            <div className="aspect-video w-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Choose an image to preview</span>
              )}
            </div>

            {/* ✅ Show uploaded Cloudinary image */}
            {uploadedUrl && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700">Uploaded Image:</h4>
                <img src={uploadedUrl} alt="Uploaded" className="mt-2 rounded-lg shadow-md" />
              </div>
            )}

            <p className="text-xs text-gray-500 mt-3">
              Tip: Images are now hosted on Cloudinary and rendered from their secure URLs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
