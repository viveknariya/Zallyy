import { Component, OnInit, inject } from "@angular/core";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";

@Component({
  selector: "PalmComponent",
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `
    <div>
      <div
        class="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
      >
        <textarea
          id="OrderNotes"
          class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm"
          rows="2"
          placeholder="Enter ..."
          [(ngModel)]="inputText"
        ></textarea>

        <div class="flex items-center justify-end gap-2 bg-white p-3">
          <button
            [disabled]="disableGenBtn"
            (click)="genrate()"
            [ngClass]="currentClassesGenButton"
            type="button"
            class="rounded  px-3 py-1.5 text-sm font-medium text-white "
          >
            Genrate
          </button>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <div
        class="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
      >
        <textarea
          id="OrderNotes"
          class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm bg-gray-300"
          rows="2"
          placeholder="Result"
          disabled
          [(ngModel)]="response"
        ></textarea>

        <div class="flex items-center justify-end gap-2 bg-gray-300  p-3">
          <button
            (click)="copy()"
            [disabled]="disableCopyBtn"
            [ngClass]="currentClassesCopyButton"
            type="button"
            class="rounded  px-3 py-1.5 text-sm font-medium text-white "
          >
            {{ Copy }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class PalmComponent implements OnInit {
  ngOnInit(): void {
    this.setCurrentClasses();
  }
  response!: string;
  inputText!: string;
  Copy: string = "Copy";
  disableGenBtn: boolean = false;
  disableCopyBtn: boolean = true;

  static clientProviders = [provideHttpClient()];
  static renderProviders = [PalmComponent.clientProviders];

  http = inject(HttpClient);

  genrate() {
    this.disableGenBtn = true;
    this.setCurrentClasses();
    let payload = {
      text: this.inputText,
    };
    this.http.post("https://api.zallyy.com/genai", payload).subscribe({
      next: (nxt: any) => {
        this.response = nxt.completion.result;
        console.log(nxt);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log("completed");
        this.inputText = "";
        this.disableGenBtn = false;
        this.disableCopyBtn = false;
        this.setCurrentClasses();
      },
    });
  }
  copy() {
    navigator.clipboard.writeText(this.response);
    this.Copy = "Copied";
    this.disableCopyBtn = true;
  }

  currentClassesGenButton: Record<string, boolean> = {};
  currentClassesCopyButton: Record<string, boolean> = {};

  setCurrentClasses() {
    this.currentClassesGenButton = {
      "bg-gray-400": this.disableGenBtn,"bg-indigo-600": !this.disableGenBtn,"hover:bg-indigo-700": !this.disableGenBtn,
    };
    this.currentClassesCopyButton = {
      "bg-gray-400": this.disableCopyBtn,"bg-indigo-600": !this.disableCopyBtn,"hover:bg-indigo-700": !this.disableCopyBtn,
    };
  }
}
