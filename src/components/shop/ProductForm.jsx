"use client";
import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

export default function ProductForm({ onClose, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    category: initialData?.category || "",
    imageUrlUrl: initialData?.imageUrlUrl || "",
    colors: initialData?.colors || [],
    sizes: initialData?.sizes || [],
    description: initialData?.description || ""
  });

  const COLORS = ["green", "gray", "red", "blue", "white"];
  const SIZES = ["s", "m", "l", "xl", "xxl", "xxxl"];

  const toggleItem = (list, item) => 
    list.includes(item) ? list.filter(i => i !== item) : [...list, item];

  const labelText = "text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1.5 ml-1";
  const inputLine = "w-full border-b-2 border-gray-100 py-2 outline-none focus:border-lime-400 transition-colors bg-transparent text-sm placeholder-gray-300";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] p-12 shadow-xl relative animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 p-1"
        >
          <X size={24} />
        </button>

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">
            {initialData ? "Edit product" : "Create product"}
          </h2>
          <p className="text-gray-400 text-sm">
            Demo CRUD only (local state). Refresh resets changes.
          </p>
        </div>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <label className={labelText}>Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Product name"
                className={inputLine}
              />
            </div>

            <div>
              <label className={labelText}>Price ($)</label>
              <input 
                type="text" 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="0.00"
                className={inputLine}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="relative">
              <label className={labelText}>Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={`${inputLine} appearance-none cursor-pointer pr-8 text-gray-700`}
              >
                <option value="">Select category...</option>
                <option value="Skincare">Skincare</option>
                <option value="Hair Care">Hair Care</option>
              </select>
              <ChevronDown size={14} className="absolute right-0 bottom-3 text-gray-400 pointer-events-none" />
            </div>

            <div>
              <label className={labelText}>image URL (optional)</label>
              <input 
                type="text" 
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrlUrl: e.target.value})}
                placeholder="https://..."
                className={inputLine}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className={labelText}>Colors</label>
            <div className="flex flex-wrap gap-2.5">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({...formData, colors: toggleItem(formData.colors, color)})}
                  className={`px-3 py-1.5 rounded-full border text-[11px] font-medium capitalize flex items-center gap-1.5 transition ${
                    formData.colors.includes(color) 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full border border-black/10 ${formData.colors.includes(color) ? 'bg-blue-500' : 'bg-white'}`}/>
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className={labelText}>Sizes</label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setFormData({...formData, sizes: toggleItem(formData.sizes, size)})}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl border text-[11px] font-bold uppercase transition ${
                    formData.sizes.includes(size) 
                      ? 'bg-black text-white border-black' 
                      : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelText}>Description</label>
            <textarea 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Short description..."
              className={`${inputLine} resize-none`}
            />
          </div>

          <div className="flex justify-end gap-4 mt-12 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-2xl font-bold text-sm text-gray-400 hover:text-black transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-10 py-3 rounded-2xl bg-[#ADFF2F] text-black font-bold text-sm hover:bg-[#96E028] transition shadow-lg shadow-lime-200"
            >
              {initialData ? "Save changes" : "Create product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}