import { Resend } from 'resend';
import handler from '../../api/contact';

jest.mock('resend', () => ({
  Resend: jest.fn(),
}));

test('returns an error when Resend rejects the email', async () => {
  const providerError = {
    name: 'validation_error',
    message: 'The sender domain is not verified',
    statusCode: 422,
  };
  const send = jest.fn().mockResolvedValue({ data: null, error: providerError });
  Resend.mockImplementation(() => ({ emails: { send } }));
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  await handler(
    {
      method: 'POST',
      body: { name: 'Jane Doe', email: 'jane@example.com', subject: 'Hello', message: 'Hi' },
    },
    response,
  );

  expect(send).toHaveBeenCalled();
  expect(response.status).toHaveBeenCalledWith(502);
  expect(response.json).toHaveBeenCalledWith({ error: providerError });
});
