'use client';

import { useState } from 'react';
import { ChecklistItem } from '@/lib/types';
import { CheckCircle, Sparkles } from 'lucide-react';

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
          className={`w-full group checklist-item rounded-2xl text-left slide-up relative transition-all duration-300 ${
            completedItems.has(item.id) ? 'completed' : ''
          }`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Completion Badge */}
          {completedItems.has(item.id) && (
            <div className="absolute top-3 right-3 text-green-500 tick-animation">
              <Sparkles size={16} />
            </div>
          )}

          <div className="flex items-center gap-4 p-4">
            {/* Checkbox */}
            <div className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center tick-animation transition-all duration-300 ${
              completedItems.has(item.id)
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-600 text-white shadow-lg scale-110'
                : 'border-gray-300 text-transparent group-hover:border-indigo-400'
            }`}>
              <CheckCircle size={16} strokeWidth={3} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className={`checklist-text text-base font-medium transition-all duration-300 ${
                completedItems.has(item.id) ? 'text-indigo-900 line-through opacity-70' : 'text-gray-700'
              }`}>
                {item.text}
              </p>
              {/* Progress Indicator Line */}
              <div className={`mt-2 h-1 rounded-full transition-all duration-500 ${
                completedItems.has(item.id)
                  ? 'w-full bg-gradient-to-r from-indigo-500 to-purple-600'
                  : 'w-0 bg-gray-200'
              }`}></div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
