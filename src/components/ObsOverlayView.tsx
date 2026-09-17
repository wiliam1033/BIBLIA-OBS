import React, { useEffect, useState } from 'react';
import { BibleRenderer } from './BibleRenderer';
import { ActiveProjectionState } from '../types';
import { broadcastService } from '../services/broadcastService';

export const ObsOverlayView: React.FC = () => {
  const [state, setState] = useState<ActiveProjectionState>(() => broadcastService.getInitialState());
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    // Subscribe to real-time broadcast updates from the operator console
    const unsubscribe = broadcastService.subscribe((newState) => {
      setState(newState);
      setConnected(true);
    });

    // Also poll state every 1.5s as safety check for OBS browser source instances
    const interval = setInterval(() => {
      const current = broadcastService.getInitialState();
      if (current.timestamp !== state.timestamp) {
        setState(current);
      }
    }, 1200);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [state.timestamp]);

  return (
    <div id="obs-overlay-root" className="w-screen h-screen overflow-hidden bg-transparent m-0 p-0 select-none">
      <BibleRenderer state={state} previewMode={false} />
    </div>
  );
};
