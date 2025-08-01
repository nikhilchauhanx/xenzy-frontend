"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function NewListingPage() {
  // Get everything from our reliable AuthContext. No need to create a client here.
  const { user, isAuthenticated, supabase } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  // This guard clause is perfect. It now uses the reliable state from the context.
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to create a listing</h2>
          <button 
            onClick={() => router.push('/auth')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size must be less than 5MB');
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only PNG, JPEG, and WebP files are allowed');
        return;
      }
      setSelectedFile(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !formData.name || !formData.price) {
      setError('Please fill in all required fields and select an image.');
      return;
    }

    // Check if the user object and ID are available before proceeding
    if (!user || !user.id) {
        setError('Could not identify user. Please try logging out and back in.');
        return;
    }

    setLoading(true);
    setError('');

    try {
      // The user.id is now guaranteed to be correct from the context
      const filePath = `${user.id}/${Date.now()}_${selectedFile.name}`;

      // The supabase client from the context handles auth automatically
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, selectedFile);

      if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(uploadData.path);
        
      if (!publicUrl) throw new Error("Could not get public URL for the image.");

      // The backend API route will get the user from the cookie, so no token is needed here.
      const response = await fetch('/api/upload-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          description: formData.description,
          imageUrl: publicUrl
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create listing');
      }

      alert('Listing created successfully!');
      router.push('/sell');

    } catch (err) {
      console.error('Error creating listing:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // The form JSX remains the same, it's already well-structured.
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Listing</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter product name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Optional product details" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image *</label>
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} required className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              {selectedFile && <div className="mt-2 text-sm text-green-700">Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</div>}
              <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Formats: PNG, JPEG, WebP.</p>
            </div>
            {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors">{loading ? 'Creating Listing...' : 'Create Listing'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}