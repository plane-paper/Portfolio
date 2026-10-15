import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContactContent from './contactContent';

test('shows example text without populating the contact fields', () => {
  render(<ContactContent />);
  expect(screen.getByRole('button', { name: 'Send Message' })).toBeDisabled();

  const examples = [
    ['Name', 'Jane Doe'],
    ['Email', 'john@example.com'],
    ['Subject', 'I love hard boiled eggs!'],
    ['Message', "Hi Richard, I also love hard boiled eggs. Let's get together and talk about them!"],
  ];

  examples.forEach(([label, example]) => {
    const field = screen.getByLabelText(label);
    expect(field).toHaveValue('');
    expect(field).toHaveAttribute('placeholder', example);
  });

  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Alex Smith' } });
  expect(screen.getByLabelText('Name')).toHaveValue('Alex Smith');
});

test('shows an invalid email error after blur and keeps sending disabled', () => {
  render(<ContactContent />);

  const emailField = screen.getByLabelText('Email');
  fireEvent.change(emailField, { target: { value: 'jane@example' } });
  fireEvent.blur(emailField);

  expect(screen.getByText('Invalid email')).toBeInTheDocument();
  expect(emailField).toHaveClass('border-red-500');
  expect(screen.getByRole('button', { name: 'Send Message' })).toBeDisabled();
});

test('enables sending only when every field is filled and email passes validation', () => {
  render(<ContactContent />);

  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } });
  fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Hello' } });

  const emailField = screen.getByLabelText('Email');
  fireEvent.blur(emailField);
  expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Send Message' })).toBeDisabled();

  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there' } });
  expect(screen.getByRole('button', { name: 'Send Message' })).toBeEnabled();

  fireEvent.change(emailField, { target: { value: 'invalid' } });
  expect(screen.getByRole('button', { name: 'Send Message' })).toBeDisabled();
});

test('shows the inline success animation after the API accepts the message', async () => {
  const originalFetch = global.fetch;
  const fetchMock = jest.fn().mockResolvedValue({ ok: true });
  global.fetch = fetchMock;
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  try {
    render(<ContactContent />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Hello' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there' } });
    fireEvent.blur(screen.getByLabelText('Email'));

    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    await waitFor(() => {
      expect(document.querySelector('.contact-fields-clearing')).toBeInTheDocument();
    });
    fireEvent.animationEnd(document.querySelector('.contact-fields-clearing'));

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Sent successfully!');
    });

    expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
      method: 'POST',
    }));
    expect(screen.getByRole('button', { name: 'Sent successfully!' })).toBeDisabled();
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Subject')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
    expect(alertSpy).not.toHaveBeenCalled();
  } finally {
    global.fetch = originalFetch;
    alertSpy.mockRestore();
  }
});
