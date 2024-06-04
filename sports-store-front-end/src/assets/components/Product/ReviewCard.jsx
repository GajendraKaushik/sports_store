import React from 'react'

const ReviewCard = () => {
  return (
    <div>
            <div className="mt-9 ml-6 mb-9">
            <div className="bg-gray-400 w-[410px] p-7 rounded">
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
          </div>
    </div>
  )
}

export default ReviewCard
