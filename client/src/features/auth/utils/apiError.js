const FIELD_LABELS = {
  name: 'Name',
  email: 'Email',
  password: 'Password',
  enrollment: 'Enrollment ID',
  mobile: 'Mobile',
  collegeEmail: 'College Email',
  department: 'Department',
  token: 'Reset token',
  newPassword: 'New password'
};

const prettifyFieldName = (field) => {
  if (FIELD_LABELS[field]) {
    return FIELD_LABELS[field];
  }
  return field.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
};

export const getApiErrorMessages = (err, fallbackMessage = 'Request failed') => {
  const responseData = err?.response?.data;
  if (!responseData) {
    return [fallbackMessage];
  }

  if (responseData.message !== 'Validation failed') {
    return [responseData.message || fallbackMessage];
  }

  const details = responseData.details || {};
  const fieldErrors = details.fieldErrors || {};
  const formErrors = Array.isArray(details.formErrors) ? details.formErrors : [];

  const messages = [];

  for (const [field, value] of Object.entries(fieldErrors)) {
    const fieldMessages = Array.isArray(value) ? value : [value];
    for (const message of fieldMessages) {
      if (!message) continue;
      messages.push(`${prettifyFieldName(field)}: ${message}`);
    }
  }

  for (const message of formErrors) {
    if (message) messages.push(message);
  }

  if (messages.length > 0) {
    return messages;
  }

  return [responseData.message || fallbackMessage];
};
