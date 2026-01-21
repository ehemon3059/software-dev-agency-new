'use client'

import { CheckCircle, Calendar, Zap, Shield } from 'lucide-react'

export default function TrustBar() {
  return (
    <section className="py-8 bg-gradient-to-r from-gray-50 to-white border-y border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          {/* Production Apps */}
          <div className="flex items-center gap-3 ">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-900">5+</div>
              <div className="text-sm text-gray-600">Production Apps Delivered</div>
            </div>
          </div>

          {/* Years Experience */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">3+ Years</div>
              <div className="text-sm text-gray-600">Building Real Systems</div>
            </div>
          </div>

          {/* Modern Tech */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">Modern</div>
              <div className="text-sm text-gray-600">Tech Stack</div>
            </div>
          </div>

          {/* Long-term Support */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">Long-Term</div>
              <div className="text-sm text-gray-600">Support Included</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}