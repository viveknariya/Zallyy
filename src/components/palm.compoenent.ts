import { Component} from '@angular/core'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';




@Component({
    selector:'PalmComponent',
    standalone:true,
    imports:[HttpClientModule,FormsModule],
    template:`
    <!--
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
-->

<div>
  <label for="inputText" class="sr-only">Order notes</label>

  <div
    class="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
  >
    <textarea
      id="inputText"
      class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm"
      rows="4"
      placeholder="Enter ..."
      [(ngModel)]="inputText" 
    ></textarea>

    <div class="flex items-center justify-end gap-2 bg-white p-3">
      <button
        (click)="genrate()"
        type="button"
        class="rounded bg-red-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Genrate
      </button>
    </div>

  </div>
  <p class="mt-4 sm:text-xl/relaxed">
    Result : {{response}}
  </p>
</div>
    `,
})
export class PalmComponent{

    response!:string;
    inputText!: string;

    constructor(private http:HttpClient){

    }
    genrate(){
        let payload = {
            "text" : this.inputText
        }
        this.http.post('http://localhost:8000/genai',payload).subscribe({
            next:(nxt:any)=>{
                this.response = nxt.completion.result;
                console.log(nxt)
            },
            error:(err:any)=>{
                console.log(err)
            },
            complete:()=>{
                console.log("completed")
            }
        })
    }
}