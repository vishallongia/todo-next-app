"use client";
import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";

export default function TodayTaskSlider() {
  const [products, setProducts] = useState([{ value: "aa" }, { value: "aa" }]);
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  //   useEffect(() => {
  //     ProductService.getProductsSmall().then((data) =>
  //       setProducts(data.slice(0, 9))
  //     );
  //   }, []);

  const productTemplate = () => {
    return (
      <>
        <Card title="Simple Card" className="bg-[#0b4f79] text-[snow]">
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          </p>
        </Card>
      </>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={products}
        numScroll={1}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        className=""
        circular={true}
        autoplayInterval={3000}
      />
    </div>
  );
}
