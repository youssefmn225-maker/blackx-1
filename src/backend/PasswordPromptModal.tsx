import React, { useState } from 'react';
import { KeyRound, Delete, Check, X, ShieldAlert } from 'lucide-react';

interface PasswordPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PasswordPromptModal: React.FC<PasswordPromptModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (pin.length < 5) {
      const next = pin + digit;
      setPin(next);
      setError(false);
      if (next.length === 5) {
        if (next === '55555') {
          setTimeout(() => {
            setPin('');
            onSuccess();
          }, 300);
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 800);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-sm bg-gradient-to-br from-[#0c051a] via-[#05020c] to-[#020005] border border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.4)] p-6 flex flex-col items-center text-center">
        
        {/* Close button */}
        <button
          type="button"
          onClick={() => {
            setPin('');
            setError(false);
            onClose();
          }}
          className="absolute top-4 left-4 p-1.5 rounded-lg bg-purple-900/30 hover:bg-purple-800/50 text-slate-300 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          <KeyRound className="w-6 h-6 text-purple-300" />
        </div>

        <h3 className="text-white font-bold text-base mb-1" style={{ fontFamily: "'Cairo', sans-serif" }}>
          دخول لوحة التحكم المشفرة
        </h3>
        <p className="text-purple-300/60 text-xs mb-6">أدخل رمز المرور السري (5 أرقام)</p>

        {/* PIN Dots */}
        <div className="flex gap-3 mb-6">
          {[0, 1, 2, 3, 4].map((i) => {
            const filled = i < pin.length;
            return (
              <div
                key={i}
                className={`w-10 h-12 rounded-xl border flex items-center justify-center text-lg font-bold transition-all ${
                  error
                    ? 'border-red-500 bg-red-950/40 text-red-400 animate-shake'
                    : filled
                    ? 'border-purple-400 bg-purple-900/40 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                    : 'border-purple-900/40 bg-black/40 text-transparent'
                }`}
              >
                {filled ? '•' : ''}
              </div>
            );
          })}
        </div>

        {error && (
          <div className="text-red-400 text-xs mb-4 flex items-center gap-1.5 font-mono">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>رمز المرور غير صحيح! (استخدم 55555)</span>
          </div>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'DEL'].map((btn) => (
            <button
              key={btn}
              type="button"
              onClick={() => {
                if (btn === 'C') setPin('');
                else if (btn === 'DEL') handleDelete();
                else handleDigit(btn);
              }}
              className="h-12 rounded-xl bg-purple-950/30 hover:bg-purple-950/60 border border-purple-900/40 text-white font-bold text-base transition-all flex items-center justify-center active:scale-95 cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
            >
              {btn === 'DEL' ? <Delete className="w-5 h-5 text-purple-300" /> : btn}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
