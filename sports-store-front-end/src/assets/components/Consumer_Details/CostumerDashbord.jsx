import React from "react";
import CustomerDetail_Card from "./CustomerDetail_Card";
import about_user from "../../images/Icons/about_user.png";
import Bycicle from "../../images/Icons/bicycle.png";
import Payment from "../../images/Icons/credit-card-50.png";
import wheel from "../../images/Icons/Cycle-tire.png";
import location from "../../images/Icons/location-50.png";
import orderHistory from "../../images/Icons/Order-History.png";
import SaveForLatter from "../../images/bookmark.png";

const CostumerDashbord = () => {
  return (
    <>
      <div className="flex">
        <div className="mt-[73px] w-96 py-6 px-16 flex-col bg-slate-500 gap-5 text-center hidden lg:flex">
          <div className="">
            <div className="mr-3 my-4">My Account</div>
            <div className="text-3xl font-bold mr-3 my-7">User Name</div>

            <div className="flex flex-col justify-start gap-2">
              <button className="CustomerDetaiCard">
                <img
                  src={about_user}
                  alt=""
                  srcset=""
                  className="w-7 h-7 ml-1"
                />
                <div className="">Profile</div>
              </button>
              <div className="CustomerDetaiCard ">
                <img src={location} alt="" srcset="" className="w-7 h-7 ml-1" />
                <div className="">Address Book</div>
              </div>
              <div className="CustomerDetaiCard">
                <img
                  src={orderHistory}
                  alt=""
                  srcset=""
                  className="w-7 h-7 ml-1"
                />
                <div className="">Order History </div>
              </div>
              <div className="CustomerDetaiCard">
                <img src={Payment} alt="" srcset="" className="w-7 h-7 ml-1" />
                <div className="">Payment Methods </div>
              </div>
              <div className="CustomerDetaiCard">
                <img
                  src={SaveForLatter}
                  alt=""
                  srcset=""
                  className="w-7 h-7 ml-1"
                />
                <div className="">Saved For Later</div>
              </div>
              <div className="CustomerDetaiCard">
                <img src={Bycicle} alt="" srcset="" className="w-7 h-7 ml-1" />
                <div className="">Registered Bikes</div>
              </div>
              <div className="CustomerDetaiCard">
                <img src={wheel} alt="" srcset="" className="w-7 h-7 ml-1" />
                <div className="">Registered Wheels</div>
              </div>
            </div>

            <div className="mr-3 underline">Sign Out</div>
          </div>
        </div>

        <div className="cardcontainer w-full bg-white">
          <div className="bg-white ml-9 grid-col-1 p-12">
            <div className=" mt-28 h-20 text-3xl font-bold">Profile</div>
            <div className="grid md:grid-cols-2 gap-10 grid-cols-1">
              <div className="bg-white rounded-lg shadow-lg min-w-64 shadow-black">
                <div className="flex flex-col items-start justify-start gap-5 p-6">
                  <p className="text-2xl font-bold">Your Info</p>
                  <div>
                    <p className="text-xl font-semibold">Name</p>
                    <p>Gajendra Kaushik</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">Email</p>
                    <p>gajendrakaushik128@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">Phone number</p>
                    <p>9009142069</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">Birthday</p>
                    <p>18/04/2000</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">City</p>
                    <p>Pune Maharashtra</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">Country</p>
                    <p>India</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">Ridjing Styles</p>
                    <p>Mountain, steet</p>
                  </div>
                  <button className="underline hover:text-red-600">
                    <a href="">Edit</a>
                  </button>
                </div>
              </div>
              <div className="bg-white">
                <div className="w-full h-52 bg-white rounded-lg shadow-lg shadow-black p-6">
                  <p className="text-2xl font-bold mb-5">password</p>
                  <div>*******</div>
                  <button className="underline hover:text-red-600">
                    <a href="">Edit</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-stone-100 lg:hidden">
        <div className="w-full mt-28 bg-stone-100">
          <div className=" flex items-center justify-between m-4">
            <p>My Account</p>
            <a href="">Sign Out</a>
          </div>
          <h3 className="text-center font-extrabold text-3xl">CustomerName</h3>

          <div className="flex justify-center items-center mb-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-5  flex-wrap w-full m-11 md:mx-36 md:mt-20 lg:m-10">
              <CustomerDetail_Card Logo={about_user} CardName={"Profile"} />
              <CustomerDetail_Card Logo={location} CardName={"Address Book"} />
              <CustomerDetail_Card
                Logo={orderHistory}
                CardName={"Order History"}
              />
              <CustomerDetail_Card
                Logo={Payment}
                CardName={"Payment Methods"}
              />
              <CustomerDetail_Card
                Logo={SaveForLatter}
                CardName={"Saved For Later"}
              />
              <CustomerDetail_Card
                Logo={Bycicle}
                CardName={"Registered Bikes"}
              />
              <CustomerDetail_Card
                Logo={wheel}
                CardName={"Registered Wheels"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CostumerDashbord;
