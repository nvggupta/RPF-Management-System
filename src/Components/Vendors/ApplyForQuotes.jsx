import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ApplyForQuotes() {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        toast.success('RFP Quote submitted successfully!');
        reset();
    };

    const onCancel = () => {
        reset();
        toast.info('Form reset successfully!');
    };

    return (
        <div className="p-6">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Create RFP Quote</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Vendor Price</label>
                        <input
                            type="number"
                            {...register('vendorPrice', { required: true })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter vendor price"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Item Description</label>
                        <textarea
                            {...register('itemDescription', { required: true })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter item description"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700">Quantity</label>
                        <input
                            type="number"
                            {...register('quantity', { required: true })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter quantity"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Total Cost</label>
                        <input
                            type="number"
                            {...register('totalCost', { required: true })}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter total cost"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ApplyForQuotes;
