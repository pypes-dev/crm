import { ArrowRight, Brain, Globe } from "lucide-react";
import { useState } from "react";

export type MyBusiness = {
    name?: string,
    description?: string,
    services_offered?: string[],
    images?: string[]
}
export const Website = () => {
    const [myBusinessStep, setmyBusinessStep] = useState(0);
    const [formData, setFormData] = useState<MyBusiness>({})
    // myBusiness steps
    const myBusinessSteps = [
        {
            title: "Welcome to Pypes Dev!",
            description: "Let's learn more about your business so that we can help. We'll guide you through the process.",
            buttonText: "Let's Go!",
            position: "center"
        },
        {
            title: "1. Name and Product/Service Offering",
            description: "We'll need basic information like name and description to help understand what you do.",
            buttonText: "Next",
            position: "bottom-right"
        },
        {
            title: "2. Track Interactions",
            description: "After adding a lead, you can track all your communications, notes, and next steps in one place.",
            buttonText: "Got it!",
            position: "center"
        }
    ];

    const handleNextmyBusinessStep = () => {
        if (myBusinessStep < myBusinessSteps.length - 1) {
            setmyBusinessStep(prev => prev + 1);
        }
    };

    const handleSubmit = () => {
        console.log('submitted')
    }
    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };


    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden">
                {/* Progress Bar */}
                <div className="h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${((myBusinessStep + 1) / myBusinessSteps.length) * 100}%` }}
                    ></div>
                </div>

                {/* Step Content */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Brain className="w-8 h-8 text-white" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {myBusinessSteps[myBusinessStep].title}
                    </h2>

                    <p className="text-gray-600 mb-6">
                        {myBusinessSteps[myBusinessStep].description}
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            {(myBusinessStep === 1) && <><label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Name *
                            </label><div className="relative">
                                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        id="name"
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter full name"
                                        required />
                                </div></>}
                        </div>
                    </form>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleNextmyBusinessStep}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex-1 flex items-center justify-center gap-2"
                        >
                            {myBusinessSteps[myBusinessStep].buttonText}
                            {myBusinessStep < myBusinessSteps.length - 1 ? (
                                <ArrowRight className="w-4 h-4" />
                            ) : null}
                        </button>

                    </div>
                </div>

                {/* Step Indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                    {myBusinessSteps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setmyBusinessStep(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${index === myBusinessStep
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 w-6'
                                : 'bg-gray-200'
                                }`}
                            aria-label={`Go to step ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}