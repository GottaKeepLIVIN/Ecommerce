import React, { FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useBrandContext } from '../contexts/BrandContext';
import { useCategoryContext } from '../contexts/CategoryContext';
import { useProductContext } from '../contexts/ProductContext';
import { Brand } from '../types/brand';
import { Category } from '../types/category';
import { Product } from '../types/product';

interface AddDataProps {
  slug: string;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  itemData?: object | null
}

const AddData: React.FC<AddDataProps> = ({
  slug,
  isOpen,
  //   columns,
  setIsOpen,
  itemData
}) => {

  const [showModal, setShowModal] = React.useState(false);

  const brandCtx = useBrandContext();
  const prodCtx = useProductContext()
  const catCtx = useCategoryContext();


  const brands = brandCtx.brands
  const categories = catCtx.categories



  // add brand
  const [brandName, setBrandName] = React.useState('');
  const [formBrandIsEmpty, setFormBrandIsEmpty] = React.useState(true);

  // add category
  const [categoryName, setCategoryName] = React.useState('');
  const [formCategoryIsEmpty, setFormCategoryIsEmpty] = React.useState(true);


  // add product
  const [productName, setProductName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [offerPrice, setOfferPrice] = React.useState('');
  const [stock, setStock] = React.useState('');
  const [selectedBrandId, setSelectedBrandId] = React.useState('');
  const [selectedCategoryId, setSelectedCategoryId] = React.useState('');
  const [image, setImage] = React.useState('');
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [formProductIsEmpty, setFormProductIsEmpty] =
    React.useState(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (slug) {
      case 'product':
        if (itemData != null) {
          prodCtx.updateProduct((itemData as Product)._id, {
            name: productName,
            price,
            offer_price: offerPrice,
            stock,
            brand: selectedBrandId,
            category: selectedCategoryId,
            image,
            is_featured: isFeatured,
            description
          })
          toast('Product updated successfully',);
          break;
        }
        prodCtx.addNewProduct({
          name: productName,
          price,
          offer_price: offerPrice,
          stock,
          brand: selectedBrandId,
          category: selectedCategoryId,
          image,
          is_featured: isFeatured,
          description
        })
        toast('product updated successfully',);
        break
      case 'brand':
        if (itemData != null) {
          brandCtx.updateBrand((itemData as Brand)._id, { name: brandName })
          toast('Brand updated successfully',);
          break;
        }
        brandCtx.addNewBrand({ name: brandName })
        toast('Brand added successfully',);
        break
      case 'category':
        if (itemData != null) {
          catCtx.updateCategory((itemData as Category)._id, { name: categoryName })
          toast('Brand updated successfully',);
          break;
        }
        catCtx.addNewCategory({ name: categoryName })
        toast('Category added successfully',);
    }
    setIsOpen(false);
  };
  useEffect(() => {
    if (slug === 'product') {
      brandCtx.fetchBrands()
      catCtx.fetchCategories()
    }
  }, [])


  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    if (slug === 'brand' && itemData != null) {
      setBrandName((itemData as Brand).name);
    }
    if (slug === 'category' && itemData != null) {
      setCategoryName((itemData as Category).name);
    }
    if (slug === 'product' && itemData != null) {
      setProductName((itemData as Product).name);
      setPrice((itemData as Product).price);
      setOfferPrice((itemData as Product).offer_price ?? "");
      setStock((itemData as Product).stock);
      setSelectedBrandId((itemData as Product).brand);
      setSelectedCategoryId((itemData as Product).category);
      setImage((itemData as Product).image ?? "");
      setIsFeatured((itemData as Product).is_featured);
      setDescription((itemData as Product).description ?? "");
    }

  }, [])
  // add brand
  React.useEffect(() => {

    if (brandName === '') {
      setFormBrandIsEmpty(true);
    }

    if (brandName !== '') {
      setFormBrandIsEmpty(false);
    }
  }, [brandName]);

  // add category
  React.useEffect(() => {
    if (categoryName === '') {
      setFormCategoryIsEmpty(true);
    }

    if (categoryName !== '') {
      setFormCategoryIsEmpty(false);
    }
  }, [categoryName]);


  React.useEffect(() => {
    if (
      productName === '' ||
      price === '' ||
      stock === '' ||
      selectedBrandId === '' ||
      selectedCategoryId === '' ||
      image === ''
    ) {
      setFormProductIsEmpty(true);
    }

    if (
      productName !== '' &&
      price !== '' &&
      stock !== '' &&
      selectedBrandId !== '' &&
      selectedCategoryId !== '' &&
      image !== ''
    ) {
      setFormProductIsEmpty(false);
    }
  }, [offerPrice, stock, price, productName, selectedBrandId, selectedCategoryId, isFeatured, image]);


  if (slug === 'product') {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
        <div
          className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${showModal ? 'translate-y-0' : 'translate-y-full'
            }
            ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
            <button
              onClick={() => {
                setShowModal(false);
                setIsOpen(false);
              }}
              className="absolute top-5 right-3 btn btn-ghost btn-circle"
            >
              <HiOutlineXMark className="text-xl font-bold" />
            </button>
            <span className="text-2xl font-bold">Add new {slug}</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Product Name"
              className="input input-bordered w-full"
              defaultValue={productName}
              onChange={(element) => setProductName(element.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
              defaultValue={price}
              onChange={(element) => setPrice(element.target.value)}
            />
            <input
              type="number"
              placeholder="Offer Price"
              className="input input-bordered w-full"
              defaultValue={offerPrice}
              onChange={(element) => setOfferPrice(element.target.value)}
            />
            <label className="form-control w-full">

              <select
                className="select select-bordered"
                defaultValue={selectedBrandId}
                onChange={(element) =>
                  setSelectedBrandId(element.target.value)
                }
              >


                <option value="null" disabled >
                  Select Brand
                </option>
                {brands ? brands.map((brand) => (

                  <option key={brand._id} value={brand._id}>{brand.name}</option>
                )) : ''}
              </select>
            </label>
            <label className="form-control w-full">
              <select
                className="select select-bordered"
                name="categoryId"
                id="category"
                defaultValue={selectedCategoryId}
                onChange={(element) =>
                  setSelectedCategoryId(element.target.value)
                }
              >
                <option value="null" disabled >
                  Select Category
                </option>
                {categories ? categories.map((cat) => (

                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                )) : ""}
                <option value="2">No</option>
              </select>
            </label>
            <input
              type="text"
              placeholder="Image URL"
              className="input input-bordered w-full"
              defaultValue={image}
              onChange={(element) => setImage(element.target.value)}
            />
            <label>
              <div>Featured</div>
              <input
                type="checkbox"
                className="size-5 rounded-lg"
                defaultChecked={isFeatured}
                onChange={(element) => setIsFeatured(element.target.checked)}
              />
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Stock"
              defaultValue={stock}
              onChange={(element) => setStock(element.target.value)}
            />
            <textarea
              placeholder='Description'
              defaultValue={description}
              className='resize-none input input-bordered w-full col-span-full h-[150px]'
              onChange={(element) => setDescription(element.target.value)}
            >

            </textarea>

            <button
              className={`mt-5 btn ${formProductIsEmpty ? 'btn-disabled' : 'btn-primary'
                } btn-block col-span-full font-semibold`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
  if (slug === 'brand') {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
        <div
          className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${showModal ? 'translate-y-0' : 'translate-y-full'
            }
            ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
            <button
              onClick={() => {
                setShowModal(false);
                setIsOpen(false);
              }}
              className="absolute top-5 right-3 btn btn-ghost btn-circle"
            >
              <HiOutlineXMark className="text-xl font-bold" />
            </button>
            <span className="text-2xl font-bold">Add new {slug}</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Brand Name"
              className="input input-bordered w-full"
              defaultValue={brandName}
              onChange={(element) => setBrandName(element.target.value)
              }
            />


            <button
              className={`mt-5 btn ${formBrandIsEmpty ? 'btn-disabled' : 'btn-primary'
                } btn-block col-span-full font-semibold`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
  if (slug === 'category') {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
        <div
          className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${showModal ? 'translate-y-0' : 'translate-y-full'
            }
            ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
            <button
              onClick={() => {
                setShowModal(false);
                setIsOpen(false);
              }}
              className="absolute top-5 right-3 btn btn-ghost btn-circle"
            >
              <HiOutlineXMark className="text-xl font-bold" />
            </button>
            <span className="text-2xl font-bold">Add new {slug}</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Category Name"
              className="input input-bordered w-full"
              defaultValue={categoryName}
              onChange={(element) => setCategoryName(element.target.value)}
            />


            <button
              className={`mt-5 btn ${formCategoryIsEmpty ? 'btn-disabled' : 'btn-primary'
                } btn-block col-span-full font-semibold`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default AddData;
