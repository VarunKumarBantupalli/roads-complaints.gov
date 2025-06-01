import React from 'react'

const Login = () => {
return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
)
}

export default Login
