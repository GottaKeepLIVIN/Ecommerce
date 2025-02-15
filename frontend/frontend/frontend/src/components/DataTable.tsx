import {
  DataGrid,
  GridColDef,
  //   GridToolbarQuickFilter,
  GridToolbar,
} from '@mui/x-data-grid';
import React from 'react';
import toast from 'react-hot-toast';
import {
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from 'react-icons/hi2';
import { useBrandContext } from '../contexts/BrandContext';
import { useCategoryContext } from '../contexts/CategoryContext';
import { useProductContext } from '../contexts/ProductContext';
import { Brand } from '../types/brand';
import { Category } from '../types/category';
import { Product } from '../types/product';

interface DataTableProps {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  includeActionColumn: boolean;
  onEdit: (obj: object) => void
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  slug,
  includeActionColumn,
  onEdit
}) => {

  const brandCtx = useBrandContext()
  const catCtx = useCategoryContext()
  const prodCtx = useProductContext()

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="flex items-center">
          {/* <div to={`/${props.slug}/${params.row.id}`}> */}
          <button
            onClick={() => {
              // navigate(`/${slug}/${params.row.id}`);
            }}
            className="btn btn-square btn-ghost"
          >
            <HiOutlineEye />
          </button>
          <button
            onClick={() => {
              onEdit(params.row);
            }}
            className="btn btn-square btn-ghost"
          >
            <HiOutlinePencilSquare />
          </button>
          <button
            onClick={() => {
              if (slug === 'brand') {
                const brand = params.row as Brand
                brandCtx.deleteBrand(brand._id)
                toast(`brand ${brand.name} deleted`);
              }
              if (slug === 'category') {
                const cat = params.row as Category
                catCtx.deleteCategory(cat._id)
                toast(`category ${cat.name} deleted`);
              }
              if (slug === 'product') {
                const prod = params.row as Product
                prodCtx.deleteProduct(prod._id)
                toast(`product ${prod.name} deleted`);
              }
            }}
            className="btn btn-square btn-ghost"
          >
            <HiOutlineTrash />
          </button>
        </div>
      );
    },
  };

  if (includeActionColumn === true) {
    return (
      <div className="w-full bg-base-100 text-base-content">
        <DataGrid
          className="dataGrid p-0 xl:p-3 w-full bg-base-100 text-white"
          rows={rows}
          columns={[...columns, actionColumn]}
          getRowHeight={() => 'auto'}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      </div>
    );
  } else {
    return (
      <div className="w-full bg-base-100 text-base-content">
        <DataGrid
          className="dataGrid p-0 xl:p-3 w-full bg-base-100 text-white"
          rows={rows}
          getRowId={(row) => row._id}
          columns={[...columns]}
          getRowHeight={() => 'auto'}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      </div>
    );
  }
};

export default DataTable;
