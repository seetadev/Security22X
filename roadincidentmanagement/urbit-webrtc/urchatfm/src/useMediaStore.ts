import create from 'zustand';
import { OngoingCall } from './useUrchatStore';
import { useMock } from './util';

type Track = MediaStreamTrack & {
  sender: RTCRtpSender;
}

interface Media {
  enabled: boolean;
  device: MediaDeviceInfo | null;
  tracks: Track[];
  toggle: () => void;
  changeDevice: (device: MediaDeviceInfo, call: OngoingCall) => void;
}

interface MediaStore {
  local: MediaStream;
  remote: MediaStream;
  video: Media;
  audio: Media;
  devices: MediaDeviceInfo[];
  getDevices: (call: OngoingCall) => Promise<void>;
  resetStreams: () => void;
}

export const useMediaStore = create<MediaStore>((set, get) => ({
  local: new MediaStream(),
  remote: new MediaStream(),
  video: {
    enabled: true,
    device: null,
    tracks: [],
    changeDevice: (device: MediaDeviceInfo, call: OngoingCall) => changeDevice(device, 'video', get(), call),
    toggle: () => {
      ;
      set({ video: toggleMedia(get().video) })
    }
  },
  audio: {
    enabled: true,
    device: null,
    tracks: [],
    changeDevice: (device: MediaDeviceInfo, call: OngoingCall) => changeDevice(device, 'audio', get(), call),
    toggle: () => {
      ;
      set({ audio: toggleMedia(get().audio) })
    }
  },
  devices: [],
  resetStreams: () => {
    set({
      local: new MediaStream(),
      remote: new MediaStream()
    })
  },
  getDevices: async (call: OngoingCall) => {
    const devices = await navigator.mediaDevices?.enumerateDevices();
    const videoDevs = devices.filter(dev => dev.kind === 'videoinput');
    const audioDevs = devices.filter(dev => dev.kind === 'audioinput');

    // Default to first video and audio device, and
    // trigger acquisition of microphone and camera permissions
    // via getUserMedia in effects below
    const video = await changeDevice(videoDevs[0], 'video', get(), call);
    const audio = useMock ? get().audio :  await changeDevice(audioDevs[0], 'audio', get(), call);
    set({ devices, video, audio })
  }
}))

function toggleMedia(media: Media): Media {
  ;
  media.enabled = !media.enabled;

  media.tracks.forEach(track => {
    track.enabled = media.enabled;
  });

  return media;
}

const prefs = {
  video: {
    facingMode: "user",
    width: 1280, 
    height: 719
  },
  audio: null
}

async function changeDevice(device: MediaDeviceInfo, type: 'audio' | 'video', state: MediaStore, call: OngoingCall): Promise<Media> {
  const media = state[type];
  const addTrack = (track: MediaStreamTrack) => {
    console.log('Adding track to call', track);
    state.local.addTrack(track);
    const sender = call.conn?.addTrack(track);
    (track as Track).sender = sender
    return track as Track;
  }

  const removeTrack = (track: Track) => {
    console.log('Removing track from call', track);
    state.local.removeTrack(track);
    try {
      call.conn?.removeTrack(track.sender);
    } catch (err) {
      console.log(err);
    }
    track.stop();
  }

  const constraints = { [type]: { deviceId: device.deviceId, ...prefs[type] } };
  const stream = await navigator.mediaDevices?.getUserMedia(constraints);
  
  ;
  media.tracks.forEach(removeTrack);
  media.tracks = type === 'audio' 
    ? stream.getAudioTracks().map(addTrack)
    : stream.getVideoTracks().map(addTrack); 

  media.device = device;

  return media;
}
