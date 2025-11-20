import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import ConfirmationModal from "components/Modals/ConfirmationModal";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import ProductDataTable from "components/TableContainers/ProductDataTable";  // Custom Product DataTable
import { useNavigate } from "react-router-dom";
// Replace with actual action creators
import { deleteProductRequest, updateProductRequest } from "store/actions";

const ProductTable = ({ products, loading, totalrows }) => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const [selectedSortData, setSelectedSortData] = useState({ value: "created_at", direction: "desc" });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();

  // Columns for the table
  const columns = useMemo(() => [
    {
      header: "Product Name",
      accessorKey: "title",
      cell: ({ row }) => (
        <span style={{ cursor: "pointer", fontWeight: "bolder" }} onClick={() => navigate(`/productDetails/${row.original?._id}`)}>
          {row.original.title}
        </span>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }) => row.original.price || "0.00",
    },
    {
      header: "Vendor",
      accessorKey: "vendor_name",
      cell: ({ row }) => row.original.vendor_name || "N/A",
    },
    {
      header: "Stock",
      accessorKey: "stock",
      cell: ({ row }) => row.original.stock || 0,
    },
    {
      header: "Actions",
      accessorKey: "actions",
      showFilter: false,
      cell: ({ row }) => (
        <div className="actions">
          <Button
            color="primary"
            style={{ marginRight: "5px" }}
            onClick={() => navigate(`/CreateProduct?id=${row.original?.shopifyId}`)}
          >
            <FaRegEdit size={18} />
          </Button>
          <Button
            color="danger"
            onClick={() => handleDelete(row.original?.shopifyId)}
          >
            <MdDelete size={18} />
          </Button>
        </div>
      ),
    },
  ], []);

  // Handle delete confirmation
  const handleDelete = (productId) => {
    setDeleteId(productId);
    setOpenModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProductRequest(deleteId));
    setOpenModal(false);
  };

  return (
    <>
      <ConfirmationModal
        okText="Confirm"
        onCancel={() => setOpenModal(false)}
        onOk={handleConfirmDelete}
        isVisible={openModal}
        title="Delete Product"
        content="Are you sure you want to delete this product?"
      />

      <div className="container-fluid">
        <ProductDataTable
          columns={columns}
          loading={loading}
          data={products || []}
          isGlobalFilter
          isPagination
          selectedSortData={selectedSortData}
          setSelectedSortData={setSelectedSortData}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
          pageSize={pageSize}
          setSearchString={setSearchString}
          searchString={searchString}
          SearchPlaceholder="Search products..."
          pagination="pagination"
          docName="Products"
          totalrows={totalrows}
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
        />
      </div>
    </>
  );
};

export default ProductTable;
