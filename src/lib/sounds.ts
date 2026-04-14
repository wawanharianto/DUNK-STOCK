
const SOUNDS = {
  BOUNCE_LIGHT: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  BOUNCE_HARD: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
  BOUNCE_DOUBLE: 'https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3',
  SWISH: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  WHOOSH: 'https://assets.mixkit.co/active_storage/sfx/605/605-preview.mp3',
};

class SoundManager {
  private static instance: SoundManager;
  private enabled: boolean = true;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public initialize() {
    if (this.initialized) return;
    this.initialized = true;
    
    // Warm up the audio context by playing a silent sound
    const audio = new Audio();
    audio.play().catch(() => {});
    console.log('SoundManager initialized');
  }

  public play(soundUrl: string, volume: number = 0.4) {
    if (!this.enabled || !this.initialized) return;
    
    try {
      const audio = new Audio(soundUrl);
      audio.volume = volume;
      audio.play().catch(e => console.log('Audio play blocked:', e));
    } catch (e) {
      console.error('Error playing sound:', e);
    }
  }

  public playBounce() {
    this.play(SOUNDS.BOUNCE_HARD, 0.4);
  }

  public playSwish() {
    this.play(SOUNDS.SWISH, 0.5);
  }

  public playWhoosh() {
    this.play(SOUNDS.BOUNCE_DOUBLE, 0.3);
  }

  public playClick() {
    this.play(SOUNDS.BOUNCE_LIGHT, 0.2);
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public isEnabled() {
    return this.enabled;
  }
}

export const soundManager = SoundManager.getInstance();
