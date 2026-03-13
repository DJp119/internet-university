'use client';

import { useState } from 'react';
import { ChecklistItem } from '@/lib/types';
import { CheckCircle, Circle, Sparkles } from 'lucide-react';

interface ChecklistProps {
  items: ChecklistItem[];
  onProgressChange: (completed: number) => void;
}

export default function Checklist({ items, onProgressChange }: ChecklistProps) {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newSet = new Set(completedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCompletedItems(newSet);
    onProgressChange(newSet.size);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => toggleItem(item.id)}
          className={`w-full group checklist-item rounded-2xl text-left slide-up relative ${
            completedItems.has(item.id) ? 'completed' : ''
          }`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Completion Badge */}
          {completedItems.has(item.id) && (
            <div className="absolute top-2 right-2 text-green-500 tick-animation">
              <Sparkles size={16} />
            </div>
          )}

          <div className="flex items-center gap-4 p-5">
            {/* Checkbox */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center tick-animation transition-all duration-300 ${
              completedItems.has(item.id)
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-600 text-white shadow-lg'
                : 'border-gray-300 text-transparent group-hover:border-indigo-400'
            }`}>
              <CheckCircle size={18} strokeWidth={3} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <span className={`checklist-text text-base md:text-lg truncate transition-all duration-300 ${
                  completedItems.has(item.id) ? '' : ''
                }`}>
                  {item.text}
                </span>
              </div>
              {/* Progress Indicator Line */}
              <div className={`mt-2 h-1 rounded-full transition-all duration-500 ${
                completedItems.has(item.id)
                  ? 'w-full bg-gradient-to-r from-indigo-500 to-purple-600'
                  : 'w-0 bg-gray-200'
              }`}></div>
            </div>

            {/* Status Icon */}
            <div className={`flex-shrink-0 transition-all duration-300 ${
              completedItems.has(item.id) ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle size={14} className="text-white" />
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
