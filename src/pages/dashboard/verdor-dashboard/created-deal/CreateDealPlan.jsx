import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetAllPlanQuery } from "../../../../features/plan/planApi";
import PromoteDealSkeleton from "../../../../components/skeleton/PromoteDealSkeleton";
import { useGetDealDetailsQuery } from "../../../../features/deal/dealApi";
import useUserLocation from "../../../../hooks/useUserLocation";
import { useGetCouponCodeQuery } from "../../../../features/coupon/couponApi";
import { useHandlePaymentMutation } from "../../../../features/payment/paymentApi";

const CreateDealPlan = () => {
    const [code, setCode] = useState('');
    const { id } = useParams();
    const { register, handleSubmit, watch, setValue, } = useForm({
        defaultValues: {
            plan: "",
            voucherCode: "",
        },
    });
    // eslint-disable-next-line react-hooks/incompatible-library
    const formData = watch();
    const selectedPlan = watch("plan");
    const { data: plans, isLoading } = useGetAllPlanQuery();
    const { latitude, longitude } = useUserLocation();
    const { data: dealDetails, isLoading: dealDetailsLoading } = useGetDealDetailsQuery({ id, longitude, latitude });
    const { data: couponCode, isLoading: couponCodeLaoding, isSuccess, error } = useGetCouponCodeQuery(code, {
        skip: !code || code.length < 1,
    });
    const [handlePayment, { isLoading: paymentLoading }] = useHandlePaymentMutation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (plans?.data?.length && !selectedPlan) {
            setValue("plan", plans.data[0]._id);
        }
    }, [plans, selectedPlan, setValue]);

    if (isLoading || dealDetailsLoading) {
        return <PromoteDealSkeleton />;
    }
    const { _id, title, description, category } = dealDetails?.data || {};
    const { discount_parcantage } = couponCode?.data || {};
    const selectPromotedPaln = plans?.data.find((plan) => plan._id === formData?.plan);
    const discountPrice = ((selectPromotedPaln?.price * discount_parcantage) / 100)
    const finalPrice = selectPromotedPaln?.price - discountPrice;

    const handleApplyCoupon = () => {
        setCode(formData?.voucherCode);
    }

    const onSubmit = async () => {
        const finalData = {
            planId: selectedPlan,
            dealId: id,
            voucher: code,
        };
        const res = await handlePayment(finalData);
        window.location.href = res?.data?.data?.checkout_url;
    };
    return (
        <div className="bg-white min-h-screen px-4 pt-28 pb-12">
            <div className="max-w-305 mx-auto">
                <h1 className="text-[#262626] text-2xl sm:text-[32px] font-bold pb-6">
                    Promote your deal
                </h1>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* LEFT COLUMN */}
                        <div className="w-full">
                            <div className="space-y-3">
                                {plans?.data.map((plan) => (
                                    <div
                                        key={plan._id}
                                        onClick={() => setValue("plan", plan._id)}
                                        className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all
                                        ${selectedPlan === plan._id
                                                ? "border-[#2ca7ab]"
                                                : "border-gray-200 bg-white"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                className="w-12 h-14 object-fill"
                                                src={plan?.icon}
                                                alt={plan?.title}
                                            />
                                            <div>
                                                <h4 className="font-bold text-lg text-[#1D1D1D]">
                                                    {plan?.title}
                                                </h4>
                                                <p className="text-sm text-[#737373]">
                                                    {plan?.desc}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="text-xl font-bold">
                                            {plan?.price}$
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="w-full rounded-xl md:px-6 h-fit">
                            <h1 className="font-bold text-xl md:text-2xl">
                                {title}
                            </h1>
                            <div className="flex justify-between text-lg my-3">
                                <span className="text-[#1f1e1e] font-medium">Category</span>
                                <span className="font-medium">{category?.category_name}</span>
                            </div>
                            <p className="text-gray-700 font-medium">
                                {description}
                            </p>
                            <div className="mt-5 space-y-2">
                                <div className="flex justify-between text-lg">
                                    <span className="text-[#1f1e1e] font-medium">Selected Plan</span>
                                    <span className="font-medium">{selectPromotedPaln?.title}</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg my-3">
                                <span className="text-[#1f1e1e] font-medium">Plan Price</span>
                                <span className="font-medium">{selectPromotedPaln?.price}$</span>
                            </div>
                            <div className="flex justify-between text-lg my-3 border-b border-gray-400 py-3">
                                <span className="text-[#1f1e1e] font-medium">Discount</span>
                                <span className="font-medium">{discountPrice || 0}$</span>
                            </div>
                            <div className="flex justify-between text-lg my-3">
                                <span className="text-[#1f1e1e] font-medium">Total Price</span>
                                <span className="font-medium">{finalPrice || selectPromotedPaln?.price}$</span>
                            </div>

                            <div className="mt-3">
                                <label className="block text-lg text-[#262626] font-medium mb-2">
                                    Coupon / Voucher Code
                                </label>
                                <p className="text-base text-[#737373] mb-1">
                                    Enter your coupon or voucher code to get a discount on this plan.
                                </p>
                                <div className="w-full md:max-w-xl">
                                    <div className="flex items-center gap-3 border border-gray-300 rounded-full px-2 py-1 focus-within:ring-2 focus-within:ring-[#2CA5B9]">
                                        <input
                                            {...register("voucherCode")}
                                            placeholder="ABCD456"
                                            className={`flex-1 px-4 py-2 outline-none text-lg text-gray-700 rounded-full transition-all duration-200 ${watch("voucherCode") ? "bg-gray-200" : "bg-transparent"
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleApplyCoupon}
                                            disabled={couponCodeLaoding}
                                            className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-900 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {couponCodeLaoding ? (
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            ) : (
                                                isSuccess ? "Applied" : "Apply"
                                            )}
                                        </button>
                                    </div>
                                </div>
                                {
                                    error?.data?.message === 'INVALID_VOUCHER' && (
                                        <p className="text-red-500 text-sm mt-2 ml-2 lowercase">
                                            {error?.data?.message}
                                        </p>
                                    )
                                }
                            </div>
                            {/* BUTTON */}
                            <div className="pt-6 text-center w-full">
                                <button
                                    type="submit"
                                    disabled={paymentLoading}
                                    className={`w-full flex items-center justify-center text-white font-bold text-lg py-3 px-12
                                rounded-full shadow-xl shadow-[#4BBDCF]/20 transition-all duration-200 active:scale-95 ${paymentLoading ? "bg-[#2ca5b9]/70 cursor-pointer"
                                            : "bg-[#2ca5b9] hover:bg-[#238a9b]"}`}> {paymentLoading ? (
                                                <div className="w-6 h-6  border-2 border-white border-t-transparent rounded-full animate-spin"></div>) : ("Check Out")}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDealPlan;