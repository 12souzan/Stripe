import { ArrowLeft } from 'lucide-react'
import React from 'react'

function BackLink({ onBack }) {
    return (
        <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
            <ArrowLeft className="w-4 h-4" />
            Back to payment Selection
        </button>
    )
}

export default BackLink