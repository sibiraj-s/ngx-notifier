import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNotifier } from './ngx-notifier';
import { NgxNotifierService } from './services/ngx-notifier.service';

let component: NgxNotifier;
let fixture: ComponentFixture<NgxNotifier>;
let service: NgxNotifierService;

const messages = () =>
  Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.ngx-n-notification p')).map((p) =>
    p.textContent?.trim(),
  );

const render = async () => {
  fixture.detectChanges();
  await fixture.whenStable();
};

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [NgxNotifier],
  }).compileComponents();

  fixture = TestBed.createComponent(NgxNotifier);
  component = fixture.componentInstance;
  service = TestBed.inject(NgxNotifierService);
  fixture.detectChanges();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('NgxNotifier', () => {
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders nothing without notifications', () => {
    expect(fixture.nativeElement.querySelector('.ngx-notifier')).toBeNull();
  });

  it('renders created toasts with style', async () => {
    service.createToast('first', 'success');
    await render();

    const toast: HTMLElement = fixture.nativeElement.querySelector('.ngx-n-notification');

    expect(messages()).toEqual(['first']);
    expect(toast.classList).toContain('alert-success');
  });

  it('uses info style by default', async () => {
    service.createToast('first');
    await render();

    expect(fixture.nativeElement.querySelector('.ngx-n-notification').classList).toContain('alert-info');
  });

  it('inserts toasts on top by default', async () => {
    service.createToast('first');
    service.createToast('second');
    await render();

    expect(messages()).toEqual(['second', 'first']);
  });

  it('inserts toasts at the bottom', async () => {
    fixture.componentRef.setInput('insertOnTop', false);
    service.createToast('first');
    service.createToast('second');
    await render();

    expect(messages()).toEqual(['first', 'second']);
  });

  it('keeps at most max toasts', async () => {
    fixture.componentRef.setInput('max', 2);
    service.createToast('first');
    service.createToast('second');
    service.createToast('third');
    await render();

    expect(messages()).toEqual(['third', 'second']);
  });

  it('drops the oldest toasts when inserting at the bottom', async () => {
    fixture.componentRef.setInput('max', 2);
    fixture.componentRef.setInput('insertOnTop', false);
    service.createToast('first');
    service.createToast('second');
    service.createToast('third');
    await render();

    expect(messages()).toEqual(['second', 'third']);
  });

  it('allows duplicates by default', async () => {
    service.createToast('first');
    service.createToast('first');
    await render();

    expect(messages()).toEqual(['first', 'first']);
  });

  it('ignores duplicates when allowDuplicates is false', async () => {
    fixture.componentRef.setInput('allowDuplicates', false);
    service.createToast('first');
    service.createToast('first');
    await render();

    expect(messages()).toEqual(['first']);
  });

  it('clears all toasts', async () => {
    service.createToast('first');
    service.createToast('second');
    await render();

    service.clear();
    await render();

    expect(messages()).toEqual([]);
  });

  it('clears the last inserted toast', async () => {
    fixture.componentRef.setInput('insertOnTop', false);
    service.createToast('first');
    service.createToast('second');
    await render();

    service.clearLast();
    await render();

    expect(messages()).toEqual(['first']);
  });

  it('removes a toast with the close button', async () => {
    service.createToast('first');
    service.createToast('second');
    await render();

    (fixture.nativeElement.querySelector('.close') as HTMLElement).click();
    await render();

    expect(messages()).toEqual(['first']);
  });

  it('does not dismiss on click by default', async () => {
    service.createToast('first');
    await render();

    (fixture.nativeElement.querySelector('.ngx-n-notification') as HTMLElement).click();
    await render();

    expect(messages()).toEqual(['first']);
  });

  it('dismisses on click with dismissOnClick', async () => {
    fixture.componentRef.setInput('dismissOnClick', true);
    service.createToast('first');
    await render();

    (fixture.nativeElement.querySelector('.ngx-n-notification') as HTMLElement).click();
    await render();

    expect(messages()).toEqual([]);
  });

  it('removes each toast after its own duration', () => {
    vi.useFakeTimers();
    fixture.componentRef.setInput('duration', 1000);
    service.createToast('first');
    service.createToast('second', 'info', 3000);
    service.createToast('third');

    vi.advanceTimersByTime(1000);
    fixture.detectChanges();

    expect(messages()).toEqual(['second']);

    vi.advanceTimersByTime(2000);
    fixture.detectChanges();

    expect(messages()).toEqual([]);
  });
});

describe('NgxNotifier content', () => {
  it('renders sanitized HTML when allowHTML is set', async () => {
    fixture.componentRef.setInput('allowHTML', true);
    service.createToast('<b>bold</b><img src="x" onerror="alert(1)">');
    await render();

    const paragraph: HTMLElement = fixture.nativeElement.querySelector('.ngx-n-notification p');

    expect(paragraph.querySelector('b')?.textContent).toBe('bold');
    expect(paragraph.innerHTML).not.toContain('onerror');
  });

  it('renders HTML as text by default', async () => {
    service.createToast('<b>bold</b>');
    await render();

    expect(messages()).toEqual(['<b>bold</b>']);
  });

  it('applies the custom class', async () => {
    fixture.componentRef.setInput('className', 'custom');
    service.createToast('first');
    await render();

    expect(fixture.nativeElement.querySelector('.ngx-notifier').classList).toContain('custom');
  });
});

describe('NgxNotifier dismissing', () => {
  it('removes only the closed toast with dismissOnClick', async () => {
    fixture.componentRef.setInput('dismissOnClick', true);
    service.createToast('first');
    service.createToast('second');
    await render();

    (fixture.nativeElement.querySelector('.close') as HTMLElement).click();
    await render();

    expect(messages()).toEqual(['first']);
  });

  it('dismisses the clicked toast with dismissOnClick', async () => {
    fixture.componentRef.setInput('dismissOnClick', true);
    service.createToast('first');
    service.createToast('second');
    await render();

    (fixture.nativeElement.querySelectorAll('.ngx-n-notification')[1] as HTMLElement).click();
    await render();

    expect(messages()).toEqual(['second']);
  });

  it('removes a toast by index', async () => {
    service.createToast('first');
    service.createToast('second');
    await render();

    component.removeNotification(1);
    await render();

    expect(messages()).toEqual(['second']);
  });

  it('removes toasts after the default duration of 60s', () => {
    vi.useFakeTimers();
    service.createToast('first');
    fixture.detectChanges();

    vi.advanceTimersByTime(59999);
    fixture.detectChanges();

    expect(messages()).toEqual(['first']);

    vi.advanceTimersByTime(1);
    fixture.detectChanges();

    expect(messages()).toEqual([]);
  });

  it('stops receiving toasts once destroyed', () => {
    fixture.destroy();

    expect(() => service.createToast('first')).not.toThrow();
    expect(component.notifications).toEqual([]);
  });
});

describe('NgxNotifier clearLast', () => {
  it('clears the newest toasts one by one', async () => {
    service.createToast('first');
    service.createToast('second');
    service.createToast('third');

    service.clearLast();
    service.clearLast();
    await render();

    expect(messages()).toEqual(['first']);
  });

  it('clears the newest remaining toast when the newest was already closed', async () => {
    service.createToast('first');
    service.createToast('second');
    service.createToast('third');
    await render();

    // close the newest toast, which is on top
    (fixture.nativeElement.querySelector('.close') as HTMLElement).click();
    service.clearLast();
    await render();

    expect(messages()).toEqual(['first']);
  });

  it('clears the newest toast when inserting at the bottom', async () => {
    fixture.componentRef.setInput('insertOnTop', false);
    service.createToast('first');
    service.createToast('second');
    service.clearLast();
    service.clearLast();
    await render();

    expect(messages()).toEqual([]);
  });

  it('does nothing without toasts', async () => {
    service.clearLast();
    await render();

    expect(messages()).toEqual([]);
  });
});

describe('NgxNotifier duplicates with HTML', () => {
  it('ignores duplicate HTML messages that are changed by sanitization', async () => {
    fixture.componentRef.setInput('allowHTML', true);
    fixture.componentRef.setInput('allowDuplicates', false);
    service.createToast('<b onclick="alert(1)">bold</b>');
    service.createToast('<b onclick="alert(1)">bold</b>');
    await render();

    expect(messages()).toEqual(['bold']);
  });

  it('allows the same message again once it is removed', async () => {
    fixture.componentRef.setInput('allowDuplicates', false);
    service.createToast('first');
    service.clearLast();
    service.createToast('first');
    await render();

    expect(messages()).toEqual(['first']);
  });
});
