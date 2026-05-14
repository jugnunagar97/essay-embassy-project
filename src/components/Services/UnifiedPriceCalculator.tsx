import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, FileText, GraduationCap } from 'lucide-react';

type UnifiedPriceCalculatorProps = {
  compact?: boolean;
};

export default function UnifiedPriceCalculator({ compact = false }: UnifiedPriceCalculatorProps) {
  const [academicLevel, setAcademicLevel] = useState<'highschool' | 'undergraduate' | 'masters' | 'phd'>('undergraduate');
  const [pages, setPages] = useState(1);
  const [deadline, setDeadline] = useState<'3hours' | '6hours' | '12hours' | '24hours' | '3days' | '7days' | '14days' | '30days'>('7days');

  const baseRates: Record<typeof academicLevel, number> = {
    highschool: 10,
    undergraduate: 12,
    masters: 16,
    phd: 20,
  };

  const deadlineMultipliers: Record<typeof deadline, number> = {
    '3hours': 2.3,
    '6hours': 2.0,
    '12hours': 1.7,
    '24hours': 1.4,
    '3days': 1.2,
    '7days': 1.0,
    '14days': 0.9,
    '30days': 0.85,
  };

  const totalPrice = Math.round(baseRates[academicLevel] * pages * deadlineMultipliers[deadline]);
  const perPage = Math.round(totalPrice / pages);

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 ${compact ? 'p-6 lg:p-5' : 'p-8'}`}>
      <div className={`text-center ${compact ? 'mb-6' : 'mb-8'}`}>
        <h3 className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 mb-2`}>Calculate Your Live Price</h3>
        <p className="text-gray-600 text-sm">Expert help starting at just $10/page - no hidden fees.</p>
      </div>

      <div className={compact ? 'space-y-5' : 'space-y-6'}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#1652A0]" />
            Academic Level
          </label>
          <select
            value={academicLevel}
            onChange={(e) => setAcademicLevel(e.target.value as typeof academicLevel)}
            className={`w-full px-4 ${compact ? 'py-2.5' : 'py-3'} rounded-xl border border-gray-200 focus:border-[#1652A0] focus:ring-2 focus:ring-[#1652A0]/10 transition-all outline-none text-gray-700 bg-gray-50`}
          >
            <option value="highschool">High School</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="masters">Master&apos;s Degree</option>
            <option value="phd">PhD / Doctoral</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1652A0]" />
              Number of Pages
            </span>
            <span className="text-[#1652A0] font-bold">{pages} {pages === 1 ? 'page' : 'pages'}</span>
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1652A0]"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
            <span>1 page</span>
            <span className="text-gray-700">{pages * 275} words</span>
            <span>50 pages</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1652A0]" />
            Deadline
          </label>
          <select
            value={deadline}
            onChange={(e) => setDeadline(e.target.value as typeof deadline)}
            className={`w-full px-4 ${compact ? 'py-2.5' : 'py-3'} rounded-xl border border-gray-200 focus:border-[#1652A0] focus:ring-2 focus:ring-[#1652A0]/10 transition-all outline-none text-gray-700 bg-gray-50`}
          >
            <option value="3hours">3 Hours (Super Urgent)</option>
            <option value="6hours">6 Hours (Urgent)</option>
            <option value="12hours">12 Hours</option>
            <option value="24hours">24 Hours</option>
            <option value="3days">3 Days</option>
            <option value="7days">7 Days (Standard)</option>
            <option value="14days">14 Days (Relaxed)</option>
            <option value="30days">30 Days</option>
          </select>
        </div>

        <div className={`bg-[#0B1F42]/5 rounded-2xl ${compact ? 'p-4' : 'p-6'} border border-[#0B1F42]/10`}>
          <div className={`flex justify-between items-center ${compact ? 'mb-4' : 'mb-6'}`}>
            <div>
              <p className="text-[#0B1F42] text-sm font-semibold mb-1">Estimated Total:</p>
              <p className={`${compact ? 'text-3xl' : 'text-4xl'} font-black text-[#0B1F42]`}>${totalPrice}</p>
            </div>
            <div className="text-right bg-white rounded-lg px-3 py-2 border border-[#0B1F42]/10">
              <p className="text-xs text-gray-500 font-medium">Per Page</p>
              <p className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-gray-900`}>${perPage}</p>
            </div>
          </div>

          <Link
            to="/order-now"
            className={`w-full px-6 ${compact ? 'py-3.5 text-base' : 'py-4 text-lg'} bg-[#1652A0] hover:bg-[#0B1F42] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2`}
          >
            Proceed to Order <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs font-medium text-gray-600">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> Free Plagiarism Report</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#10B981]" /> No Hidden Fees</span>
          </div>
        </div>
      </div>
    </div>
  );
}
