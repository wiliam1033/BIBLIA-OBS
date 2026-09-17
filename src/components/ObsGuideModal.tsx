import React, { useState } from 'react';
import { 
  Tv, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  Github, 
  Monitor, 
  Layers, 
  X,
  Code2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ObsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ObsGuideModal: React.FC<ObsGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedDockUrl, setCopiedDockUrl] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);
  const [activeTab, setActiveTab] = useState<'browser' | 'dock' | 'standalone' | 'github'>('browser');

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const overlayUrl = `${currentOrigin}/?overlay=true`;
  const dockUrl = `${currentOrigin}/`;

  const obsCustomCss = `/* CSS para OBS Studio - Fondo 100% Transparente */
body {
  background-color: rgba(0, 0, 0, 0) !important;
  margin: 0px auto;
  overflow: hidden;
}`;

  const copyToClipboard = (text: string, type: 'url' | 'dock' | 'css') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else if (type === 'dock') {
      setCopiedDockUrl(true);
      setTimeout(() => setCopiedDockUrl(false), 2000);
    } else {
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2000);
    }
  };

  const handleDownloadStandaloneHtml = () => {
    const standaloneHtmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Biblia RVR1960 OBS Overlay Local Plugin</title>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0;
      width: 100vw; height: 100vh;
      background: transparent !important;
      overflow: hidden;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    #root-container {
      width: 100%; height: 100%;
      display: flex; flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      padding-bottom: 40px;
    }
    .verse-card {
      max-width: 90%;
      background: rgba(9, 13, 22, 0.88);
      border: 1.5px solid #eab308;
      border-radius: 12px;
      padding: 24px;
      color: #ffffff;
      box-shadow: 0 10px 30px rgba(0,0,0,0.7);
      backdrop-filter: blur(8px);
      transition: all 0.3s ease-out;
    }
    .verse-text {
      font-size: 28px;
      line-height: 1.4;
      text-shadow: 0 2px 8px rgba(0,0,0,0.8);
    }
    .verse-ref {
      margin-top: 10px;
      font-size: 18px;
      font-weight: bold;
      color: #fde047;
      text-align: right;
    }
  </style>
</head>
<body>
  <div id="root-container">
    <div id="verse-card" class="verse-card">
      <div id="verse-text" class="verse-text">“Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.”</div>
      <div id="verse-ref" class="verse-ref">Juan 3:16 — RVR1960</div>
    </div>
  </div>

  <script>
    const channel = new BroadcastChannel('rvr1960_bible_obs_channel');
    channel.onmessage = (event) => {
      if (event.data && event.data.type === 'PROJECTION_UPDATE') {
        const state = event.data.state;
        const card = document.getElementById('verse-card');
        const textElem = document.getElementById('verse-text');
        const refElem = document.getElementById('verse-ref');
        
        if (state.isBlack || state.isBlank || !state.isLive || !state.currentVerse) {
          card.style.opacity = '0';
        } else {
          card.style.opacity = '1';
          textElem.innerText = state.currentVerse.text;
          refElem.innerText = (state.referenceDisplay || (state.currentVerse.bookName + ' ' + state.currentVerse.chapter + ':' + state.currentVerse.verse)) + ' — RVR1960';
        }
      }
    };
  </script>
</body>
</html>`;

    const blob = new Blob([standaloneHtmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'obs_biblia_overlay_plugin.html';
    link.click();
    URL.revokeObjectURL(url);

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Tv className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Guía de Instalación en OBS Studio & Despliegue
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Conecta la Biblia RVR 1960 a tu transmisión en vivo mediante Fuente de Navegador o Panel Acoplable en OBS.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 mb-4 text-xs">
          <button
            onClick={() => setActiveTab('browser')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'browser' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>1. Fuente Navegador OBS</span>
          </button>

          <button
            onClick={() => setActiveTab('dock')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'dock' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Panel Acoplable (Dock)</span>
          </button>

          <button
            onClick={() => setActiveTab('standalone')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'standalone' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>3. Plugin HTML Local</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'github' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>4. GitHub & Deploy</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs text-slate-300">
          {/* TAB 1: OBS Browser Source */}
          {activeTab === 'browser' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">
                    URL para Fuente de Navegador (Browser Source):
                  </span>
                  <button
                    onClick={() => copyToClipboard(overlayUrl, 'url')}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1 text-[11px] transition-all"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUrl ? 'Copiado' : 'Copiar Enlace'}</span>
                  </button>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 font-mono text-[11px] text-blue-300 break-all select-all border border-slate-800">
                  {overlayUrl}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Pasos para agregar en OBS Studio:
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 pl-1 text-slate-300 leading-relaxed">
                  <li>Abre <strong>OBS Studio</strong>.</li>
                  <li>En el panel <strong>Fuentes</strong>, haz clic en el botón <strong>+</strong> y selecciona <strong>Navegador</strong> (Browser Source).</li>
                  <li>Asígnale un nombre (ej. <em>"Biblia RVR1960 Pro"</em>).</li>
                  <li>Pega la URL de arriba en el campo <strong>URL</strong>.</li>
                  <li>Configura el tamaño: <strong>Ancho: 1920</strong> y <strong>Alto: 1080</strong> (o la resolución de tu lienzo).</li>
                  <li>Marca la casilla: <em>"Apagar fuente cuando no sea visible"</em> y <em>"Actualizar el navegador cuando la escena se active"</em>.</li>
                  <li>¡Listo! Cualquier versículo que selecciones en el panel se transmitirá instantáneamente sobre tu video en OBS con fondo transparente o fondo de adoración.</li>
                </ol>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">CSS Personalizado de OBS (Opcional):</span>
                  <button
                    onClick={() => copyToClipboard(obsCustomCss, 'css')}
                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                  >
                    {copiedCss ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCss ? 'Copiado' : 'Copiar CSS'}</span>
                  </button>
                </div>
                <pre className="p-2 rounded bg-slate-900 text-[10px] font-mono text-slate-400 overflow-x-auto">
                  {obsCustomCss}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: OBS Custom Dock */}
          {activeTab === 'dock' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">
                    URL para Panel Acoplable de OBS (Dock):
                  </span>
                  <button
                    onClick={() => copyToClipboard(dockUrl, 'dock')}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1 text-[11px]"
                  >
                    {copiedDockUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDockUrl ? 'Copiado' : 'Copiar Enlace'}</span>
                  </button>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 font-mono text-[11px] text-blue-300 break-all select-all border border-slate-800">
                  {dockUrl}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Controla la Biblia directamente dentro de OBS Studio:
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 pl-1 text-slate-300 leading-relaxed">
                  <li>En OBS Studio, ve al menú superior: <strong>Paneles (Docks)</strong> &gt; <strong>Paneles de explorador personalizados...</strong></li>
                  <li>En <strong>Nombre del panel</strong> escribe: <em>"Control Biblia RVR1960"</em>.</li>
                  <li>En <strong>URL</strong> pega la dirección de arriba.</li>
                  <li>Haz clic en <strong>Aplicar</strong>.</li>
                  <li>¡Ahora se abrirá una ventana dentro de OBS que puedes arrastrar y acoplar junto a tu mezclador de audio o escenas para cambiar versículos con 1 clic sin salir de OBS!</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 3: Standalone Offline HTML File */}
          {activeTab === 'standalone' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Download className="w-5 h-5 text-amber-400" />
                  <span>Descargar Plugin / Overlay Standalone (.html)</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  Si deseas usar el overlay de manera 100% local en tu computadora sin depender de internet, puedes descargar este archivo HTML standalone y cargarlo en OBS seleccionando la opción <em>"Archivo local"</em> en la Fuente de Navegador.
                </p>

                <button
                  onClick={handleDownloadStandaloneHtml}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 active:scale-98 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar obs_biblia_overlay_plugin.html</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 text-[11px] text-slate-400">
                <p>💡 <strong>Consejo Pro:</strong> Puedes colocar este archivo en tu carpeta de recursos de OBS (ej. <code>C:\OBS\Plugins\Biblia\</code>) para tenerlo siempre disponible en tus escenas de culto.</p>
              </div>
            </div>
          )}

          {/* TAB 4: GitHub & Deployment */}
          {activeTab === 'github' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Github className="w-4 h-4 text-slate-300" />
                  <span>Comandos para subir a GitHub & Desplegar:</span>
                </div>
                <pre className="p-2.5 rounded-xl bg-slate-900 text-[11px] font-mono text-amber-300 overflow-x-auto leading-relaxed border border-slate-800">
{`git init
git add .
git commit -m "feat: Biblia Reina Valera 1960 Pro para OBS"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/biblia-rvr1960-obs.git
git push -u origin main`}
                </pre>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 text-slate-300 text-xs">
                <div className="font-bold text-white mb-1">Despliegue con 1 clic:</div>
                <p>Este proyecto está optimizado con Vite + React 19 + Tailwind CSS y se puede desplegar instantáneamente en <strong>Vercel</strong>, <strong>Netlify</strong> o <strong>Cloud Run</strong> para obtener tu URL pública HTTPS segura para OBS Studio.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 mt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
