import { Agent } from '../data/agents';

type VoiceType = 'professional' | 'analytical' | 'calm' | 'default';

const voiceMapping: Record<string, VoiceType> = {
  'Sift': 'professional',
  'Fang': 'analytical',
  'Triage': 'analytical',
  'BidSentry': 'calm',
  'DemoScope': 'professional',
  'Shear': 'calm',
  'Field Hustle': 'calm',
  'Prod': 'professional',
  'default': 'default'
};

const mockVoiceConfig: Record<VoiceType, { rate: number; pitch: number }> = {
  professional: { rate: 0.9, pitch: 0.9 },
  analytical: { rate: 1.0, pitch: 1.0 },
  calm: { rate: 0.85, pitch: 0.9 },
  default: { rate: 1.0, pitch: 1.0 }
};

class VoiceSynthService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private initialized: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    
    if (this.synth) {
      this.loadVoices();

      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = this.loadVoices.bind(this);
      }
    }
  }

  private loadVoices(): void {
    this.voices = this.synth.getVoices();
    this.initialized = this.voices.length > 0;
    console.log('Voices loaded:', this.voices.length);
  }

  speak(message: string, agentName: string): void {
    if (!this.synth || !this.initialized) {
      console.warn('Speech synthesis not supported or initialized');
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(message);
    
    const voiceType = voiceMapping[agentName] || voiceMapping.default;
    const voiceConfig = mockVoiceConfig[voiceType];
    
    utterance.rate = voiceConfig.rate;
    utterance.pitch = voiceConfig.pitch;
    
    let selectedVoice = this.voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Samantha') ||
      voice.name.includes('Daniel')
    );
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  isSupported(): boolean {
    return window.speechSynthesis !== undefined;
  }

  isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }
}

const voiceSynth = new VoiceSynthService();
export default voiceSynth;