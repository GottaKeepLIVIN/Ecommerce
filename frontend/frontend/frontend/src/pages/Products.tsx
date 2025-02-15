import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import AddData from '../components/AddData';
import DataTable from '../components/DataTable';
import { useProductContext } from '../contexts/ProductContext';
import { Product } from '../types/product';

const Products = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedProd, setSelectedProd] = React.useState<Product | null>(null);

  const prodCtx = useProductContext()

  useEffect(() => {
    prodCtx.fetchProducts()
  }, [])

  const data = prodCtx.products

  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Product Name',
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 items-center">
            <div className="w-6 xl:w-10 overflow-hidden flex justify-center items-center">
              <img
                src={params.row.img || '/corrugated-box.jpg'}
                alt="product-picture"
                className="object-cover"
              />
            </div>
            <span className="mb-0 pb-0 leading-none">
              {params.row.name}
            </span>
          </div>
        );
      },
    },

    {
      field: 'brand',
      type: 'string',
      headerName: 'BrandID',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'category',
      type: 'string',
      headerName: 'CategoryID',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'price',
      type: 'string',
      headerName: 'Price',
      minWidth: 100,
      flex: 1,
    },

    {
      field: 'offer_price',
      type: 'string',
      headerName: 'Offer Price  ',
      minWidth: 100,
      flex: 1,
    },

    {
      field: 'stock',
      headerName: 'In Stock',
      minWidth: 80,
      type: 'number',
      flex: 1,
    },
    {
      field: 'is_featured',
      headerName: 'Featured',
      minWidth: 80,
      type: 'boolean',
      flex: 1,
    },

  ];


  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between xl:mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Products
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} Products Found
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className={`btn btn-primary`}
          >
            Add New Product +
          </button>
        </div>
        <DataTable
          slug="product"
          columns={columns}
          rows={data}
          includeActionColumn={true}
          onEdit={(obj: object) => {
            setSelectedProd(obj as Product);
            setIsOpen(true);
          }} />


        {isOpen && (
          <AddData
            slug={'product'}
            isOpen={isOpen}
            setIsOpen={(val) => {
              setIsOpen(val);
              setSelectedProd(null)
            }}
            itemData={selectedProd}
          />
        )}
      </div>
    </div >
  );
};

export default Products;
