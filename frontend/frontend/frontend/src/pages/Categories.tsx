import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import AddData from "../components/AddData";
import DataTable from "../components/DataTable";
import { useCategoryContext } from "../contexts/CategoryContext";
import { Category } from "../types/category";

const Categories = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);


    const catCtx = useCategoryContext();

    useEffect(() => {
        catCtx.fetchCategories();
    }, []);

    const data = catCtx.categories;

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
                            Categories
                        </h2>
                        {(data && data.length > 0) ? (
                            <span className="text-neutral dark:text-neutral-content font-medium text-base">
                                {data.length} Categories Found
                            </span>
                        ) : ""}
                    </div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`btn btn-primary`}
                    >
                        Add New Category +
                    </button>
                </div>
                <DataTable
                    slug="category"
                    columns={columns}
                    rows={data}
                    includeActionColumn={true}
                    onEdit={(obj: object) => {
                        setSelectedCategory(obj as Category)
                        setIsOpen(true)
                    }} />


                {isOpen && (
                    <AddData
                        slug={'category'}
                        isOpen={isOpen}
                        setIsOpen={(val) => {
                            setIsOpen(val);
                            setSelectedCategory(null)
                        }}
                        itemData={selectedCategory}
                    />
                )}
            </div>
        </div >
    );
}

export default Categories