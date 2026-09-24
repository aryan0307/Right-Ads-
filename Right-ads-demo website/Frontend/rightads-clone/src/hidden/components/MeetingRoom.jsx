import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Video, Mic, VideoOff, Monitor, PhoneOff, Mail, ShieldAlert } from 'lucide-react';
import MeetingCard from './MeetingCard';
import ChatPanel from './ChatPanel';
import { verifyMeetingAccess } from '../../config/api';
import '../styles/meeting.css';

const sessionKey = (room) => `rightads_meeting_session_${room}`;

const MeetingRoom = ({ darkMode }) => {
  const { roomId } = useParams();
  const [email, setEmail] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [accessDenied, setAccessDenied] = useState('');
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(sessionKey(roomId));
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email) {
          setEmail(parsed.email);
          setClientName(parsed.clientName || 'Client');
        }
      }
    } catch {
      sessionStorage.removeItem(sessionKey(roomId));
    }
  }, [roomId]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setAccessDenied('');
    try {
      const result = await verifyMeetingAccess(inputEmail, roomId);
      if (result.allowed) {
        const verifiedEmail = inputEmail.trim().toLowerCase();
        const name = result.client_name || 'Client';
        setEmail(verifiedEmail);
        setClientName(name);
        sessionStorage.setItem(sessionKey(roomId), JSON.stringify({ email: verifiedEmail, clientName: name }));
      } else {
        setAccessDenied(result.message || 'Unauthorized Meeting Access');
      }
    } catch (err) {
      setAccessDenied(err.message || 'Unauthorized Meeting Access');
    } finally {
      setVerifying(false);
    }
  };

  if (!email) {
    return (
      <div className={`meeting-room meeting-access-gate ${darkMode ? 'dark' : 'light'}`}>
        <div className="meeting-access-card floating-glass floating-glass--static">
          <span className="meeting-future-label">Future Consultation Portal</span>
          <h1>Join Meeting</h1>
          <p>Enter the email address you used when submitting your request.</p>
          <form onSubmit={handleVerify} className="meeting-access-form">
            <div className="meeting-access-input-wrap">
              <Mail size={20} />
              <input
                type="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            {accessDenied && (
              <div className="meeting-access-denied">
                <ShieldAlert size={18} />
                {accessDenied}
              </div>
            )}
            <button type="submit" className="meeting-access-btn" disabled={verifying}>
              {verifying ? 'Verifying...' : 'Join Meeting'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`meeting-room ${darkMode ? 'dark' : 'light'}`}>
      <header className="meeting-room-header floating-glass floating-glass--static">
        <div>
          <span className="meeting-future-label">Future Consultation Portal</span>
          <h1>Room: {roomId}</h1>
          <p className="meeting-user-label">Joined as {clientName} ({email})</p>
        </div>
        <p className="meeting-disclaimer">Video conferencing coming soon — architecture preview only</p>
      </header>

      <div className="meeting-room-body">
        <div className="meeting-main-area">
          <div className="meeting-video-grid">
            <div className="meeting-video-placeholder floating-glass float-md">
              <Video size={48} />
              <span>Video Placeholder</span>
              <p>WebRTC integration will connect here</p>
            </div>
            <div className="meeting-video-placeholder floating-glass float-sm secondary">
              <Video size={32} />
              <span>Audio Placeholder</span>
              <p>Participant audio stream</p>
            </div>
          </div>

          <div className="meeting-participants-row">
            <MeetingCard name="Consultant" role="Host" isActive />
            <MeetingCard name={clientName} role="Client" />
            <MeetingCard name="You" role="Guest" />
          </div>

          <div className="meeting-controls floating-glass floating-glass--static">
            <button type="button" className="meeting-control-btn" aria-label="Toggle microphone">
              <Mic size={20} />
            </button>
            <button type="button" className="meeting-control-btn" aria-label="Toggle camera">
              <VideoOff size={20} />
            </button>
            <button type="button" className="meeting-control-btn" aria-label="Screen share">
              <Monitor size={20} />
            </button>
            <button type="button" className="meeting-control-btn end-call" aria-label="End call">
              <PhoneOff size={20} />
            </button>
          </div>
        </div>

        <ChatPanel roomId={roomId} email={email} enabled />
      </div>
    </div>
  );
};

export default MeetingRoom;
