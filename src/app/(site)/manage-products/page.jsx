"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ManageProductCard from "../../../components/shop/ManageProductCard";
import ProductForm from "../../../components/shop/ProductForm";
import DeleteConfirmModal from "../../../components/shop/DeleteConfirmModal";
import { CheckCircle2, Loader2, PackageSearch } from "lucide-react";
import { getSession } from "next-auth/react";

export default function ManageProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const API_URL = `${process.env.NEXT_PUBLIC_AUTH_API_URL}/products`;

  const showToast = (message = "Operation completed", type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
  };

  const getTokenFromCookies = () => {
  const match = document.cookie.match(/(^| )token=([^;]+)/);
  return match ? match[2] : null;
};

const loadData = async () => {
  setLoading(true);
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const res = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    const data = await res.json();
    const result = data?.payload || data || [];

    const normalized = (Array.isArray(result) ? result : []).map((p) => ({
      ...p,
      id: p.id || p.productId,
      name: p.name || p.productName,
      imageUrl: p.imageUrl || p.image,
    }));

    setProducts(normalized);
  } catch {
    setProducts([]);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (payload) => {
    const isEdit = !!editingProduct;
    const url = isEdit ? `${API_URL}/${editingProduct.id || editingProduct.productId}` : API_URL;

    try {
        const session = await getSession(); 
            const token = session?.user?.accessToken;

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" ,        
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await loadData();
        setIsFormOpen(false);
        setEditingProduct(null);
        showToast(isEdit ? "Product updated successfully!" : "Product created successfully!");
      } else {
        showToast("Something went wrong. Please try again.", "error");
      }
    } catch {
      showToast("Network error. Please try again.", "error");
    }
  };

  const handleDelete = async () => {
    const product = deleteModal.product;
    try {
      const session = await getSession(); 
            const token = session?.user?.accessToken;
      await fetch(`${API_URL}/${product.id || product.productId}`, { method: "DELETE" ,
        headers: { "Content-Type": "application/json" ,        
          Authorization: `Bearer ${token}`
        },});
      await loadData();
      setDeleteModal({ isOpen: false, product: null });
      showToast("Product deleted successfully!");
      router.push("/products");
    } catch {
      showToast("Failed to delete. Please try again.", "error");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const nameA = a.name || a.productName || "";
    const nameB = b.name || b.productName || "";
    return sortOrder === "A-Z"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">

      {toast.visible && (
        <div
          className={`fixed top-8 right-8 px-5 py-4 rounded-2xl flex items-center gap-3 z-[300] shadow-2xl transition-all duration-300 ${
            toast.type === "error"
              ? "bg-red-600 text-white"
              : "bg-gray-900 text-white"
          }`}
        >
          <div
            className={`p-1 rounded-full ${
              toast.type === "error" ? "bg-red-400" : "bg-[#ADFF2F]"
            } text-black`}
          >
            <CheckCircle2 size={15} strokeWidth={3} />
          </div>
          <div className="pr-2">
            <p className="font-bold text-sm">{toast.type === "error" ? "Error" : "Success"}</p>
            <p className="text-xs opacity-75">{toast.message}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-400 text-sm mt-1">
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
            <span className="text-xs text-gray-400 font-semibold">Sort</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border-none bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer"
            >
              <option value="A-Z">A → Z</option>
              <option value="Z-A">Z → A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Products</h2>
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="bg-[#ADFF2F] hover:bg-[#9ce624] active:scale-95 text-black px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-md shadow-lime-100"
          >
            + Create product
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-[#ADFF2F]" size={40} />
            <p className="text-gray-400 text-sm font-medium">Loading products...</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <PackageSearch size={48} className="text-gray-200" />
            <p className="text-gray-400 font-medium">No products found</p>
            <button
              onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}
              className="text-sm font-bold text-[#ADFF2F] underline underline-offset-4 hover:opacity-80"
            >
              Add your first product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((p) => (
              <ManageProductCard
                key={p.id || p.productId}
                product={p}
                onEdit={() => {
                  setEditingProduct(p);
                  setIsFormOpen(true);
                }}
                onDelete={() => setDeleteModal({ isOpen: true, product: p })}
              />
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <ProductForm
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={handleSave}
          initialData={editingProduct}
        />
      )}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        productName={deleteModal.product?.name || deleteModal.product?.productName}
        onCancel={() => setDeleteModal({ isOpen: false, product: null })}
        onConfirm={handleDelete}
      />
    </div>
  );
}