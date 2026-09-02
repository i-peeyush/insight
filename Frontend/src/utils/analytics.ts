export type AnalyticsEvent = 
  | 'quote_started'
  | 'quote_submitted'
  | 'booking_started'
  | 'booking_completed'
  | 'phone_clicked'
  | 'contact_submitted'
  | 'service_viewed'
  | 'pest_viewed'
  | 'location_viewed'
  | 'newsletter_subscribed';

export interface EventProperties {
  [key: string]: any;
}

class AnalyticsService {
  private isEnabled: boolean = true;

  public track(event: AnalyticsEvent, properties?: EventProperties) {
    if (!this.isEnabled) return;
    
    // Log in development / demo mode
    console.log(`[Insight Analytics] Track Event: ${event}`, properties || {});

    // Hook to window for GA / GTM / Meta Pixel if available
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (typeof win.gtag === 'function') {
        win.gtag('event', event, properties);
      }
      if (typeof win.fbq === 'function') {
        win.fbq('trackCustom', event, properties);
      }
    }
  }

  public pageView(pagePath: string) {
    this.track('service_viewed', { path: pagePath });
  }
}

export const analytics = new AnalyticsService();
