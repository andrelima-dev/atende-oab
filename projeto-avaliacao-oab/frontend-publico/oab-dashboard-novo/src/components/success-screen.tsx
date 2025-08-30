"use client"

interface SuccessScreenProps {
  onReset: () => void
}

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const RotateIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="1 4 1 10 7 10"></polyline>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
  </svg>
)

export default function SuccessScreen({ onReset }: SuccessScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md text-center bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="w-16 h-16 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Avaliação Enviada!</h2>
        <p className="text-gray-600 mb-6">
          Obrigado por sua avaliação. Seu feedback é muito importante para melhorarmos nossos serviços.
        </p>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          <RotateIcon className="w-4 h-4" />
          Nova Avaliação
        </button>
      </div>
    </div>
  )
}
