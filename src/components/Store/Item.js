"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Rating from "@/src/components/ELements/Rating";

const StoreItem = ({ product }) => {
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const handleProductClick = () => {
    router.push(`/product-details/${product.productId}`);
  };

  return (
    <div
      className="border-[1px] lg:max-w-[300px] min-w-[390px] md:max-w-[294px] xl:max-w-[310px] cursor-pointer hover:border-primary bg-neutral-50 transition-all ease-in-out hover:shadow-sm rounded-lg flex flex-col justify-between"
      onClick={handleProductClick}
    >
      <Image
        width={500}
        height={400}
        className="h-[280px] w-full object-cover rounded-lg"
        src={product.image}
        alt={product.name}
        unoptimized={true}
      />
      <div className="mt-3 flex-grow flex flex-col items-start gap-2 p-3 pb-0">
        <h2 className="tajawal-bold text-lg lg:-mb-1">{product.name}</h2>
      
      </div>
      <div className="flex flex-col   p-3">
        <div className="flex flex-col items-start  gap-2 justify-between">
          <Rating rating={product.rating} />
          <div className="text-gray tajawal-regular text-sm md:text-base flex">
            <h2 className="flex md:text-sm xl:text-[17px]">
              السعر :{" "}
              <span className="text-red-600 mx-2 line-through">
                {product.priceBeforeDiscount}
              </span>{" "}
              {product.priceAfterDiscount} ج
            </h2>
          </div>
        </div>
        <button className="p-2 px-3  transition-all duration-300 border-[1px] tajawal-bold text-base hover:text-white w-full hover:bg-primary cursor-pointer mt-4 text-[11px] text-center rounded-full text-primary border-primary">
          اضف الي السلة
        </button>
      </div>
    </div>
  );
};

export default StoreItem;
