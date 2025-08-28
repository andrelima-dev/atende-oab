"use client"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export default function ProgressIndicator({ currentStep, totalSteps, steps }: ProgressIndicatorProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                index < currentStep
                  ? "bg-blue-600 text-white"
                  : index === currentStep
                    ? "bg-yellow-500 text-gray-900"
                    : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-16 mx-2 transition-colors ${index < currentStep ? "bg-blue-600" : "bg-gray-300"}`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-sm text-center text-white">
        Etapa {currentStep + 1} de {totalSteps}: {steps[currentStep]}
      </div>
    </div>
  )
}
