import React, { useState } from 'react';
import { ProjectShard } from '../types';
import { getStoredProjects, saveStoredProjects, resetStoredProjects } from '../backend/projectStorage';
import { KeyRound, Search, Edit3, Save, RotateCcw, X, CheckCircle, ShieldCheck } from 'lucide-react';

interface BackendAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectsUpdated: () => void;
}

export const BackendAdminModal: React.FC<BackendAdminModalProps> = ({
  isOpen,
  onClose,
  onProjectsUpdated,
}) => {
  const [projects, setProjects] = useState<ProjectShard[]>(getStoredProjects());
  const [searchCode, setSearchCode] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectShard | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleSelectProject = (proj: ProjectShard) => {
    setSelectedProject(JSON.parse(JSON.stringify(proj))); // Deep clone
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const updated = projects.map((p) => (p.id === selectedProject.id ? selectedProject : p));
    setProjects(updated);
    saveStoredProjects(updated);
    onProjectsUpdated();

    setSuccessMessage('تم حفظ التعديلات بنجاح وتحديث الكارت في الموقع!');
    setTimeout(() => setSuccessMessage(''), 3500);
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من استعادة المشاريع للافتراضي؟')) {
      const def = resetStoredProjects();
      setProjects(def);
      setSelectedProject(null);
      onProjectsUpdated();
      setSuccessMessage('تمت الاستعادة بنجاح.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const filteredProjects = searchCode.trim()
    ? projects.filter(
        (p) =>
          String(p.projectCode).includes(searchCode.trim()) ||
          p.title.toLowerCase().includes(searchCode.trim().toLowerCase()) ||
          p.titleEn.toLowerCase().includes(searchCode.trim().toLowerCase())
      )
    : projects;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#0c051a] via-[#05020c] to-[#020005] border border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.4)] flex flex-col overflow-hidden text-right">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/40 bg-purple-950/20">
          <div className="flex items-center gap-2 text-purple-300">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <span className="font-bold text-sm tracking-wide">لوحة تحكم الباك إند المركزية (Admin Backend)</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-purple-900/30 hover:bg-purple-800/50 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-purple-600/30 border border-purple-400/50 text-purple-200 text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <CheckCircle className="w-4 h-4 text-purple-300 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: List & Search */}
          <div className="md:col-span-1 flex flex-col gap-4 border-l border-purple-900/30 pl-0 md:pl-4">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-purple-400" />
              <input
                type="text"
                placeholder="ابحث برقم الكود أو الاسم..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full bg-black/60 border border-purple-900/50 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProject(p)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedProject?.id === p.id
                      ? 'bg-purple-900/40 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'bg-black/40 border-purple-900/30 hover:border-purple-600/50'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-purple-400">كود: #{p.projectCode}</span>
                    <span className="text-xs font-bold text-white mt-0.5">{p.title}</span>
                  </div>
                  <Edit3 className="w-4 h-4 text-purple-300" />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-auto px-4 py-2 rounded-xl bg-red-950/30 border border-red-800/40 text-red-300 hover:bg-red-900/40 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة الافتراضي</span>
            </button>
          </div>

          {/* Right Column: Edit Form */}
          <div className="md:col-span-2 flex flex-col">
            {selectedProject ? (
              <form onSubmit={handleSaveProject} className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-purple-900/30">
                  <span className="text-xs font-mono text-purple-300">
                    تعديل المشروع: <strong className="text-white">{selectedProject.title}</strong> (#
                    {selectedProject.projectCode})
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>حفظ التعديلات</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-purple-300 mb-1">اسم المشروع (عربي)</label>
                    <input
                      type="text"
                      value={selectedProject.title}
                      onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })}
                      className="w-full bg-black/60 border border-purple-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-purple-300 mb-1">اسم المشروع (إنجليزي)</label>
                    <input
                      type="text"
                      value={selectedProject.titleEn}
                      onChange={(e) => setSelectedProject({ ...selectedProject, titleEn: e.target.value })}
                      className="w-full bg-black/60 border border-purple-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-purple-300 mb-1">وصف موجز (Tagline)</label>
                  <input
                    type="text"
                    value={selectedProject.tagline}
                    onChange={(e) => setSelectedProject({ ...selectedProject, tagline: e.target.value })}
                    className="w-full bg-black/60 border border-purple-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-purple-300 mb-1">الوصف التفصيلي</label>
                  <textarea
                    rows={2}
                    value={selectedProject.description}
                    onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                    className="w-full bg-black/60 border border-purple-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-purple-300 mb-1">رابط المشروع (Project URL)</label>
                    <input
                      type="text"
                      value={selectedProject.projectUrl || ''}
                      onChange={(e) => setSelectedProject({ ...selectedProject, projectUrl: e.target.value })}
                      className="w-full bg-black/60 border border-purple-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-purple-300 mb-1">رابط تليجرام (Telegram URL)</label>
                    <input
                      type="text"
                      value={selectedProject.telegramChatUrl || ''}
                      onChange={(e) => setSelectedProject({ ...selectedProject, telegramChatUrl: e.target.value })}
                      className="w-full bg-black/60 border border-purple-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-purple-300 mb-1">رابط صورة الـ QR / البوستر (QR Image URL)</label>
                    <input
                      type="text"
                      value={selectedProject.qrImageUrl || ''}
                      onChange={(e) => setSelectedProject({ ...selectedProject, qrImageUrl: e.target.value })}
                      className="w-full bg-black/60 border border-purple-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-purple-300 mb-1">كود المشروع (Project Code)</label>
                    <input
                      type="number"
                      value={selectedProject.projectCode}
                      onChange={(e) =>
                        setSelectedProject({ ...selectedProject, projectCode: parseInt(e.target.value) || 880 })
                      }
                      className="w-full bg-black/60 border border-purple-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-16 text-purple-300/50">
                <KeyRound className="w-12 h-12 mb-3 opacity-40 animate-pulse" />
                <p className="text-xs">اختر مشروعاً من القائمة الجانبية لتعديل بياناته وتفاصيله بالكامل.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
