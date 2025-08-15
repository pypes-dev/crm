export const OnboardingBusinessForm = () => {
    return (
        <div className="space-y-6 w-full max-w-md mx-auto mb-12">
            <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Business Name</label>
                <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your business name"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Business Description</label>
                <textarea
                    id="description"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Tell us about your business"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="services" className="block text-sm font-medium text-gray-700">Services Offered</label>
                <input
                    type="text"
                    id="services"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="List the services you provide"
                />
            </div>
        </div>
    );
};