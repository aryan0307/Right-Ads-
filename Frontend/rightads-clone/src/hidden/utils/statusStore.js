const BACKEND_TO_UNIFIED = {
  New: 'Pending',
  Pending: 'Pending',
  Contacted: 'Pending',
  'In Progress': 'Pending',
  Reviewed: 'Pending',
  Shortlisted: 'Pending',
  Converted: 'Approved',
  Selected: 'Approved',
  Valid: 'Approved',
  Closed: 'Declined',
  Rejected: 'Declined',
  Revoked: 'Declined',
  Approved: 'Approved',
  Declined: 'Declined',
};

export function getUnifiedStatus(backendStatus) {
  return BACKEND_TO_UNIFIED[backendStatus] || backendStatus || 'Pending';
}
