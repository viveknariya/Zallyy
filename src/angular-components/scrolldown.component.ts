import { Component } from "@angular/core";

@Component({
  selector: "ScrollDownComponent",
  standalone: true,
  imports: [],
  template: `
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <button
        class="block w-full rounded  px-12 py-3 text-sm font-medium  shadow hover:bg-gray-200 focus:outline-none focus:ring active:bg-gray-200 sm:w-auto"
        (click)="scrollDown()"
      >
        Use It ⛏️ Now
      </button>
    </div>
  `,
})
export class ScrollDownComponent {
  scrollDown() {
    // Adjust the value (e.g., 500) to control scrolling speed
    window.scrollBy({
      top: window.innerHeight, // Scroll down by the height of the viewport
      behavior: "smooth", // Add smooth scrolling behavior
    });
  }
}
