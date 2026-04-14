"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { createProductAction } from "../action/product.action";

export default function ProductForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "", price: "", category: "Skincare", image: "",
    colors: [], sizes: [], description: ""
  });

  const COLORS = ["Green", "Gray", "Red", "Blue", "White"];
  const SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];

  const toggle = (list, item) => list.includes(item) ? list.filter(i => i !== item) : [...list, item];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createProductAction(formData);
    if (res.success) {
      onClose(); 
    } else {
      alert("Error: " + res.error); 
    }
  };

  const labelStyle = "text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block";
  const inputLine = "w-full border-b border-gray-100 py-2 outline-none focus:border-lime-400 transition-colors text-sm placeholder-gray-200";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-12 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400"><X size={24}/></button>
        
        <h2 className="text-3xl font-bold mb-1">Create product</h2>
        <p className="text-gray-400 text-sm mb-10">Demo CRUD only (local state). Refresh resets changes.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <label className={labelStyle}>Name</label>
              <input type="text" className={inputLine} placeholder="Product Name" onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className={labelStyle}>Price ($)</label>
              <input type="number" className={inputLine} placeholder="10" onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="relative">
              <label className={labelStyle}>Category</label>
              <select className={inputLine} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option>Skincare</option>
                <option>Hair Care</option>
              </select>
              <ChevronDown className="absolute right-0 bottom-3 text-gray-300 pointer-events-none" size={16}/>
            </div>
            <div>
              <label className={labelStyle}>Image URL (optional)</label>
              <input type="text" className={inputLine} placeholder="https://..." onChange={e => setFormData({...formData, image: e.target.value})} />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Colors</label>
            <div className="flex gap-3">
              {COLORS.map(c => (
                <button key={c} type="button" onClick={() => setFormData({...formData, colors: toggle(formData.colors, c)})}
                  className={`px-4 py-1.5 rounded-full border text-[11px] font-medium flex items-center gap-2 transition ${formData.colors.includes(c) ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-100 text-gray-400'}`}>
                  <span className={`w-3 h-3 rounded-full border ${formData.colors.includes(c) ? 'bg-blue-500' : 'bg-white'}`}/> {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelStyle}>Sizes</label>
            <div className="flex gap-2">
              {SIZES.map(s => (
                <button key={s} type="button" onClick={() => setFormData({...formData, sizes: toggle(formData.sizes, s)})}
                  className={`w-9 h-9 rounded-xl border font-bold text-[10px] transition ${formData.sizes.includes(s) ? 'bg-black text-white border-black' : 'bg-gray-50 text-gray-300 border-gray-100'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelStyle}>Description</label>
            <textarea className={inputLine} rows="1" placeholder="Write something..." onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-8 py-3 font-bold text-gray-400 text-sm">Cancel</button>
            <button type="submit" className="px-10 py-3 bg-[#ADFF2F] text-black font-bold rounded-2xl text-sm shadow-lg shadow-lime-100 hover:bg-[#96E028]">Create product</button>
          </div>
        </form>
      </div>
    </div>
  );
}