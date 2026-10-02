import { Notification } from './notification-helper';

describe('Notification', () => {
  it('sets the given values', () => {
    expect(new Notification('message', 'danger', 500)).toMatchObject({
      message: 'message',
      style: 'danger',
      duration: 500,
    });
  });

  it('uses the info style by default', () => {
    expect(new Notification('message').style).toBe('info');
  });

  it('generates unique ids', () => {
    const ids = new Set(Array.from({ length: 1000 }, () => new Notification('message').id));

    expect(ids.size).toBe(1000);
  });
});
