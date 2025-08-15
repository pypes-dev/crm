export const OnboardingInviteForm = () => {
    return (
        <div className="space-y-6 w-full max-w-md mx-auto mb-12">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter email address to invite"
                />
            </div>
            <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
                Send Invitation
            </button>
        </div>
    );
};