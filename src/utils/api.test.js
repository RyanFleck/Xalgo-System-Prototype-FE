import { isAccessTokenValid, isExpiryDateValid } from './api';

test('isDateValid future time', () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 5);
  expect(isExpiryDateValid(now)).toBe(true);
});

test('isDateValid past time', () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - 5);
  expect(isExpiryDateValid(now)).toBe(false);
});
