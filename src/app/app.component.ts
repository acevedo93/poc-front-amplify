import { Component, output } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Amplify } from "aws-amplify"
import outputs from "../../amplify_outputs.json"
import { ApiError, get } from 'aws-amplify/api'


Amplify.configure(outputs)

const existingConfig = Amplify.getConfig()
Amplify.configure({

  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: outputs.custom.API
  }

})


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'amplifyFrontend';

  constructor() {
    this.getItem()
  }

  async getItem(): Promise<void> {

    try {
      const restOperation = get({
        apiName: outputs.custom.API['RAIO API'].apiName,
        path: 'users',
      })

      const response = await restOperation.response
      console.log("OPERATION END", response)
      console.log(await response.body.json())

    } catch (error) {
      if (error instanceof ApiError) {

        console.log("ERROR ON RESPONSE", error)
      }
    }
  }
}
