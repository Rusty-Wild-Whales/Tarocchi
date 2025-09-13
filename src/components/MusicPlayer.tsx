import backgroundMusic from "../assets/mystical song.wav";

class MusicPlayer {
  private static audio: HTMLAudioElement | null = null;

  static init() {
    if (!MusicPlayer.audio) {
      MusicPlayer.audio = new Audio(backgroundMusic);
      MusicPlayer.audio.loop = true;
      MusicPlayer.audio.volume = 0.5;
    }
  }

  static play() {
    MusicPlayer.init();
    MusicPlayer.audio?.play().catch((err) => {
      console.warn("Autoplay blocked:", err);
    });
  }

  static stop() {
    MusicPlayer.audio?.pause();
    if (MusicPlayer.audio) MusicPlayer.audio.currentTime = 0;
  }
}

export default MusicPlayer;
