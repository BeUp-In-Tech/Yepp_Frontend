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
    const { latitude, longitude } = useUserLocation();
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            plan: "",
            voucherCode: "",
        },
    });

    const formData = watch();
    const selectedPlan = watch("plan");

    const { data: plans, isLoading } = useGetAllPlanQuery();
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

    const handleApplyCoupon = () => {
        setCode(formData?.voucherCode);
    };

    const selectPromotedPaln = plans?.data.find((plan) => plan._id === formData?.plan);
    const { _id, title, category } = dealDetails?.data || {};

    const discountPrice = ((selectPromotedPaln?.price * couponCode?.data?.discount_parentage) / 100);
    const finalPrice = selectPromotedPaln?.price - discountPrice;

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
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

                .cdp-plan-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #e8fbfd 0%, #f0fffe 100%);
                    opacity: 0;
                    transition: opacity 0.2s;
                    pointer-events: none;
                }
                .cdp-plan-card:hover::before { opacity: 1; }
                .cdp-plan-card.active::before { opacity: 0; }

                @keyframes cdp-spin { to { transform: rotate(360deg); } }
                .cdp-spinner {
                    width: 14px; height: 14px;
                    border: 2px solid rgba(255,255,255,0.4);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: cdp-spin 0.7s linear infinite;
                    display: inline-block;
                }
                .cdp-checkout-spinner {
                    width: 20px; height: 20px;
                    border: 2.5px solid rgba(255,255,255,0.4);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: cdp-spin 0.7s linear infinite;
                    display: inline-block;
                }
            `}</style>

            {/* Root */}
            <div
                className="min-h-screen pt-28 px-4 pb-16 box-border"
                style={{ background: 'linear-gradient(135deg, #f0fdff 0%, #f8fffe 50%, #f0f9ff 100%)', fontFamily: "'DM Sans', sans-serif" }}
            >
                <div className="max-w-305 mx-auto">

                    {/* Page heading */}
                    <h1
                        className="font-extrabold text-[#0f1f2e] mb-9 tracking-tight"
                        style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(26px, 4vw, 38px)', letterSpacing: '-0.5px' }}
                    >
                        Promote your{' '}
                        <span className="bg-linear-to-br from-[#1fa8ae] to-[#2dd4bf] bg-clip-text text-transparent">
                            deal
                        </span>
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8 lg:items-start">

                            {/* ── LEFT: Plan Selection ── */}
                            <div>
                                <p
                                    className="text-[11px] font-bold uppercase text-[#64a4aa] mb-3.5 tracking-[1.5px]"
                                    style={{ fontFamily: "'Sora', sans-serif" }}
                                >
                                    Choose a promotion plan
                                </p>

                                <div className="flex flex-col gap-3">
                                    {plans?.data.map((plan) => {
                                        const isActive = selectedPlan === plan._id;
                                        return (
                                            <div
                                                key={plan._id}
                                                onClick={() => setValue("plan", plan._id)}
                                                className={`cdp-plan-card flex items-center justify-between gap-4 px-5.5     py-4.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative overflow-hidden
                                                    ${isActive
                                                        ? 'active border-[#1fa8ae] shadow-[0_6px_28px_rgba(44,167,171,0.18)]'
                                                        : 'border-[#e5f0f1] bg-white hover:border-[#a5dde3] hover:shadow-[0_4px_20px_rgba(44,167,171,0.1)] hover:-translate-y-px'
                                                    }`}
                                                style={isActive ? { background: 'linear-gradient(135deg, #e8fbfd 0%, #f0fffe 100%)' } : {}}
                                            >
                                                {/* Left side */}
                                                <div className="flex items-center gap-4 min-w-0 relative z-1">
                                                    {/* Radio dot */}
                                                    <div
                                                        className={`w-4.5 h-4.5 rounded-full border-2 shrink-0 relative z-1 transition-colors duration-200
                                                            ${isActive
                                                                ? 'border-[#1fa8ae] bg-[#1fa8ae] shadow-[inset_0_0_0_3px_#fff]'
                                                                : 'border-[#d0dfe1]'
                                                            }`}
                                                    />
                                                    {/* Icon */}
                                                    <div
                                                        className="w-13 h-13 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border border-[#caf0f3]"
                                                        style={{ background: 'linear-gradient(135deg, #f0fdff, #e0f7fa)' }}
                                                    >
                                                        <img
                                                            src={plan?.icon}
                                                            alt={plan?.title}
                                                            className="w-9 h-10 object-contain"
                                                        />
                                                    </div>

                                                    {/* Info */}
                                                    <div className="min-w-0">
                                                        <h4
                                                            className="text-[15px] font-bold text-[#0f1f2e] mb-0.75 wrap-break-word m-0"
                                                            style={{ fontFamily: "'Sora', sans-serif" }}
                                                        >
                                                            {plan?.title}
                                                        </h4>
                                                        <p className="text-[13px] text-[#7e9ea2] wrap-break-word leading-[1.4] m-0">
                                                            {plan?.desc}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <span
                                                    className={`text-xl font-extrabold whitespace-nowrap relative z-1 ${isActive ? 'text-[#1fa8ae]' : 'text-[#0f1f2e]'}`}
                                                    style={{ fontFamily: "'Sora', sans-serif" }}
                                                >
                                                    {plan?.price}$
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ── RIGHT: Summary ── */}
                            <div className="bg-white rounded-[20px] border border-[#e5f0f1] shadow-[0_8px_40px_rgba(31,168,174,0.08)] overflow-hidden">

                                {/* Header */}
                                <div
                                    className="px-6 py-5"
                                    style={{ background: 'linear-gradient(135deg, #1fa8ae 0%, #17919a 100%)' }}
                                >
                                    <p
                                        className="text-[17px] font-bold text-white wrap-break-word m-0"
                                        style={{ fontFamily: "'Sora', sans-serif" }}
                                    >
                                        {title || "—"}
                                    </p>
                                </div>

                                {/* Meta rows */}
                                <div className="px-6 py-5">
                                    <div className="flex items-baseline justify-between gap-3 py-2.5">
                                        <span className="text-sm text-[#6b8a8e] font-medium whitespace-nowrap">Category</span>
                                        <span className="text-sm font-semibold text-[#0f1f2e] text-right wrap-break-word" style={{ fontFamily: "'Sora', sans-serif" }}>
                                            {category?.category_name || "—"}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-3 py-2.5 border-t border-[#f0f7f8]">
                                        <span className="text-sm text-[#6b8a8e] font-medium whitespace-nowrap">Selected Plan</span>
                                        <span className="text-sm font-semibold text-[#0f1f2e] text-right wrap-break-word" style={{ fontFamily: "'Sora', sans-serif" }}>
                                            {selectPromotedPaln?.title || "—"}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-3 py-2.5 border-t border-[#f0f7f8]">
                                        <span className="text-sm text-[#6b8a8e] font-medium whitespace-nowrap">Plan Price</span>
                                        <span className="text-sm font-semibold text-[#0f1f2e] text-right wrap-break-word" style={{ fontFamily: "'Sora', sans-serif" }}>
                                            {(selectPromotedPaln?.price ?? 0).toFixed(2)}$
                                        </span>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-3 py-2.5 border-t border-[#f0f7f8]">
                                        <span className="text-sm text-[#6b8a8e] font-medium whitespace-nowrap">Discount</span>
                                        <span className="text-sm font-semibold text-[#0f1f2e] text-right wrap-break-word" style={{ fontFamily: "'Sora', sans-serif" }}>
                                            {discountPrice
                                                ? <span>{discountPrice.toFixed(2)}$</span>
                                                : "0$"
                                            }
                                        </span>
                                    </div>

                                    {/* Divider */}
                                    <div
                                        className="h-px my-1"
                                        style={{ background: 'linear-gradient(to right, transparent, #d0ecef, transparent)' }}
                                    />

                                    {/* Total */}
                                    <div className="flex items-center justify-between pt-3.5 pb-1.5">
                                        <span
                                            className="text-[15px] font-bold text-[#0f1f2e]"
                                            style={{ fontFamily: "'Sora', sans-serif" }}
                                        >
                                            Total
                                        </span>
                                        <span
                                            className="text-[22px] font-extrabold text-[#1fa8ae]"
                                            style={{ fontFamily: "'Sora', sans-serif" }}
                                        >
                                            {finalPrice || selectPromotedPaln?.price || 0}$
                                        </span>
                                    </div>
                                </div>

                                {/* Coupon */}
                                <div className="px-6 pb-5">
                                    <p
                                        className="text-[13px] font-bold text-[#0f1f2e] mb-1"
                                        style={{ fontFamily: "'Sora', sans-serif" }}
                                    >
                                        Coupon / Voucher Code
                                    </p>
                                    <p className="text-xs text-[#8fadb1] mb-2.5 leading-normal m-0">
                                        Enter your coupon or voucher code to get a discount on this plan.
                                    </p>

                                    <div className="flex items-center gap-2 bg-[#f4fbfc] border-[1.5px] border-[#d0eaed] rounded-xl pl-4 pr-1.5 py-1.5 transition-all duration-200 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(76,175,80,0.16)]">
                                        <input
                                            {...register("voucherCode")}
                                            placeholder="ABCD456"
                                            className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm font-medium text-[#0f1f2e] tracking-[0.5px] placeholder-[#aac8cc]"
                                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleApplyCoupon}
                                            disabled={couponCodeLaoding}
                                            className={`shrink-0 flex items-center gap-1.5 text-white border-none rounded-lg px-[18px] py-2 text-[13px] font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap
                                                disabled:opacity-50 disabled:cursor-not-allowed
                                                ${isSuccess
                                                    ? 'bg-linear-to-br from-[#1fa8ae] to-[#2dd4bf]'
                                                    : 'bg-primary hover:bg-secondary active:scale-[0.97]'
                                                }`}
                                            style={{ fontFamily: "'Sora', sans-serif" }}
                                        >
                                            {couponCodeLaoding
                                                ? <span className="cdp-spinner" />
                                                : isSuccess ? "✓ Applied" : "Apply"
                                            }
                                        </button>
                                    </div>

                                    {error?.data?.message === 'INVALID_VOUCHER' && (
                                        <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">
                                            Invalid voucher code. Please try again.
                                        </p>
                                    )}
                                </div>

                                {/* Checkout */}
                                <div className="px-6 pt-4 pb-6">
                                    <button
                                        type="submit"
                                        disabled={paymentLoading}
                                        className="w-full flex items-center justify-center gap-2 text-white border-none rounded-[14px] py-4 text-base font-bold cursor-pointer tracking-[0.3px] shadow-[0_8px_24px_rgba(31,168,174,0.35)] transition-all duration-200 hover:opacity-[0.93] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(31,168,174,0.4)] active:scale-[0.98] disabled:opacity-65 disabled:cursor-not-allowed disabled:transform-none"
                                        style={{
                                            background: 'linear-gradient(135deg, #1fa8ae 0%, #17919a 100%)',
                                            fontFamily: "'Sora', sans-serif"
                                        }}
                                    >
                                        {paymentLoading
                                            ? <span className="cdp-checkout-spinner" />
                                            : <>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M9 12l2 2 4-4" /><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.51 0 2.93.37 4.18 1.02" />
                                                </svg>
                                                Check Out
                                            </>
                                        }
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateDealPlan;
