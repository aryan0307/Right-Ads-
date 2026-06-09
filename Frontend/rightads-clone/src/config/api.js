export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:9000';
export const WS_BASE = import.meta.env.VITE_WS_URL || 'ws://localhost:9000';

export async function apiRequest(path, { method = 'GET', body, token, isFormData = false } = {}) {
  const headers = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body !== undefined) {
    options.body = isFormData ? body : JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${path}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = typeof data.detail === 'string'
      ? data.detail
      : Array.isArray(data.detail)
        ? data.detail.map((d) => d.msg).join(', ')
        : data.error || 'Request failed';
    const error = new Error(detail);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function submitLead({ name, email, phone, service_required, budget, message }) {
  return apiRequest('/api/leads', {
    method: 'POST',
    body: { name, email, phone, service_required, budget, message },
  });
}

export function updateRecordStatus(module, recordId, status, token, createMeeting = true) {
  return apiRequest(`/api/admin/records/${module}/${recordId}/status`, {
    method: 'PATCH',
    token,
    body: { status, create_meeting: createMeeting },
  });
}

export function updateMeetingStatus(meetingId, status, token) {
  return apiRequest(`/api/admin/meetings/${meetingId}/status`, {
    method: 'PATCH',
    token,
    body: { status },
  });
}

export function verifyMeetingAccess(email, roomId) {
  return apiRequest('/api/contact/meeting-access', {
    method: 'POST',
    body: { email, room_id: roomId },
  });
}

export function getMeetingMessages(roomId, email) {
  return apiRequest(`/api/contact/meeting-messages/${roomId}?email=${encodeURIComponent(email)}`);
}

export function getWebSocketUrl(roomId, email) {
  return `${WS_BASE}/ws/meeting/${roomId}?email=${encodeURIComponent(email)}`;
}
