import { Mail, Lock, EyeOff, Eye, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import bgImage from '../../assets/images/authImage.jpg'
import { useEffect, useState } from 'react'
import SocilaLink from './SocilaLink'
import toast from 'react-hot-toast'
import { useHandleRegisterMutation } from '../../features/auth/authApi'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [handleRegister, { isLoading }] = useHandleRegisterMutation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSubmit = async (data) => {
        if (data.password !== data.conpassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            await handleRegister({
                user_name: data.username,
                email: data.email,
                password: data.password,
            }).unwrap();

            toast.success("Registration successful! Please verify your account.");
            navigate("/login");
        } catch (error) {
            const message = error?.data?.message || "Registration failed!";
            toast.error(message);
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            <div
                className="hidden lg:block lg:w-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="w-full h-full bg-black/10"></div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 bg-[#F6F7FD] py-2">
                <div className="w-full max-w-120 bg-white rounded-xl shadow-sm p-4 sm:p-10 border-slate-100">
                    <div className="text-center mb-8 mx-auto">
                        <h1 className="text-2xl font-bold text-[#262626]">
                           Welcome Back
                        </h1>
                        <p className="text-[#737373] text-base mt-1">
                            Expand your reach and boost your sales.
                        </p>
                    </div>

                    <div className="flex bg-[#F0F9FF] rounded-full mb-8 max-w- mx-auto">
                        <div className="w-full p-1.5 flex">
                            <Link to='/login' className="text-center w-full py-2 px-4 rounded-full text-[#262626] text-base font-medium cursor-pointer">
                               Business Log In
                            </Link>
                            <Link to='#' className="text-center w-full py-2 px-4 rounded-full bg-primary hover:bg-secondary text-white text-base font-medium cursor-pointer">
                                Business Sign Up
                            </Link>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="User Name"
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('username', { required: 'User name is required' })}
                            />
                        </div>
                        {errors.username && (
                            <p className="text-sm text-red-500 ml-4">{errors.username.message}</p>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('email', { required: 'Email is required' })}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-500 ml-4">{errors.email.message}</p>
                        )}

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="w-full pl-12 pr-12 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('password', { required: 'Password is required' })}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 ml-4">{errors.password.message}</p>
                        )}

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type={confirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                className="w-full pl-12 pr-12 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                                {...register('conpassword', {
                                    required: 'Confirm password is required',
                                    validate: (val) =>
                                        val === watch('password') || 'Passwords do not match',
                                })}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 cursor-pointer"
                                onClick={() => setConfirmPassword(!confirmPassword)}>
                                {confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.conpassword && (
                            <p className="text-sm text-red-500 ml-4">{errors.conpassword.message}</p>
                        )}

                        <div className="text-right">
                            <Link to="/forgetpassword" className="text-sm text-primary font-medium hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 rounded-full shadow-md cursor-pointer flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
                            ) : (
                                <span className="font-medium text-lg">Next</span>
                            )}
                        </button>
                    </form>

                    <div className="flex items-center my-6">
                        <div className="grow border-t border-[#837d7d]"></div>
                        <span className="px-3 text-sm text-[#262626]">Or continue with</span>
                        <div className="grow border-t border-[#837d7d]"></div>
                    </div>
                    <SocilaLink />
                    <div className="text-center mt-8 text-base">
                        <span className="text-[#000000]">Already have an account? </span>
                        <Link to="/login" className="text-primary font-semibold hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;