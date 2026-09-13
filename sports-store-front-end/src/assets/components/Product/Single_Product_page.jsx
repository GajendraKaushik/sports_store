import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { apiFetch } from "../../../lib/api.js";
import { formatPrice } from "../../../lib/format.js";

const Single_Product_page = () => {
  const navigate = useNavigate();
  const { productSlug } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [toggleTechInfo, setToggleTechInfo] = useState(true);
  const [getSize, setSize] = useState("");
  const [actionMessage, setActionMessage] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);

    apiFetch(`/products/${productSlug}`)
      .then((data) => {
        if (!cancelled) setProduct(data?.product ?? data);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productSlug]);

  const handleChangeSize = (Size) => {
    setSize(Size);
  };

  const handleTechInfoStyle = () => {
    setToggleTechInfo((prevState) => !prevState);
  };

  const handleAddToCart = async () => {
    // I04: real POST /cart/items — merges same size + snapshots price server-side.
    if (!product || !getSize) return;
    setActionMessage(null);
    try {
      await apiFetch("/cart/items", {
        method: "POST",
        body: { productId: product.id, quantity: 1, selectedSize: getSize },
      });
      navigate("/cart");
    } catch (err) {
      if (err.status === 401) {
        navigate("/auth/login", { state: { from: location.pathname } });
        return;
      }
      setActionMessage(err?.message ?? "Could not add to cart.");
    }
  };

  const handleSaveForLater = async () => {
    // I08: Save for Later == wishlist item (separate from cart lines).
    if (!product) return;
    setActionMessage(null);
    try {
      await apiFetch("/account/wishlist/items", {
        method: "POST",
        body: { productId: product.id },
      });
      setActionMessage("Saved for later.");
    } catch (err) {
      if (err.status === 401) {
        navigate("/auth/login", { state: { from: location.pathname } });
        return;
      }
      setActionMessage(err?.message ?? "Could not save for later.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white mt-28">
        <p className="ml-8 mt-6">Loading product…</p>
        <button className="ml-8 mt-4 underline" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    );
  }

  if (loadError || !product) {
    const notFound = loadError?.code === "NOT_FOUND";
    return (
      <div className="bg-white mt-28">
        <p className="ml-8 mt-6">
          {notFound
            ? "Product not found."
            : `Could not load product: ${loadError?.message ?? "Unknown error"}`}
        </p>
        <button className="ml-8 mt-4 underline" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white mt-28">
        <div className="top-button">
          <div className="flex">
            <button className="flex justify-between items-center w-full h-16 px-4">
              <p>{product.title}</p>
              <div className="tex-gray-900 rounded-full">
                <ion-icon name="chevron-down-outline"></ion-icon>
              </div>
              {/* <ion-icon name="chevron-up-outline"></ion-icon> */}
            </button>
          </div>

          <div className="grid grid-cols-3 ">
            <div className="w-full col-span-2">
           <div className="ml-14 ">
              <img src={product.primaryImage ?? product.images?.[0]} alt={product.title} className="w-full h-[750px] rounded-md "/>
              {/* Additional product images can be rendered here from product.images[] */}
           </div>
        
            </div>

            <div className="grid grid-cols-1 p-5 gap-y-3 col-span-1">
              <div className="mb-3">
                <div className="flex flex-col">
                  <h1 className="text-black text-2xl font-bold ">
                    {product.title}
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {" "}
                    {product.stockQuantity > 0
                      ? `In stock: ${product.stockQuantity}`
                      : "Out of stock"}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-start ">
                  <h5 className="text-2xl font-semibold text-black">
                    {formatPrice(product.price, product.currency)}
                  </h5>
                  {product.compareAtPrice ? (
                    <p className="text-sm text-gray-500 line-through">
                      Compare at {formatPrice(product.compareAtPrice, product.currency)}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-start pb-5">
                  {getSize ? `Size : ${getSize}` : "Size a Size"}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {(product.sizes ?? []).map((size) => (
                    <button
                      key={size}
                      onClick={() => handleChangeSize(size)}
                      className={`w-full h-9 text-center border-2 rounded border-gray-400 hover:border-gray-600 ${
                        getSize === size ? "bg-neutral-900 text-white" : "bg-white"
                      }`}
                    >
                      <div>{size}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={!getSize}
                    className={`w-full h-14 rounded-md font-semibold ${
                      getSize
                        ? "bg-neutral-900 text-white hover:bg-stone-400"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                  >
                    Add To Cart
                  </button>
                </div>
                {actionMessage && (
                  <p className="text-sm text-red-600 mb-2">{actionMessage}</p>
                )}
                <div className="mb-2">
                  <button className="bg-white w-full h-14 text-neutral-800 font-medium border-[3px] rounded-md hover:broder-2 hover:border-neutral-900 border-neutral-500 ">
                    Find In-Store
                  </button>
                </div>
              </div>

              <hr className="h-1" />
              <div className="pt-3">
                <div className="flex justify-start gap-3 pb-3">
                  <div className=" text-2xl flex justify-center items-center">
                    <ion-icon name="bag-check-outline"></ion-icon>
                  </div>
                  <span className="text-xl">Express Checkout</span>
                </div>
                <div className="pb-5">
                  By placing an order via Express Checkout, you accept the
                  Specialized{" "}
                  <span className="underline text-neutral-800">
                    {" "}
                    Terms of Use
                  </span>{" "}
                  (updated April 16, 2024) and you acknowledge Specialized will
                  use your information in accordance with its Privacy Policy{" "}
                  <span className="underline text-neutral-800">
                    Privacy Policy
                  </span>
                  .
                </div>

                <div className="grid grid-cols-1 w-full">
                  <button className="bg-white w-full h-14 text-neutral-800 font-medium border-[3px] rounded-md hover:broder-2 hover:border-neutral-900 border-neutral-500 ">
                    Find In-Store
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex justify-between">
                  <button
                    onClick={handleSaveForLater}
                    className="flex justify-start gap-1 pb-3"
                  >
                    <div className="text-2xl flex justify-center items-center ">
                      {" "}
                      <ion-icon name="heart-outline"></ion-icon>
                    </div>
                    <p className="underline decoration-gray-700 underline-offset-1 text-[16px] text-gray-500 font-thin">
                      Save for Later
                    </p>
                  </button>
                  <div>
                    <button className="flex justify-start gap-1 pb-3">
                      <div className="text-2xl flex justify-center items-center">
                        <ion-icon name="star-sharp"></ion-icon>
                      </div>
                      <p className="underline decoration-gray-700 underline-offset-2 text-[16px] text-gray-500 font-thin">
                        Reviews
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="h-1 mx-5" />
          <div className="data-component">
            <section className="technical specification mx-6 relative">
              <div>
                <div className="heading flex justify-between items-center py-3">
                  <span className="text-2xl font-semibold">
                    Technical Specification
                  </span>
                  <div>
                    <div
                      onClick={handleTechInfoStyle}
                      className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center text-2xl font-bold"
                    >
                      <ion-icon
                        name={toggleTechInfo ? "add" : "remove"}
                      ></ion-icon>
                      {/* <ion-icon name="remove"></ion-icon> */}
                    </div>
                  </div>
                </div>
                {/* transform duration-150 ease-in -translate-y-full absolute -z-10 */}
                <div
                  className={
                    toggleTechInfo
                      ? " transform duration-500 ease-in -translate-y-full absolute -z-10 pt-10"
                      : "details pt-10 "
                  }
                >
                  {Object.keys(product.specifications ?? {}).length > 0 ? (
                    <div className="flex">
                      <div className="flex flex-col gap-8">
                        {Object.entries(product.specifications).map(([group, fields]) => (
                          <div key={group}>
                            <div className="detail_desc">
                              <div className="col-1">
                                <h4 className="text-xl font-bold">{group}</h4>
                              </div>
                              <div className="flex flex-col gap-4 col-2">
                                {Object.entries(fields).map(([field, value]) => (
                                  <div key={field}>
                                    <p className="detail_sub_heading">{field}</p>
                                    <p className="detail_sub_desc">{value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <hr className="h-[1.5px] bg-neutral-600" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="pt-2 text-neutral-600">
                      No specifications available for this product yet.
                    </p>
                  )}                  <p className="pt-4 text-neutral-800 mb-8">
                    <span>
                      * Weights based on production painted frames as pictured.
                      Actual weights will vary based on colorway, frame size,
                      and component variation. Specifications are subject to
                      change without notice.
                    </span>
                  </p>
                </div>
              </div>
            </section>
            <hr className="h-1 mx-5" />
            {/* <section className="geometry mx-6 ">
            <div>
            <div className="heading flex justify-between items-center py-3">
                  <span className="text-2xl font-semibold">Geometry</span>
                  <div >
                    <div  className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center text-2xl font-bold">
                      <ion-icon name={true ? "add":"remove"}></ion-icon>

                    </div>
                  </div>
                </div>
              <div></div>
            </div>
            </section> */}
          </div>
        </div>

        <div>
          <div className="flex flex-col ml-6 gap-4 mt-5">
            <h1 className="text-3xl font-medium">Rider Reviews</h1>
            <ul className="flex gap-3 justify-start">
              <li className="text-xl font-[500]">4.4</li>
              <li className="text-xl">
                <ion-icon name="star-sharp"></ion-icon>
                <ion-icon name="star-sharp"></ion-icon>
                <ion-icon name="star-sharp"></ion-icon>
                <ion-icon name="star-sharp"></ion-icon>
                <ion-icon name="star-half-sharp"></ion-icon>
              </li>
              <li className="text-xs mt-1">25 Reviews</li>
            </ul>

            <div className="px-2">
              <div>
                <button className=" bg-neutral-900 text-white font-semibold w-full h-14 rounded-md hover:bg-stone-400">
                  Write a Review
                </button>
              </div>
            </div>
          </div>
          <div className="reviewCard flex flex-row overflow-x-auto mb-5 scroll-m-8 ">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
          {/* <div className="mt-9 ml-6 mb-9">
            <div className="bg-gray-400 full p-7 rounded">
              <div className="flex flex-wrap justify-between mb-3">
                <div className="flex gap-2">
                  <ion-icon name="star-sharp"></ion-icon>
                  <ion-icon name="star-sharp"></ion-icon>
                  <ion-icon name="star-sharp"></ion-icon>
                  <ion-icon name="star-sharp"></ion-icon>
                  <ion-icon name="star-half-sharp"></ion-icon>
                </div>
                <div>03/27/2024</div>
                <h2>Fun, unrestricted, comfortable.</h2>
              </div>
              <div className="mb-5">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Numquam, fugiat eius iusto omnis impedit veniam enim officia
                  quis deleniti inventore.
                </p>
                <button>Read more</button>
              </div>
              <hr className="h-1" />
              <div className="my-3">Name : Mark</div>
              <hr className="h-[2px] bg-gray-700" />
              <div className="flex justify-start gap-2 mt-3">
                <p>Helpful?</p>
                <div>
                  <button className="px-4"><ion-icon name="thumbs-up-outline"></ion-icon> 0</button>
                  <button className="px-4"><ion-icon name="thumbs-down-outline"></ion-icon>0</button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Single_Product_page;
