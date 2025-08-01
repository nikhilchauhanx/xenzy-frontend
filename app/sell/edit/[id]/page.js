"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EditProductPage({ params }) {
  const { user, isAuthenticated, supabase } = useAuth();
  const router = useRouter();
  const { id: productId } = params;

  const [formData, setFormData] = useState({ name: '', price: '', description: '', imageUrl: '' });
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchProduct = useCallback(async () => {
    if (!user || !productId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .eq('user_id', user.id)
        .single();

      if (error) throw new Error("Failed to fetch product or you don't have permission.");
      
      if (data) {
        setFormData({
          name: data.name,
          price: data.price,
          description: data.description || '',
          imageUrl: data.imageUrl,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [productId, user, supabase]);

  useEffect(() => {
    if (isAuthenticated) fetchProduct();
  }, [isAuthenticated, fetchProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setNewImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    let updatedImageUrl = formData.imageUrl;

    try {
      if (newImageFile) {
        const filePath = `${user.id}/${Date.now()}_${newImageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, newImageFile);

        if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        
        updatedImageUrl = publicUrl;
      }

      const response = await fetch(`/api/products/update/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          price: formData.price,
          description: formData.description,
          imageUrl: updatedImageUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "An unknown error occurred." }));
        throw new Error(errorData.error || 'Failed to update product.');
      }

      alert('Product updated successfully!');
      router.push('/sell');

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) return <div className="text-center py-10">Loading product details...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Listing</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className="flex items-center space-x-4">
                {formData.imageUrl && <Image src={formData.imageUrl} alt="Current product image" width={100} height={100} className="rounded-md object-cover" />}
                <div>
                    <p className="text-sm text-gray-500 mb-2">Upload a new image to replace the current one.</p>
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={saving} className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
