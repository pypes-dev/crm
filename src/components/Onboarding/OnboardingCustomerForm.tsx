export const OnboardingCustomerForm = () => {
    return (
        <div className="space-y-6 w-full max-w-md mx-auto mb-12">
            <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your name"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Tell us about yourself"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="services" className="block text-sm font-medium text-gray-700">Services Needed</label>
                <input
                    type="text"
                    id="services"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="What services are you looking for?"
                />
            </div>
        </div>
    );
};