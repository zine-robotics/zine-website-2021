import React, { useEffect, useState } from "react";
import SideNav from "../sidenav";
import ProtectedRoute from "./ProtectedRoute";
import { useForm } from "react-hook-form";
import useRazorpay from "react-razorpay";
import { useAuth } from "../../../context/authContext";
import { IDonation, createOrder, fetchAllDonations, verifyPayment } from "../../../apis/payments";
import { ToastContainer, toast } from "react-toastify";
import styles from "../../../constants/styles";
import ZineLogo from "../../../images/admin/logo.png"
import Image from "next/image";

const MAX_TRANSACTION_LIMIT = 500000
interface IDonateForm {
    remarks: string;
    amount: number;
    currency: string;
    projectName?: string;
}

const Donate = () => {
    const [donations, setDonations] = useState<IDonation[]>([])
    const { register, reset, formState: { errors }, handleSubmit } = useForm<IDonateForm>()
    const currencies = ["INR"]
    // const projectNames: string[] = []

    const [Razorpay] = useRazorpay();
    const { authUser } = useAuth()

    const onSubmit = async (data: IDonateForm) => {
        let { amount, currency, remarks } = data
        amount = Math.floor(amount * 100)
        reset({ amount: 0.0, remarks: "" })
        toast.promise(createOrder({
            amount: amount.toString(),
            currency: currency || "INR",
            remark: remarks,
            email: authUser!.email,
        }), {
            pending: "Initiating payment"
        }).then(order => {
            const orderData = order.data as IDonation
            // console.log(orderData)
            const rzpay = new Razorpay({
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY as string,
                amount: amount.toString(),
                currency: currency,
                order_id: orderData.orderId,
                name: "ZINE",
                description: remarks,
                theme: {
                    color: "#0C72B0"
                },
                prefill: {
                    name: authUser!.name,
                    email: authUser!.email,
                },
                handler: async (response) => {
                    const result = await verifyPayment({ orderId: orderData.orderId, paymentId: response.razorpay_payment_id, signature: response.razorpay_signature })
                    const resdata = result.data
                    if (resdata) {
                        toast.success("Payment Successful! Thank you for your donation!")
                        setDonations([...donations, orderData])
                    } else {
                        toast.error("Error")
                    }
                },
                modal: {
                    ondismiss: () => toast.info("Payment Cancelled")
                },
            })

            rzpay.on("payment.failed", () => {
                toast.error("Payment Failed")
            })
            rzpay.on("payment.ondismiss", () => {
                toast.info('Payment Cancelled')
            });
            return rzpay.open()
        }).catch(err => {
            toast.error(err)
        })
    }

    useEffect(() => {
        fetchAllDonations().then(res => {
            const donations = res.data.filter((d: IDonation) => d.email === authUser!.email)
            setDonations(donations)
        })
    }, [])


    return (
        <ProtectedRoute>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="flex flex-col md:grid grid-cols-12 h-screen" style={{ background: "#EFEFEF" }}>
                <SideNav />

                <div className="px-6 col-span-9 md:px-12 flex flex-col overflow-y-scroll">
                    <h1 className="text-4xl font-bold mt-8" style={{ color: "#AAAAAA" }}>Donate</h1>

                    <div className="row-span-5 bg-white rounded-xl py-4 px-6 my-8 w-full shadow-md">
                        <h1 className="text-2xl font-bold" style={styles.textPrimary}>Make A Donation</h1>
                        <div className="grid grid-cols-5 gap-6 mt-4">
                            <div className="col-span-2">
                                <label className="block text-gray-600 text-sm">Currency</label>
                                <select id="currencyName" className="block w-full focus:outline-none bottom-border pt-3" {...register("currency")}>
                                    {
                                        currencies.map(curr => (
                                            <option key={curr}>{curr}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-span-3">
                                <label className="block text-gray-600 text-sm">Amount<span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute top-2">₹</span>
                                    <input type="number" id="amount" className="block w-full focus:outline-none bottom-border pt-2 ml-4" placeholder="0.00" {...register("amount", { required: true, valueAsNumber: true, max: MAX_TRANSACTION_LIMIT, min: 1 })} />
                                </div>
                                {errors.amount && <p className="text-red-500 text-sm" role="alert">Amount is required</p>}
                            </div>
                            {/* <div className="col-span-2">
                                <label className="block text-gray-600 text-sm">Project Name</label>
                                <select id="projectName" className="block w-full focus:outline-none bottom-border pt-2" {...register("projectName")}>
                                    {
                                        projectNames.map(project => (
                                            <option key={project}>{project}</option>
                                        ))
                                    }
                                </select>
                            </div> */}
                            <div className="col-span-5">
                                <label className="block text-gray-600 text-sm">Remarks / Comments<span className="text-red-500">*</span></label>
                                <textarea id="remarks" className="block w-full focus:outline-none bottom-border pt-2" rows={1} {...register("remarks", { required: true })}></textarea>
                                {errors.remarks && <p className="text-red-500 text-sm" role="alert">Remarks is required</p>}
                            </div>
                        </div>
                        <button className="p-3 block w-40 rounded-3xl text-white mt-4 shadow-md hover:opacity-80" style={{ background: "#0C72B0" }} onClick={handleSubmit(onSubmit)}>Donate</button>
                    </div>

                    {/* <div className="bg-white py-4 px-6 mb-8 rounded-xl shadow-md">
                        <h1 className="text-2xl font-bold" style={styles.textPrimary}>Donations Made</h1>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            {
                                donations.sort((a, b) => b.timestamp - a.timestamp).map(d => (
                                    <div className="bg-white rounded-md shadow-md px-4 py-6 text-center">
                                        <p className="text-3xl font-bold" style={styles.textPrimary}>₹{d.amount / 100}</p>
                                        <p className="" style={styles.textGray}>{new Date(d.timestamp).toLocaleDateString('en-CA')}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div> */}

                    <div className="bg-white py-4 px-6 mb-8 rounded-xl shadow-md">
                        <h1 className="text-2xl font-bold" style={styles.textPrimary}>Donations Made</h1>
                        <div className="flex flex-col gap-2 mt-4">
                            {
                                !donations.length && <p className="font-bold" style={styles.textGray}>You have not made any donations yet!</p>
                            }
                            {
                                donations.sort((a, b) => b.timestamp - a.timestamp).map(d => (
                                    <div className="bg-white rounded-md shadow-md p-2 md:p-4 flex justify-between items-center" key={d.id}>
                                        <div className="flex items-center gap-2 mr-1">
                                            <Image src={ZineLogo} width={50} height={50} />
                                            <div>
                                                <div className="font-bold" style={styles.textPrimary}>{authUser!.name}</div>
                                                <div className="text-sm -mt-1" style={styles.textGray}>{new Date(d.timestamp).toLocaleDateString('en-CA')}</div>
                                            </div>
                                        </div>
                                        <p className="text-xl md:text-3xl font-bold" style={styles.textPrimary}>₹{d.amount / 100}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default Donate;