import { empty, Observable, of } from 'rxjs';
import { sampleTime, share, startWith } from 'rxjs/operators';
import { SharedHooks } from '../shared-hooks/hooks';
import { Rect } from './rect';
export class ScrollHooks extends SharedHooks {
    constructor() {
        super(...arguments);
        this.getWindow = () => window;
        this.scrollListeners = new WeakMap();
        // Only create one scroll listener per target and share the observable.
        // Typical, there will only be one observable per application
        this.getScrollListener = (scrollTarget) => {
            if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
                console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
                return empty();
            }
            const scrollListener = this.scrollListeners.get(scrollTarget);
            if (scrollListener) {
                return scrollListener;
            }
            const srollEvent = Observable.create((observer) => {
                const eventName = 'scroll';
                const handler = (event) => observer.next(event);
                const options = { passive: true, capture: false };
                scrollTarget.addEventListener(eventName, handler, options);
                return () => scrollTarget.removeEventListener(eventName, handler, options);
            });
            const listener = this.sampleObservable(srollEvent);
            this.scrollListeners.set(scrollTarget, listener);
            return listener;
        };
    }
    getObservable(attributes) {
        if (this.skipLazyLoading(attributes)) {
            return of('load');
        }
        else if (attributes.customObservable) {
            return attributes.customObservable.pipe(startWith(''));
        }
        else if (attributes.scrollContainer) {
            return this.getScrollListener(attributes.scrollContainer);
        }
        return this.getScrollListener(this.getWindow());
    }
    isVisible(event, attributes) {
        const elementBounds = Rect.fromElement(attributes.element);
        if (elementBounds === Rect.empty) {
            return false;
        }
        const windowBounds = Rect.fromWindow(this.getWindow());
        elementBounds.inflate(attributes.offset);
        if (attributes.scrollContainer) {
            const scrollContainerBounds = Rect.fromElement(attributes.scrollContainer);
            const intersection = scrollContainerBounds.getIntersectionWith(windowBounds);
            return elementBounds.intersectsWith(intersection);
        }
        else {
            return elementBounds.intersectsWith(windowBounds);
        }
    }
    sampleObservable(obs, scheduler) {
        return obs.pipe(sampleTime(100, scheduler), share(), startWith(''));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9va3MuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vIiwic291cmNlcyI6WyJzcmMvc2Nyb2xsLWhvb2tzL2hvb2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFcEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUU5QixNQUFNLE9BQU8sV0FBWSxTQUFRLFdBQTJCO0lBQTVEOztRQUNZLGNBQVMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDbEIsb0JBQWUsR0FBRyxJQUFJLE9BQU8sRUFBd0IsQ0FBQztRQWtDdkUsdUVBQXVFO1FBQ3ZFLDZEQUE2RDtRQUM3RCxzQkFBaUIsR0FBRyxDQUFDLFlBQW1DLEVBQTBCLEVBQUU7WUFDbEYsSUFBSSxDQUFDLFlBQVksSUFBSSxPQUFPLFlBQVksQ0FBQyxnQkFBZ0IsS0FBSyxVQUFVLEVBQUU7Z0JBQ3hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsWUFBWSxHQUFHLHlEQUF5RCxDQUFDLENBQUM7Z0JBQ2xILE9BQU8sS0FBSyxFQUFFLENBQUM7YUFDaEI7WUFDRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5RCxJQUFJLGNBQWMsRUFBRTtnQkFDbEIsT0FBTyxjQUFjLENBQUM7YUFDdkI7WUFFRCxNQUFNLFVBQVUsR0FBc0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQXdCLEVBQUUsRUFBRTtnQkFDbkYsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDO2dCQUMzQixNQUFNLE9BQU8sR0FBRyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxPQUFPLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztnQkFDbEQsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzNELE9BQU8sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDN0UsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUMsQ0FBQztJQUNKLENBQUM7SUF4REMsYUFBYSxDQUFDLFVBQXNDO1FBQ2xELElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNwQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuQjthQUFNLElBQUksVUFBVSxDQUFDLGdCQUFnQixFQUFFO1lBQ3RDLE9BQU8sVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN4RDthQUFNLElBQUksVUFBVSxDQUFDLGVBQWUsRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDM0Q7UUFDRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQXFCLEVBQUUsVUFBc0I7UUFDckQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0QsSUFBSSxhQUFhLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNoQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUN2RCxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6QyxJQUFJLFVBQVUsQ0FBQyxlQUFlLEVBQUU7WUFDOUIsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMzRSxNQUFNLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM3RSxPQUFPLGFBQWEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNMLE9BQU8sYUFBYSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFFRCxnQkFBZ0IsQ0FBSSxHQUFrQixFQUFFLFNBQWU7UUFDckQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQTBCRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVtcHR5LCBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2FtcGxlVGltZSwgc2hhcmUsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNoYXJlZEhvb2tzIH0gZnJvbSAnLi4vc2hhcmVkLWhvb2tzL2hvb2tzJztcbmltcG9ydCB7IEF0dHJpYnV0ZXMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBSZWN0IH0gZnJvbSAnLi9yZWN0JztcblxuZXhwb3J0IGNsYXNzIFNjcm9sbEhvb2tzIGV4dGVuZHMgU2hhcmVkSG9va3M8RXZlbnQgfCBzdHJpbmc+IHtcbiAgcHJvdGVjdGVkIGdldFdpbmRvdyA9ICgpID0+IHdpbmRvdztcbiAgcHJpdmF0ZSByZWFkb25seSBzY3JvbGxMaXN0ZW5lcnMgPSBuZXcgV2Vha01hcDxhbnksIE9ic2VydmFibGU8YW55Pj4oKTtcblxuICBnZXRPYnNlcnZhYmxlKGF0dHJpYnV0ZXM6IEF0dHJpYnV0ZXM8RXZlbnQgfCBzdHJpbmc+KTogT2JzZXJ2YWJsZTxFdmVudCB8IHN0cmluZz4ge1xuICAgIGlmICh0aGlzLnNraXBMYXp5TG9hZGluZyhhdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuIG9mKCdsb2FkJyk7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVzLmN1c3RvbU9ic2VydmFibGUpIHtcbiAgICAgIHJldHVybiBhdHRyaWJ1dGVzLmN1c3RvbU9ic2VydmFibGUucGlwZShzdGFydFdpdGgoJycpKTtcbiAgICB9IGVsc2UgaWYgKGF0dHJpYnV0ZXMuc2Nyb2xsQ29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTY3JvbGxMaXN0ZW5lcihhdHRyaWJ1dGVzLnNjcm9sbENvbnRhaW5lcik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldFNjcm9sbExpc3RlbmVyKHRoaXMuZ2V0V2luZG93KCkpO1xuICB9XG5cbiAgaXNWaXNpYmxlKGV2ZW50OiBFdmVudCB8IHN0cmluZywgYXR0cmlidXRlczogQXR0cmlidXRlcyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVsZW1lbnRCb3VuZHMgPSBSZWN0LmZyb21FbGVtZW50KGF0dHJpYnV0ZXMuZWxlbWVudCk7XG4gICAgaWYgKGVsZW1lbnRCb3VuZHMgPT09IFJlY3QuZW1wdHkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3Qgd2luZG93Qm91bmRzID0gUmVjdC5mcm9tV2luZG93KHRoaXMuZ2V0V2luZG93KCkpO1xuICAgIGVsZW1lbnRCb3VuZHMuaW5mbGF0ZShhdHRyaWJ1dGVzLm9mZnNldCk7XG5cbiAgICBpZiAoYXR0cmlidXRlcy5zY3JvbGxDb250YWluZXIpIHtcbiAgICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lckJvdW5kcyA9IFJlY3QuZnJvbUVsZW1lbnQoYXR0cmlidXRlcy5zY3JvbGxDb250YWluZXIpO1xuICAgICAgY29uc3QgaW50ZXJzZWN0aW9uID0gc2Nyb2xsQ29udGFpbmVyQm91bmRzLmdldEludGVyc2VjdGlvbldpdGgod2luZG93Qm91bmRzKTtcbiAgICAgIHJldHVybiBlbGVtZW50Qm91bmRzLmludGVyc2VjdHNXaXRoKGludGVyc2VjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlbGVtZW50Qm91bmRzLmludGVyc2VjdHNXaXRoKHdpbmRvd0JvdW5kcyk7XG4gICAgfVxuICB9XG5cbiAgc2FtcGxlT2JzZXJ2YWJsZTxUPihvYnM6IE9ic2VydmFibGU8VD4sIHNjaGVkdWxlcj86IGFueSk6IE9ic2VydmFibGU8VCB8ICcnPiB7XG4gICAgcmV0dXJuIG9icy5waXBlKHNhbXBsZVRpbWUoMTAwLCBzY2hlZHVsZXIpLCBzaGFyZSgpLCBzdGFydFdpdGgoJycpKTtcbiAgfVxuXG4gIC8vIE9ubHkgY3JlYXRlIG9uZSBzY3JvbGwgbGlzdGVuZXIgcGVyIHRhcmdldCBhbmQgc2hhcmUgdGhlIG9ic2VydmFibGUuXG4gIC8vIFR5cGljYWwsIHRoZXJlIHdpbGwgb25seSBiZSBvbmUgb2JzZXJ2YWJsZSBwZXIgYXBwbGljYXRpb25cbiAgZ2V0U2Nyb2xsTGlzdGVuZXIgPSAoc2Nyb2xsVGFyZ2V0PzogSFRNTEVsZW1lbnQgfCBXaW5kb3cpOiBPYnNlcnZhYmxlPEV2ZW50IHwgJyc+ID0+IHtcbiAgICBpZiAoIXNjcm9sbFRhcmdldCB8fCB0eXBlb2Ygc2Nyb2xsVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignYGFkZEV2ZW50TGlzdGVuZXJgIG9uICcgKyBzY3JvbGxUYXJnZXQgKyAnIChzY3JvbGxUYXJnZXQpIGlzIG5vdCBhIGZ1bmN0aW9uLiBTa2lwcGluZyB0aGlzIHRhcmdldCcpO1xuICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgfVxuICAgIGNvbnN0IHNjcm9sbExpc3RlbmVyID0gdGhpcy5zY3JvbGxMaXN0ZW5lcnMuZ2V0KHNjcm9sbFRhcmdldCk7XG4gICAgaWYgKHNjcm9sbExpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gc2Nyb2xsTGlzdGVuZXI7XG4gICAgfVxuXG4gICAgY29uc3Qgc3JvbGxFdmVudDogT2JzZXJ2YWJsZTxFdmVudD4gPSBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IFN1YmplY3Q8RXZlbnQ+KSA9PiB7XG4gICAgICBjb25zdCBldmVudE5hbWUgPSAnc2Nyb2xsJztcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KSA9PiBvYnNlcnZlci5uZXh0KGV2ZW50KTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH07XG4gICAgICBzY3JvbGxUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuICgpID0+IHNjcm9sbFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IHRoaXMuc2FtcGxlT2JzZXJ2YWJsZShzcm9sbEV2ZW50KTtcbiAgICB0aGlzLnNjcm9sbExpc3RlbmVycy5zZXQoc2Nyb2xsVGFyZ2V0LCBsaXN0ZW5lcik7XG4gICAgcmV0dXJuIGxpc3RlbmVyO1xuICB9O1xufVxuIl19