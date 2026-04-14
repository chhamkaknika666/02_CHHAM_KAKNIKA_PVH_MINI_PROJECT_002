"use client";
import React, { useState } from "react";
import { MoreVertical, Pencil, Trash2, Plus, Star } from "lucide-react";

const ManageProductCard = ({ product, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const rating = product.star || product.rating || 4;

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative group hover:shadow-md transition-shadow">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreVertical size={18} className="text-gray-400" />
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-0" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-10">
              <button
                onClick={() => { onEdit(); setShowMenu(false); }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors"
              >
                <Pencil size={14} className="text-gray-400" /> Edit
              </button>
              <button
                onClick={() => { onDelete(); setShowMenu(false); }}
                className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-2 text-sm font-medium text-red-500 border-t border-gray-50 transition-colors"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </>
        )}
      </div>

      <div className="h-44 relative mb-4 flex justify-center items-center bg-[#F9FAFB] rounded-xl overflow-hidden">
        {product.imageUrl || product.image ? (
          <img
            src={product.imageUrl || product.image}
            alt={product.productName || product.name}
            className="object-contain h-36 w-auto"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl">🧴</span>
          </div>
        )}
      </div>

      <div className="space-y-1 px-1 pb-8">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-100 text-gray-100"}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({rating}.0)</span>
        </div>
        <h3 className="font-semibold text-gray-800 text-sm truncate pr-6">
          {product.productName || product.name}
        </h3>
        <p className="font-bold text-lg">${product.price}</p>
        {product.category && (
          <span className="inline-block text-[10px] font-medium bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        )}
      </div>

      <button className="absolute bottom-4 right-4 bg-[#ADFF2F] text-black p-1.5 rounded-lg hover:scale-110 transition-transform shadow-sm">
        <Plus size={16} strokeWidth={3} />
      </button>
    </div>
  );
};

export default ManageProductCard;