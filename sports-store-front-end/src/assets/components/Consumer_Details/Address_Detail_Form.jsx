// I07: address create/edit form. Reads `initial` (null = create), saves via
// the parent's onSave(payload) which POSTs or PATCHes /account/addresses.
// Layout kept from the original drawer; field names now match the backend.
import React, { useState } from "react";

const FIELD_CLS =
  "input-field h-[50px] w-full p-3 rounded-md border-slate-400 border-2";

const Address_Detail_Form = ({ initial, onSave, onClose }) => {
  const [type, setType] = useState(initial?.type ?? "shipping");
  const [fullName, setFullName] = useState(initial?.fullName ?? "");
  const [line1, setLine1] = useState(initial?.line1 ?? "");
  const [line2, setLine2] = useState(initial?.line2 ?? "");
  const [city, setCity] = useState(initial?.city ?? "");
  const [state, setState] = useState(initial?.state ?? "");
  const [postalCode, setPostalCode] = useState(initial?.postalCode ?? "");
  const [country, setCountry] = useState(initial?.country ?? "USA");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [isDefault, setIsDefault] = useState(initial?.isDefault ?? false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const canSave = fullName.trim() !== "" && line1.trim() !== "" && city.trim() !== "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSave || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await onSave({
        type,
        fullName: fullName.trim(),
        line1: line1.trim(),
        line2: line2.trim(),
        city: city.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
        phone: phone.trim(),
        isDefault,
      });
    } catch (err) {
      setError(err?.message ?? "Could not save address.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full fixed z-1010 opacity-100">
      <div className="fixed p-2 overflow-hidden w-full md:w-[555px] h-full">
        <div className="flex justify-end">
          <div className=" p-4 flex w-auto flex-nowrap justify-end">
            <div className="bg-gray-300 flex justify-center items-center w-12 h-12 rounded relative">
              <div>
                <div
                  onClick={onClose}
                  className="flex justify-center items-center text-3xl"
                >
                  <ion-icon name="close-outline"></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 h-full overflow-y-scroll scroll-smooth flex flex-col">
          <div className="mb-20 mr-8">
            <h3 className="text-3xl font-bold pb-10">
              {initial ? "Edit Address" : "Add Address"}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="p-3 pb-4 relative  flex flex-col gap-4 "
            >
              <div className="pb-4">
                <div className="flex w-full justify-start items-center gap-2 mb-2 ">
                  <input
                    type="checkbox"
                    checked={type === "shipping"}
                    onChange={() => setType("shipping")}
                    className="rounded-full border-[2px] w-5 h-5 accent-neutral-800"
                  />
                  <label className="text-neutral-900 text-[18px]">
                    Shipping address
                  </label>
                </div>
                <div className="flex w-full justify-start items-center gap-2 mb-2 ">
                  <input
                    type="checkbox"
                    checked={type === "billing"}
                    onChange={() => setType("billing")}
                    className="rounded-full border-[2px] w-5 h-5 accent-neutral-800"
                  />
                  <label className="text-neutral-900 text-[18px]">
                    Billing address
                  </label>
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={FIELD_CLS}
                  />
                  <span className="floating-lable absolute left-3 top-3 text-gray-500">
                    Full Name
                  </span>
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="line1"
                    required
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    className={FIELD_CLS}
                  />
                  <span className="floating-lable absolute left-3 top-3 text-gray-500">
                    Street and address
                  </span>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="line2"
                  value={line2}
                  onChange={(e) => setLine2(e.target.value)}
                  className={FIELD_CLS}
                />
                <span className="floating-lable absolute left-3 top-3 text-gray-500">
                  Appartment or Suite Number
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={FIELD_CLS}
                />
                <span className="floating-lable absolute left-3 top-3 text-gray-500">
                  City
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={FIELD_CLS}
                />
                <span className="floating-lable absolute left-3 top-3 text-gray-500">
                  State/Region
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className={FIELD_CLS}
                />
                <span className="floating-lable absolute left-3 top-3 text-gray-500">
                  Post code
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={FIELD_CLS}
                />
                <span className="floating-lable absolute left-3 top-3 text-gray-500">
                  Country
                </span>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={FIELD_CLS}
                />
                <span className="floating-lable absolute left-3 top-3 text-gray-500">
                  Phone
                </span>
              </div>
              <div className="flex justify-start ml-1 mr-8 gap-3 mb-4">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="w-6 h-5 border-slate-800 border-[3px] mt-2 accent-neutral-800"
                />
                <div className="text-xl text-gray-600 font-light">
                  Make this my default address
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={!canSave || submitting}
                className="w-full h-14 bg-neutral-300 text-neutral-600 font-semibold rounded-lg mb-4 enabled:bg-neutral-800 disabled:opacity-50"
              >
                {submitting ? "Saving…" : "Save Address"}
              </button>

              <div
                onClick={onClose}
                className=" text-center underline text-neutral-900 font-semibold mb-4 cursor-pointer"
              >
                Cancel
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address_Detail_Form;