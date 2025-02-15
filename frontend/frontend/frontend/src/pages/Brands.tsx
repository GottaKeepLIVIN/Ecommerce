import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import AddData from "../components/AddData";
import DataTable from "../components/DataTable";
import { useBrandContext } from "../contexts/BrandContext";
import { Brand } from "../types/brand";

const Brands = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedBrand, setSelectedBrand] = React.useState<Brand | null>(null);

    const brandCtx = useBrandContext();
    const data = brandCtx.brands;

    useEffect(() => {
        setIsLoading(true);
        brandCtx.fetchBrands();
        setIsLoading(false);
    }, [])


    const columns: GridColDef[] = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            type: 'string',
            headerName: 'Name',
            minWidth: 100,
            flex: 1,
        },
    ];

    return (
        <div className="w-full p-0 m-0">
            <div className="w-full flex flex-col items-stretch gap-3">
                <div className="w-full flex justify-between xl:mb-5">
                    <div className="flex gap-1 justify-start flex-col items-start">
                        <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
                            Brand
                        </h2>
                        {(data && data.length > 0) ? (
                            <span className="text-neutral dark:text-neutral-content font-medium text-base">
                                {data.length} Brands Found
                            </span>
                        ) : ''}
                    </div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'
                            }`}
                    >
                        Add New Brand +
                    </button>
                </div>
                <DataTable
                    slug="brand"
                    columns={columns}
                    rows={data}
                    includeActionColumn={true}
                    onEdit={(brand) => {
                        setSelectedBrand(brand as Brand);
                        setIsOpen(true)
                    }} />

                {isOpen && (
                    <AddData
                        slug='brand'
                        isOpen={isOpen}
                        setIsOpen={(val) => {
                            setIsOpen(val);
                            setSelectedBrand(null)
                        }}
                        itemData={selectedBrand}

                    />
                )}
            </div>
        </div >
    );
}

export default Brands