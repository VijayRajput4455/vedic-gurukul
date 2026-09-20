// Web Audio API Synthesizer for Vedic Drone / Mantra Resonance

class VedicAudioEngine {
  private ctx: AudioContext | null = null;
  private oscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private isPlayingState: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playResonance(frequencyHz: number = 432, durationSeconds: number = 8): boolean {
    try {
      this.stop();
      this.initContext();
      if (!this.ctx) return false;

      const now = this.ctx.currentTime;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, now);
      // Smooth attack
      this.gainNode.gain.exponentialRampToValueAtTime(0.18, now + 1.2);
      // Gentle decay over the duration
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

      this.gainNode.connect(this.ctx.destination);

      // Fundamental harmonic (Root Drone: e.g. 108Hz / 432Hz)
      const baseFreq = frequencyHz > 200 ? frequencyHz / 4 : frequencyHz;
      const harmonics = [1, 1.5, 2, 3, 4]; // Fundamental, Fifth (Pa), Octave (Sa), Upper Fifth, Double Octave

      this.oscillators = harmonics.map((mult, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = idx === 0 ? 'sine' : idx === 1 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(baseFreq * mult, now);

        // Subtle slow detune for natural warmth & movement
        const detuneOsc = this.ctx!.createOscillator();
        const detuneGain = this.ctx!.createGain();
        detuneOsc.frequency.value = 0.2 + idx * 0.1;
        detuneGain.gain.value = 1.5;
        detuneOsc.connect(detuneGain);
        detuneGain.connect(osc.detune);
        detuneOsc.start(now);
        detuneOsc.stop(now + durationSeconds);

        const oscGain = this.ctx!.createGain();
        oscGain.gain.value = 1 / (idx + 1.2);
        osc.connect(oscGain);
        oscGain.connect(this.gainNode!);

        osc.start(now);
        osc.stop(now + durationSeconds);
        return osc;
      });

      this.isPlayingState = true;
      setTimeout(() => {
        this.isPlayingState = false;
      }, durationSeconds * 1000);

      return true;
    } catch (err) {
      console.warn('Web Audio synthesis not available or blocked by browser:', err);
      return false;
    }
  }

  public playBellChime(frequencyHz: number = 528): boolean {
    try {
      this.initContext();
      if (!this.ctx) return false;

      const now = this.ctx.currentTime;
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.18, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
      gainNode.connect(this.ctx.destination);

      // Bell harmonics
      const freqs = [frequencyHz, frequencyHz * 1.5, frequencyHz * 2.08, frequencyHz * 3.14];
      freqs.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);

        const oscGain = this.ctx!.createGain();
        oscGain.gain.value = 1 / (idx * 2 + 1);
        osc.connect(oscGain);
        oscGain.connect(gainNode);

        osc.start(now);
        osc.stop(now + 1.8);
      });

      return true;
    } catch {
      return false;
    }
  }

  public stop() {
    if (this.gainNode && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        setTimeout(() => {
          this.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) { /* ignore */ }
          });
          this.oscillators = [];
          this.gainNode = null;
        }, 300);
      } catch (e) {
        // ignore
      }
    }
    this.isPlayingState = false;
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }
}

export const vedicAudio = new VedicAudioEngine();
