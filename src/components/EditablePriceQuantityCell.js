import React, { useState } from "react";
import Select from "react-select";
import axiosInstance from "pages/Utility/axiosInstance";
import { Button } from "reactstrap";

const EditablePriceQuantityCell = ({ product }) => {
  const hasVariants = product?.variants?.length > 0;

  const variantOptions =
    product?.variants?.map((v) => ({
      label: v.title,
      value: v.id,
      price: v.price,
      qty: v.inventoryQuantity,
    })) || [];

  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants
      ? variantOptions[0]
      : { value: product.legacyResourceId, price: product.price, qty: product.inventoryQuantity }
  );
  const [price, setPrice] = useState(selectedVariant?.price || product.price);
  const [qty, setQty] = useState(selectedVariant?.qty || product.inventoryQuantity);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);

      if (hasVariants) {
        await axiosInstance.put(`V1/products/${product.legacyResourceId}/variant/${Number(selectedVariant.value?.replace(/^gid:\/\/shopify\/ProductVariant\//, ""))}/price`, {
          price: Number(price),
        });
        await axiosInstance.put(`V1/products/${product.legacyResourceId}/variant/${Number(selectedVariant.value?.replace(/^gid:\/\/shopify\/ProductVariant\//, ""))}/quantity`, {
          quantity: Number(qty),
        });
      } else {
        await axiosInstance.put(`V1/products/${product.legacyResourceId}/price`, {
          price: Number(price),
        });
        await axiosInstance.put(`V1/products/${product.legacyResourceId}/quantity`, {
          quantity: Number(qty),
        });
      }

      setSaving(false);
      alert("Updated successfully!");
    } catch (err) {
      console.error(err);
      setSaving(false);
      alert("Failed to update");
    }
  };

  return (
    <div style={{ minWidth: "250px" }}>
      {hasVariants && (
        <Select
          options={variantOptions}
          value={selectedVariant}
          onChange={(val) => {
            setSelectedVariant(val);
            setPrice(val.price);
            setQty(val.qty);
          }}
        />
      )}

      <div className="mt-2 d-flex flex-column gap-1">
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <input
          type="number"
          className="form-control"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          placeholder="Quantity"
        />

        <Button color="primary" className="mt-1" disabled={saving} onClick={handleSave}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default EditablePriceQuantityCell;
