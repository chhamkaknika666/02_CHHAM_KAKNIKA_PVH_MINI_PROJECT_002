"use client";
import React from "react";
import { Trash2, X } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, productName, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        <button
          onClick={onCancel}
          className="absolute top-6 right-6 text-gray-300 hover:text-gray-500 p-1 hover:bg-gray-100 rounded-full transition-all"
        >
          <X size={18} />
        </button>

        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
          <Trash2 size={26} className="text-red-500" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Product</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">&quot;{productName}&quot;</span>?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl border border-gray-200 font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all shadow-lg shadow-red-100 active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}