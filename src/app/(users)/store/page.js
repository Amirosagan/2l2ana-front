import React from 'react';
import TextField from '@mui/material/TextField';
import { SearchIcon, ShoppingCartIcon } from 'lucide-react';
import StoreItem from '@/src/components/Store/Item';

function Store() {
  const products = [
    {
      productId: 1,
      image: '/shirt.avif', 
      category: "فئة طبية",
      name: " تي شيرت بقصة عادية ورقبة دائرية للرجال من موباكو، موديل ST100 ",
      description: "وصف المنتج الطبي 1",
      rating: 4.5,
      priceBeforeDiscount: 500,
      priceAfterDiscount: 400,
    },
    {
      productId: 2,
      image: '/shirt.avif',
      category: "فئة طبية",
      name: "منتج طبي 2",
      description: "وصف المنتج الطبي 2",
      rating: 4.0,
      priceBeforeDiscount: 600,
      priceAfterDiscount: 480,
    },
    {
      productId: 3,
      image: '/shirt.avif',
      category: "فئة طبية",
      name: "منتج طبي 3",
      description: "وصف المنتج الطبي 3",
      rating: 3.5,
      priceBeforeDiscount: 700,
      priceAfterDiscount: 560,
    },
    {
      productId: 4,
      image: '/shirt.avif',
      category: "فئة طبية",
      name: "منتج طبي 4",
      description: "وصف المنتج الطبي 4",
      rating: 4.8,
      priceBeforeDiscount: 800,
      priceAfterDiscount: 640,
    },
    {
      productId: 5,
      image: '/shirt.avif',
      category: "فئة طبية",
      name: "منتج طبي 5",
      description: "وصف المنتج الطبي 5",
      rating: 4.2,
      priceBeforeDiscount: 900,
      priceAfterDiscount: 720,
    },
    {
      productId: 6,
      image: '/shirt.avif',
      category: "فئة طبية",
      name: "منتج طبي 6",
      description: "وصف المنتج الطبي 6",
      rating: 3.8,
      priceBeforeDiscount: 1000,
      priceAfterDiscount: 800,
    }
  ];

  return (
    <div className="lg:mx-60 mt-10">
      <div className="flex justify-between  mb-10">
        <TextField
          variant="outlined"
          placeholder="ابحث عن منتج"
          InputProps={{
            endAdornment: <SearchIcon className='mx-3' size={20} />,
          }}
        />
        <ShoppingCartIcon size={32} className="mx-4 text-primary" />

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-7">
        {products.map((product) => (
          <StoreItem key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Store;
